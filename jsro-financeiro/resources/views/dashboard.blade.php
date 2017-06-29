@extends('layouts.admin')

@section('content')
<div class="container">
    <h3>Dashboard</h3>

    <div class="row">
        <div class="col s12 l4">
            <div class="card">
                <div class="card-content">
                    <p class="card-title">
                        <strong>R$ 1.800,00</strong>
                    </p>
                    <p><i>Contas recebidas</i></p>
                </div>
            </div>
        </div>
        <div class="col s12 l4">
            <div class="card">
                <div class="card-content">
                    <p class="card-title">
                        <strong>R$ 633,60</strong>
                    </p>
                    <p><i>Contas pagas</i></p>
                </div>
            </div>
        </div>
        <div class="col s12 l4">
            <div class="card">
                <div class="card-content">
                    <p class="card-title">
                        <strong>R$ 1.166,40</strong>
                    </p>
                    <p><i>Saldo total</i></p>
                </div>
            </div>
        </div>
    </div>
</div>
@endsection
