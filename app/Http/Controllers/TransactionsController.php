<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\{Client, Account, Clientxaccount, Transactions};
use Illuminate\Support\Facades\Auth;

class TransactionsController extends Controller
{
    public function index()
    {
        return Transactions::all();
    }

    public function store(Request $request)
    {

        $transactions = Transactions::create([
            "type_transaction" => $request->type_transaction,
            "amount" => $request->available_balance,
            "number_account" => $request->number_account,
            "description" => $request->description,
            "cashier_code" => $request->clientId,
        ]);

        $account = Account::find($request->accountId);

        if($request->is_firstime == 1){
            $account->is_firstime = 0;
            $account->account_status = 1;
        }

        if ($request->type_transaction == 'C') {
            $account->available_balance = $request->available_balance + $request->old_available_balance;
        } else if ($request->type_transaction == 'R') {
            $account->available_balance = $request->old_available_balance - $request->available_balance;
        }

        $account->save();

        return response()->json($transactions, 201);
    }
}
