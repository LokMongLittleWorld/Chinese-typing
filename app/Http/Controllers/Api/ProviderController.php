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
            $user = User::where('email', $socialUser->getEmail())->first();
            if($user && isset($user)){
                $user[$provider . '_id'] = $socialUser->id;
                $user[$provider . '_token'] = $socialUser->token;
                if (!isset($user->email_verified_at)) {
                    $user['email_verified_at'] = now();
                }
                $user->save();
            } else {
                $user = User::where([
                    $provider . '_id' => $socialUser->id,
                ])->first();
            };
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
            for ($i = 0; $i<3; $i++ ) {
                $temporaryCode = "login:" . Str::random(40);
                $cached = Cache::add($temporaryCode, $user->id, now()->addMinutes(2));
                if ($cached) break;
            }
            return redirect(env('FRONT_END_HOST') . "/callback?loginCode=" . urlencode($temporaryCode));
        } catch(\Exception $e) {
            return redirect(env('FRONT_END_HOST'));
        }
    }
}
