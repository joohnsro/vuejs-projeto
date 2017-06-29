<?php

namespace JsroFin\Http\Controllers\Auth;

use Illuminate\Http\Request;
use JsroFin\Http\Controllers\Controller;

class BillReceiveListController extends Controller
{
    /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function __construct()
    {
        $this->middleware('auth');
    }

    /**
     * Show the application dashboard.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return view('bill-receive-list');
    }
}
