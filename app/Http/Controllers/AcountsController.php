<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\{Client, Account, Clientxaccount};
class AcountsController extends Controller
{
    public function index(Request $request)
    {
        $account = Account::join('clientxaccounts','clientxaccounts.account_id','=', 'accounts.id')
            ->where('clientxaccounts.client_id', $request->clientId)
            ->select('accounts.*')
            ->get();

        return response()->json($account, 201);
    }

    public function activesAccounts(Request $request)
    {
        $activesAccounts = Account::join('clientxaccounts','clientxaccounts.account_id','=', 'accounts.id')
            ->where('clientxaccounts.client_id', $request->clientId)
            ->where('accounts.account_status', 1)
            ->select('accounts.*')
            ->get();

        return response()->json($activesAccounts, 201);
    }

    public function update($account, Request $request){
        $account = Account::find($account);
        $account->account_status = $request->account_status;
        $account->save();
    }

    public function store(Request $request)
    {
        $account = Account::create([
            'account_number' => mt_rand().$request->identity_card,
            'account_status' => false,
            'available_balance' => 0,
        ]);

        $clientxaccount = Clientxaccount::create([
            'client_id' => $request->clientId,
            'account_id' => $account->id,
        ]);

        return response()->json($account, 201);
    }
}
