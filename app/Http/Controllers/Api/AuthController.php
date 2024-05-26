<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\User;
use App\Options\CategoryOptions;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

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
            'username'     => ['required', 'string', 'min:3', 'max:55'],
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

        return response()->json([
            'message' => 'User created successfully',
            'user'    => $user,
            'token'   => $token,
        ], 201);
    }

    public function login(Request $request)
    {
        $credentials = $request->validate([
            'email'    => ['required', 'email', 'exists:users,email'],
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
    public function logout(Request $request)
    {
        /** @var User $user */
        $user = $request->user();
        $user->currentAccessToken()->delete();
        return response('', 204);
    }
}
