'use strict';

window.billPayCreateComponent = Vue.extend({
    template: '\n    <form @submit.prevent="submit">\n        <label>Vencimento:</label>\n        <input type="text" v-model="bill.date_due | dateFormat \'pt-BR\'">\n        <br><br>\n        <label>Nome:</label>\n        <select v-model="bill.name">\n            <option v-for="o in billPaysNames" value="{{ o }}">{{ o | textFormat }}</option>\n        </select>\n        <br><br>\n        <label>Valor:</label>\n        <input type="text" v-model="bill.value | numberFormat \'pt-BR\'">\n        <br><br>\n        <label>Pago?</label>\n        <input type="checkbox" v-model="bill.done">\n        <button type="submit">Enviar</button>\n    </form>\n    ',
    data: function data() {
        return {
            billPaysNames: ['conta de luz', 'conta de água', 'conta de telefone', 'cartão de crédito', 'supermercado', 'gasolina', 'empréstimo'],
            bill: new Bill()
        };
    },
    created: function created() {
        if (this.$route.name == 'bill-pay.update') {
            this.getBill(this.$route.params.id);
        }
    },

    methods: {
        submit: function submit() {
            var _this = this;

            var data = this.bill.toJSON();
            if (this.$route.name == 'bill-pay.create') {
                BillPay.save(data).then(function (response) {
                    _this.$dispatch('update-info');
                    _this.$router.go({ name: 'bill-pay.list' });
                });
            } else {
                BillPay.update({ id: this.bill.id }, data).then(function (response) {
                    _this.$dispatch('update-info');
                    _this.$router.go({ name: 'bill-pay.list' });
                });
            }
        },
        getBill: function getBill(id) {
            var _this2 = this;

            BillPay.get({ id: id }).then(function (response) {
                _this2.bill = new Bill(response.data);
            });
        }
    }
});