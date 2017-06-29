@extends('layouts.bill-pay')

@section('body')
    <form>
        <div class="row">
            <div class="input-field col s6">
                <label class="active">Vencimento:</label>
                <input type="text">
            </div>
            <div class="input-field col s6">
                <label class="active">Valor:</label>
                <input type="text">
            </div>
        </div>
        <div class="row">
            <div class="input-field col s6">
                <label class="active">Nome:</label>
                <select class="browser-default">
                    <option value="">Cartão de Crédito</option>
                    <option value="">Supermercado</option>
                    <option value="">Empréstimo</option>
                </select>
            </div>
            <div class="input-field col s6">
                <input id="pago" class="filled-in" type="checkbox">
                <label for="pago">Pago?</label>
            </div>
        </div>
        <div class="row">
            <div class="input-field col s12">
                <button class="btn right" type="submit">Enviar</button>
            </div>
        </div>
    </form>
@endsection
