<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Account extends Model
{

    protected $table = "accounts";

    protected $fillable = [
        'account_number', 'account_key', 'available_balance','account_status','is_firstime'
    ];

}
