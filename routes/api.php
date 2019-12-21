<?php

use Illuminate\Http\Request;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

// api clients
Route::get('clients','ClientsController@index');

Route::get('clients/{client}', 'ClientsController@show');

Route::post('clients','ClientsController@store');

Route::put('clients/{client}','ClientsController@update');

Route::delete('clients/{client}', 'ClientsController@delete');

// api accounst
Route::get('accounts/{clientId}','AcountsController@index');

Route::get('activesAccounts/{clientId}','AcountsController@activesAccounts');

Route::post('accounts','AcountsController@store');

Route::put('accounts/{accountId}','AcountsController@update');


// api transactions
Route::get('transactions','TransactionsController@index');

Route::post('transactions','TransactionsController@store');
