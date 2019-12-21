<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Transactions extends Model
{
    
    protected $table = "transactions";

    protected $fillable = [
        'type_transaction',
        'amount',
        'number_account',
        'description',
        'cashier_code'
    ];
}
