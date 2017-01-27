'use strict';

window.billPayListComponent = Vue.extend({
    template: '\n    <table border="1" cellpadding="10">\n        <thead>\n        <tr>\n            <th>#</th>\n            <th>Vencimento</th>\n            <th>Nome</th>\n            <th>Valor</th>\n            <th>Paga?</th>\n            <th>A\xE7\xF5es</th>\n        </tr>\n        </thead>\n        <tbody>\n        <tr v-for="(index, o) in bills">\n            <td>{{ index + 1 }}</td>\n            <td>{{ o.date_due | dateFormat \'pt-BR\' }}</td>\n            <td>{{ o.name | textFormat }}</td>\n            <td>{{ o.value | numberFormat \'pt-BR\' }}</td>\n            <td :class="{\n                \'green\': o.done == 1,\n                \'red\': o.done == 0\n            }">\n                {{ o.done | payLabel }}\n            </td>\n            <td>\n                <a v-link="{name: \'bill-pay.update\', params: { id: o.id }}">Editar</a>\n                <a href="#" @click.prevent="billDelete(o)">Excluir</a>\n            </td>\n        </tr>\n        </tbody>\n    </table>\n    ',
    data: function data() {
        return {
            bills: []
        };
    },
    created: function created() {
        var _this = this;

        BillPay.query().then(function (response) {
            _this.bills = response.data;
            _this.$dispatch('update-info');
        });
    },

    methods: {
        billDelete: function billDelete(bill) {
            var _this2 = this;

            if (confirm('Deseja realmente excluir esta conta?')) {
                BillPay.delete({ id: bill.id }).then(function (response) {
                    _this2.bills.$remove(bill);
                    _this2.$dispatch('update-info');
                });
            }
        }
    }
});