'use strict';

window.billPayCreateComponent = Vue.extend({
    template: '\n    <form @submit.prevent="submit">\n        <div class="row">\n            <div class="input-field col s6">\n                <label class="active">Vencimento:</label>\n                <input type="text" v-model="bill.date_due | dateFormat \'pt-BR\'">\n            </div>\n            <div class="input-field col s6">\n                <label class="active">Valor:</label>\n                <input type="text" v-model="bill.value | numberFormat \'pt-BR\'">\n            </div>\n        </div>\n        <div class="row">\n            <div class="input-field col s6">\n                <label class="active">Nome:</label>\n                <select class="browser-default" v-model="bill.name">\n                    <option v-for="o in billPaysNames" value="{{ o }}">{{ o | textFormat }}</option>\n                </select>\n            </div>\n            <div class="input-field col s6">\n                <input id="pago" class="filled-in" type="checkbox" v-model="bill.done">\n                <label for="pago">Pago?</label>\n            </div>\n        </div>\n        <div class="row">\n            <div class="input-field col s12">\n                <button class="btn right" type="submit">Enviar</button>\n            </div>\n        </div>\n    </form>\n    ',
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