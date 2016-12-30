window.billReceiveCreateComponent = Vue.extend({
    template: `
    <form @submit.prevent="submit">
        <label>Vencimento:</label>
        <input type="text" v-model="bill.dateDue">
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
                'Job Symfony',
                'Job Laravel',
                'Job Silex'
            ],
            bill: { dateDue: "", name: "", value: 0, done: 0 }
        };
    },
    created: function () {
        if ( this.$route.name == 'bill-receive-update' ) {
            var index = this.$route.params.index;
            this.bill = this.loadBill(index);
        }
    },
    methods: {
        submit: function () {
            if ( this.$route.name == 'bill-receive-create' ) {
                this.$root.$children[0].billReceives.push(this.bill);
            }

            router.go('/bill-receives');
        },
        loadBill: function (index) {
            return this.$root.$children[0].billReceives[index];
        }
    }
});