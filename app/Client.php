<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Client extends Model
{
   
    protected $table = "clients";

    protected $fillable = [
        'name', 'email','lastname','address','phone','type_documents', 'identity_card'
    ];
}
