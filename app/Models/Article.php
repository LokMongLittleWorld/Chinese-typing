<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Model;

class Article extends Model
{
    use HasUuids;

    protected $table = 'articles';
    protected $primaryKey = 'id';

    protected $fillable = [
        'title',
        'content',
        'category',
        'details',
    ];

    protected $hidden = [
        'deleted_at',
    ];

}
