'use strict';

window.billReceiveCreateComponent = Vue.extend({
    template: '\n    <form @submit.prevent="submit">\n        <label>Vencimento:</label>\n        <input type="text" v-model="bill.date_due | dateFormat \'pt-BR\'">\n        <br><br>\n        <label>Nome:</label>\n        <select v-model="bill.name">\n            <option v-for="o in billReceivesNames" value="{{ o }}">{{ o | textFormat }}</option>\n        </select>\n        <br><br>\n        <label>Valor:</label>\n        <input type="text" v-model="bill.value | numberFormat \'pt-BR\'">\n        <br><br>\n        <label>Pago?</label>\n        <input type="checkbox" v-model="bill.done">\n        <button type="submit">Enviar</button>\n    </form>\n    ',
    data: function data() {
        return {
            billReceivesNames: ['projeto symfony', 'projeto laravel', 'projeto silex'],
            bill: new Bill()
        };
    },
    created: function created() {
        if (this.$route.name == 'bill-receive.update') {
            this.getBill(this.$route.params.id);
        }
    },

    methods: {
        submit: function submit() {
            var _this = this;

            var data = this.bill.toJSON();
            if (this.$route.name == 'bill-receive.create') {
                BillReceive.save(data).then(function (response) {
                    _this.$dispatch('update-info');
                    _this.$router.go({ name: 'bill-receive.list' });
                });
            } else {
                BillReceive.update({ id: this.bill.id }, data).then(function (response) {
                    _this.$dispatch('update-info');
                    _this.$router.go({ name: 'bill-receive.list' });
                });
            }
        },
        getBill: function getBill(id) {
            var _this2 = this;

            BillReceive.get({ id: id }).then(function (response) {
                _this2.bill = new Bill(response.data);
            });
        }
    }
});