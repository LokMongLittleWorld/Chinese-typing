<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUlids;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Like extends Model
{
    use HasUlids;
    use SoftDeletes;

    protected $table = 'likes';
    protected $keyType = 'string';

    public $incrementing = false;

    protected $fillable = [
        'user_id',
        'article_id',
        'like',
    ];

    protected $hidden = [
        'deleted_at',
    ];
}
