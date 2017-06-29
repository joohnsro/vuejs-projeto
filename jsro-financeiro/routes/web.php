<?php

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/user', function(){
    \Illuminate\Support\Facades\Auth::loginUsingId(1);
});

Route::get('/', function () {
    return view('welcome');
});

Route::group([
    'prefix'    => 'admin',
    'as'        => 'admin.'
], function () {

    Auth::routes();
    
    Route::group(['middleware' => 'can:access-admin'], function () {
        Route::get('/', 'Auth\DashboardController@index')->name('dashboard');
        Route::get('/bill-pay', 'Auth\BillPayListController@index')->name('bill-pay-list');
        Route::get('/bill-pay/create', 'Auth\BillPayCreateController@index')->name('bill-pay-create');
        Route::get('/bill-receive', 'Auth\BillReceiveListController@index')->name('bill-receive-list');
        Route::get('/bill-receive/create', 'Auth\BillReceiveCreateController@index')->name('bill-receive-create');
    });
    
});