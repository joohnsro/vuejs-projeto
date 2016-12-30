window.billPayCreateComponent = Vue.extend({
    template: `
    <form @submit.prevent="submit">
        <label>Vencimento:</label>
        <input type="text" v-model="bill.dateDue">
        <br><br>
        <label>Nome:</label>
        <select v-model="bill.name">
            <option v-for="o in billPaysNames">{{ o }}</option>
        </select>
        <br><br>
        <label>Valor:</label>
        <input type="text" v-model="bill.value">
        <br><br>
        <label>Pago?</label>
        <input type="checkbox" v-model="bill.done">
        <button type="submit">Enviar</button>
    </form>
    `,
    data: function () {
        return {
            billPaysNames: [
                'Conta de luz',
                'Conta de água',
                'Conta de telefone',
                'Cartão de crédito',
                'Supermercado',
                'Gasolina'
            ],
            bill: { dateDue: "", name: "", value: 0, done: 0 }
        };
    },
    created: function () {
        if ( this.$route.name == 'bill-pay-update' ) {
            var index = this.$route.params.index;
            this.bill = this.loadBill(index);
        }
    },
    methods: {
        submit: function () {
            if ( this.$route.name == 'bill-pay-create' ) {
                this.$root.$children[0].billPays.push(this.bill);
            }

            router.go('/bill-pays');
        },
        loadBill: function (index) {
            return this.$root.$children[0].billPays[index];
        }
    }
});