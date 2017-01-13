window.billPayCreateComponent = Vue.extend({
    template: `
    <form @submit.prevent="submit">
        <label>Vencimento:</label>
        <input type="text" v-model="bill.date_due">
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
            bill: { date_due: "", name: "", value: 0, done: 0 }
        };
    },
    created: function () {
        if ( this.$route.name == 'bill-pay.update' ) {
            this.getBill( this.$route.params.id );
        }
    },
    methods: {
        submit: function () {
            var self = this;
            if ( this.$route.name == 'bill-pay.create' ) {
                BillPay.save(self.bill).then(function (response) {
                    self.$dispatch('update-info');
                    self.$router.go({name: 'bill-pay.list'});
                });
            } else {
                BillPay.update({id: self.bill.id}, self.bill).then(function (response) {
                    self.$dispatch('update-info');
                    self.$router.go({name: 'bill-pay.list'});
                });
            }
        },
        getBill: function (id) {
            var self = this;
            BillPay.get({id: id}).then(function (response) {
                self.bill = response.data;
            });
        }
    }
});