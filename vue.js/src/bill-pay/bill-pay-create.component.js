window.billPayCreateComponent = Vue.extend({
    template: `
    <form @submit.prevent="submit">
        <label>Vencimento:</label>
        <input type="text" v-model="bill.date_due | dateFormat 'pt-BR'">
        <br><br>
        <label>Nome:</label>
        <select v-model="bill.name">
            <option v-for="o in billPaysNames" value="{{ o }}">{{ o | textFormat }}</option>
        </select>
        <br><br>
        <label>Valor:</label>
        <input type="text" v-model="bill.value | numberFormat 'pt-BR'">
        <br><br>
        <label>Pago?</label>
        <input type="checkbox" v-model="bill.done">
        <button type="submit">Enviar</button>
    </form>
    `,
    data() {
        return {
            billPaysNames: [
                'conta de luz',
                'conta de água',
                'conta de telefone',
                'cartão de crédito',
                'supermercado',
                'gasolina',
                'empréstimo'
            ],
            bill: new Bill()
        };
    },
    created() {
        if ( this.$route.name == 'bill-pay.update' ) {
            this.getBill( this.$route.params.id );
        }
    },
    methods: {
        submit() {
            let data = this.bill.toJSON();
            if ( this.$route.name == 'bill-pay.create' ) {
                BillPay.save(data).then((response) => {
                    this.$dispatch('update-info');
                    this.$router.go({name: 'bill-pay.list'});
                });
            } else {
                BillPay.update({id: this.bill.id}, data).then((response) => {
                    this.$dispatch('update-info');
                    this.$router.go({name: 'bill-pay.list'});
                });
            }
        },
        getBill(id) {
            BillPay.get({id: id}).then((response) => {
                this.bill = new Bill(response.data);
            });
        }
    }
});
