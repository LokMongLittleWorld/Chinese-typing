<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Article extends Model
{
    use HasUuids;
    use SoftDeletes;

    protected $table = 'articles';
    protected $primaryKey = 'ulid';
    protected $keyType    = 'string';


    protected $fillable = [
        'ulid',
        'title',
        'content',
        'user_id',
        'category',
        'details',
    ];

    protected $hidden = [
        'deleted_at',
    ];

}
