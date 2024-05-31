<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUlids;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Article extends Model
{
    use HasUlids;
    use SoftDeletes;


    protected $table = 'articles';
    protected $keyType = 'string';

    public $incrementing = false;


    protected $fillable = [
        'title',
        'content',
        'user_id',
        'category',
        'details',
    ];

    protected $hidden = [
        'deleted_at',
    ];
    
    public function likes()
    {
        return $this->hasMany(Like::class);
    }

    public function likeByUser($user_id)
    {
        return $this->likes()->where('user_id', $user_id)->first()->like ?? false;
    }


}
