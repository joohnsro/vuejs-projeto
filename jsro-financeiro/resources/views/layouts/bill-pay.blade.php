@extends('layouts.admin')

@section('content')
    <div class="container">
        <h3>
            Contas a pagar
            <small class="hide-on-large-only">
                <a href="#" class="btn btn-floating green waves-effect waves-light">
                    <i class="material-icons">add</i>
                </a>
            </small>
        </h3>
        <div class="row">
            <div class="col s12 l6">
                <div class="card-panel">
                    <h5 class="truncate grey-text text-darken-1">
                        <i>1 conta a ser paga</i>
                    </h5>
                </div>
            </div>
            <div class="col s12 l6">
                <div class="card-panel">
                    <h5 class="truncate grey-text text-darken-1">
                        <i>Total: R$ 633,60</i>
                    </h5>
                </div>
            </div>
        </div>
        <div class="row">
            <div class="col s12 16">
                @yield('body')
            </div>
        </div>
    </div>
@endsection