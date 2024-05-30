<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\User;
use App\Models\MailVerification;
use App\Mail\RegisterMail;
use App\Options\CategoryOptions;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Cache;
use Illuminate\Validation\ValidationException;
use Illuminate\Support\Facades\URL;
use Mail;
use Str;

class AuthController extends Controller
{
    public function test()
    {
        $categoryOptions =  CategoryOptions::all();
        return response()->json([
            'categoryOptions' => $categoryOptions,
            'include' => isset($categoryOptions['123']),
            'message' => 'test',
        ], 200);
    }

    public function user(Request $request)
    {
        return $request->user();
    }

    public function edit(Request $request)
    {
        $user = Auth::user();
        $user = User::where([
            'id' => $user->id,
        ])->first();
        $update_user = $request->update_user;
        try {
            foreach ($update_user as $key => $value) {
                // TODO: only allow some field
                // update email need reverify
                $user[$key] = $value;
            }
        } catch(\Exception $e) {
            return response()->json([
                'message' => 'Invalid user update field',
            ], 406);
        }
        return response()->json([
            'message' => 'Update success',
        ], 201);
    }

    public function authenticatedTest(Request $request)
    {
        $user = $request->user();
        return response()->json([
            'message' => 'authenticated test',
            'user'    => $user,
            'current_access_token' => $user->currentAccessToken(),
        ], 200);
    }

    public function register(Request $request)
    {
        $data = $request->validate([
            'username'     => ['required', 'string', "regex:/[^\W@]+/", 'min:8', 'max:55', 'unique:users,name'],
            'email'    => ['required', 'string', 'email', 'unique:users,email'],
            'password' => ['required', 'string', 'min:8', 'max:255'],
        ]);
        /** @var User $user */
        $user = User::create([
            'name'     => $data['username'],
            'email'    => $data['email'],
            'password' => bcrypt($data['password']),
        ]);

        $token =$user->createToken('main')->plainTextToken;

        $url = URL::temporarySignedRoute('verify' , now()->addMinutes(15), ['user_id'=>$user->id], absolute: false);

        Mail::to($user->email)->send(new RegisterMail($user, $url));
        
        return response()->json([
            'message' => 'User created successfully',
            'user'    => $user,
            'token'   => $token,
        ], 201);
    }

    public function login(Request $request)
    {
        $credentials = $request->validate([
            $this->username() => ['required', 'string'],
            'password' => ['required', 'string'],
        ]);
        if (!Auth::attempt($credentials)) {
            return response()->json([
                'message' => 'Invalid credentials',
            ], 422);
        }
        $user = Auth::user();
        $token = $user->createToken('main')->plainTextToken;

        return response()->json([
            'message' => 'User login successfully',
            'user'    => $user,
            'token'   => $token,
        ], 201);
    }

    public function callbackLogin(Request $request)
    {
        $credentials = $request->validate([
            'loginCode' => ['required', 'string'],
        ]);
        $userId = Cache::pull("login:" . $credentials["loginCode"]);
        if (!$userId) {
            return response()->json([
                'message' => 'Invalid credentials',
            ], 422);
        }
        $user = User::where([
            'id' => $userId,
        ])->first();
        error_log("userid:". json_encode($userId));
        if(!$user){
            return response()->json([
                'message' => 'Invalid user',
            ], 422);
        }
        Auth::login($user);
        $token = $user->createToken('main')->plainTextToken;

        return response()->json([
            'message' => 'User login successfully',
            'user'    => $user,
            'token'   => $token,
        ], 201);
    }

    public function logout(Request $request)
    {
        /** @var User $user */
        $user = $request->user();
        $user->currentAccessToken()->delete();
        return response('', 204);
    }

    public function verify($user_id, Request $request) 
    {
        if (!($request->hasValidSignature(false))) {
            return response()->json([
                'message' => 'Invalid verify link',
            ], 403);
        }
        try {
            if (empty($user_id)) {
                throw ValidationException::withMessages(['field_name' => 'Cannot find token']);
            }
            $user = User::where([
                'id' => $user_id,
            ])->first();

            if (empty($user)) {
                throw ValidationException::withMessages(['field_name' => 'Cannot find user']);
            }
            $user->email_verified_at = date('Y-m-d H:i:s');
            $user->save();

            return response()->json([
                'message' => 'Verify success',
            ], 200);
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Invalid link or token',
            ], 403);
        }
    }

    public function username()
    {
        $field = (filter_var(request()->email, FILTER_VALIDATE_EMAIL) || !request()->email) ? 'email' : 'name';
        request()->merge([$field => request()->email]);
        return $field;
    }

    public function reverify()
    {
        $user = Auth::user();

        $url = URL::temporarySignedRoute('verify' , now()->addMinutes(15), ['user_id'=>$user->id], absolute: false);

        Mail::to($user->email)->send(new RegisterMail($user, $url));

        
        return response()->json([
            'message' => 'Verification mail is sent',
        ], 201);
    }
}
