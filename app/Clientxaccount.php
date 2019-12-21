<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Clientxaccount extends Model
{
    protected $table = "clientxaccounts";

    protected $fillable = [
        'client_id', 'account_id'
    ];
}
