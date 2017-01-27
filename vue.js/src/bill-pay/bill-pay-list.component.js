window.billPayListComponent = Vue.extend({
    template: `
    <table border="1" cellpadding="10">
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
        <tr v-for="(index, o) in bills">
            <td>{{ index + 1 }}</td>
            <td>{{ o.date_due | dateFormat 'pt-BR' }}</td>
            <td>{{ o.name | textFormat }}</td>
            <td>{{ o.value | numberFormat 'pt-BR' }}</td>
            <td :class="{
                'green': o.done == 1,
                'red': o.done == 0
            }">
                {{ o.done | payLabel }}
            </td>
            <td>
                <a v-link="{name: 'bill-pay.update', params: { id: o.id }}">Editar</a>
                <a href="#" @click.prevent="billDelete(o)">Excluir</a>
            </td>
        </tr>
        </tbody>
    </table>
    `,
    data() {
        return {
            bills: []
        };
    },
    created() {
        BillPay.query().then((response) => {
            this.bills = response.data;
            this.$dispatch('update-info');
        });
    },
    methods: {
        billDelete( bill ) {
            if ( confirm('Deseja realmente excluir esta conta?') ) {
                BillPay.delete({id: bill.id}).then((response) => {
                    this.bills.$remove(bill);
                    this.$dispatch('update-info');
                });
            }
        }
    }
});