window.billReceiveCreateComponent = Vue.extend({
    template: `
    <form @submit.prevent="submit">
        <label>Vencimento:</label>
        <input type="text" v-model="bill.date_due">
        <br><br>
        <label>Nome:</label>
        <select v-model="bill.name">
            <option v-for="o in billReceivesNames">{{ o }}</option>
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
            billReceivesNames: [
                'Projeto Symfony',
                'Projeto Laravel',
                'Projeto Silex'
            ],
            bill: { date_due: "", name: "", value: 0, done: 0 }
        };
    },
    created: function () {
        if ( this.$route.name == 'bill-receive.update' ) {
            this.getBill( this.$route.params.id );
        }
    },
    methods: {
        submit: function () {
            var self = this;
            if ( this.$route.name == 'bill-receive.create' ) {
                BillReceive.save(self.bill).then(function (response) {
                    self.$dispatch('update-info');
                    self.$router.go({name: 'bill-receive.list'});
                });
            } else {
                BillReceive.update({id: self.bill.id}, self.bill).then(function (response) {
                    self.$dispatch('update-info');
                    self.$router.go({name: 'bill-receive.list'});
                });
            }
        },
        getBill: function (id) {
            var self = this;
            BillReceive.get({id: id}).then(function (response) {
                self.bill = response.data;
            });
        }
    }
});