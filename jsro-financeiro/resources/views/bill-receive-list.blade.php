@extends('layouts.bill-receive')

@section('body')
    <table class="bordered striped highlight centered responsive-table">
        <thead>
        <tr>
            <th>#</th>
            <th>Vencimento</th>
            <th>Nome</th>
            <th>Valor</th>
            <th>Paga?</th>
            <th>Ações</th>
        </tr>
        </thead>
        <tbody>
        <tr>
            <td>1</td>
            <td>15/06</td>
            <td>Projeto Laravel</td>
            <td>R$ 1.800,00</td>
            <td class="green white-text">
                Recebido
            </td>
            <td>
                <a href="#">Editar</a> |
                <a href="#">Excluir</a>
            </td>
        </tr>
        <tr>
            <td>2</td>
            <td>01/07</td>
            <td>Projeto Vue.js</td>
            <td>R$ 4.900,00</td>
            <td class="red white-text">
                Não Recebido
            </td>
            <td>
                <a href="#">Editar</a> |
                <a href="#">Excluir</a>
            </td>
        </tr>
        </tbody>
    </table>
@endsection
