window.billDashboardComponent = Vue.extend({
    template: `
    <h1>Dashboard</h1>
    <p>
        Contas recebidas: {{ totalReceives | currency 'R$ ' }}
    </p>
    <p>
        Contas a pagar: {{ totalPays | currency 'R$ ' }}
    </p>
    <p>
        Saldo total: {{ total | currency 'R$ ' }}
    </p>
    `,
    methods: {
        sumBillReceives: function () {
            var bills = this.$root.$children[0].billReceives;
            var sum = 0;

            for ( o in bills ) {
                if ( bills[o].done == 1 ) {
                    sum += bills[o].value;
                }
            }

            return sum;
        },
        sumBillPays: function () {
            var bills = this.$root.$children[0].billPays;
            var sum = 0;

            for ( o in bills ) {
                if ( bills[o].done == 1 ) {
                    sum += bills[o].value;
                }
            }

            return sum;
        }
    },
    computed: {
        total: function () {
            var receives = this.sumBillReceives();
            var pays = this.sumBillPays();
            var total = receives - pays;

            return total;
        },
        totalPays: function () {
            return this.sumBillPays();
        },
        totalReceives: function () {
            return this.sumBillReceives();
        }
    }
});