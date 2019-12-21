<?php

namespace App\Http\Controllers;


use Illuminate\Http\Request;
use App\{Client, Account, Clientxaccount};
 

class ClientsController extends Controller
{
    public function index()
    {
        return Client::all();
    }
 
    public function show(Client $client)
    {
        return $client;
    }
 
    public function store(Request $request)
    {
        $client = Client::create($request->all());

        $account = Account::create([
            'account_number' => mt_rand().$client['identity_card'],
            'account_status' => false,
            'available_balance' => 0,
        ]);

        $clientxaccount = Clientxaccount::create([
            'client_id' =>  $client['id'],
            'account_id' => $account['id'],
        ]);

        return response()->json($client, 201);
    }
 
    public function update(Request $request, Client $client)
    {
        $client->update($request->all());
 
        return response()->json($client, 200);
    }
 
    public function delete(Client $client)
    {
        $client->delete();
 
        return response()->json(null, 204);
    }
}
