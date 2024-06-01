<?php

namespace App\Http\Controllers\api;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Laravel\Socialite\Facades\Socialite;
use Illuminate\Support\Facades\Auth;
use \Illuminate\Support\Facades\Session;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Str;



class ProviderController extends Controller
{
    public function redirect($provider)
    {
        if($provider != 'google') {
            return redirect()->back();
        }
        return Socialite::driver($provider)->redirect();
    }

    public function callback($provider)
    {
        try {
            $socialUser = Socialite::driver($provider)->user();
            // dd($socialUser);
            if(User::where('email', $socialUser->getEmail())->exists()){
                // TODO: redirect to the same account
            };
            $user = User::where([
                $provider . '_id' => $socialUser->id,
            ])->first();
            if(!$user){
                $user = User::create([
                    'name' => User::generateUserName($socialUser->getName()),
                    'email' => $socialUser->getEmail(),
                    $provider . '_id' => $socialUser->getId(),
                    $provider . '_token' => $socialUser->token,
                    'email_verified_at' => now(),
                ]);
            }
            Auth::login($user);
            $temporaryCode = "login:" . Str::random(40);
            Cache::put($temporaryCode, $user->id, now()->addMinutes(5));
            // TODO: config env of url
            return redirect(env('FRONT_END_HOST') . "/callback?loginCode=$temporaryCode");
        } catch(\Exception $e) {
            return redirect(env('FRONT_END_HOST'));
        }
    }
}
