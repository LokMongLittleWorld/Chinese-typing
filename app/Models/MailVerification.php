<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUlids;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class MailVerification extends Model
{
    use HasUlids;


    protected $table = 'mail_verification';
    protected $keyType = 'string';

    public $incrementing = true;


    protected $fillable = [
        'user_id',
        'token',
    ];

}
