window.billReceiveListComponent = Vue.extend({
    template: `
    <table border="1" cellpadding="10">
        <thead>
        <tr>
            <th>#</th>
            <th>Vencimento</th>
            <th>Nome</th>
            <th>Valor</th>
            <th>Recebida?</th>
            <th>Ações</th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="(index, o) in bills">
            <td>{{ index + 1 }}</td>
            <td>{{ o.dateDue }}</td>
            <td>{{ o.name }}</td>
            <td>{{ o.value | currency 'R$ ' }}</td>
            <td :class="{
                'green': o.done == 1,
                'red': o.done == 0
            }">
                {{ o.done | receiveLabel }}
            </td>
            <td>
                <a v-link="{name: 'bill-receive-update', params: { index: index }}">Editar</a>
                <a href="#" @click.prevent="billDelete(o)">Excluir</a>
            </td>
        </tr>
        </tbody>
    </table>
    `,
    data: function () {
        return {
            bills: this.$root.$children[0].billReceives,
        };
    },
    methods: {
        billDelete: function ( bill ) {
            var value = confirm('Deseja realmente excluir esta conta?');

            if ( value ) {
                this.$root.$children[0].billReceives.$remove(bill);
            }
        }
    }
});