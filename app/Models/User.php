<?php

namespace App\Models;

use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Illuminate\Support\Str;
use Laravel\Sanctum\HasApiTokens;


class User extends Authenticatable implements MustVerifyEmail
{
    use HasApiTokens, HasFactory, Notifiable;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'name',
        'email',
        'password',
        'google_id',
        'google_token',
        'email_verified_at',
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var array<int, string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'email_verified_at' => 'datetime',
        'password' => 'hashed',
    ];

    public static function generateUserName($username)
    {
        if($username === null){
            $username = Str::lower(Str::random(8));
        }
        if(User::where('name', $username)->exists()){
            $newUserName = $username.Str::lower(Str::random(3));
            $username = self::generateUserName($newUserName);
        }
        return $username;
    }

    public function likes()
    {
        return $this->hasMany(Like::class);
    }

    public function likedArticles()
    {
        return $this->belongsToMany(Article::class, 'likes', 'user_id', 'article_id')->wherePivot('like', true);
    }
}
