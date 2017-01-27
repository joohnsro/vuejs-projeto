window.billPayComponent = Vue.extend({
    components: {
        billPayMenuComponent: billPayMenuComponent
    },
    template: `
    <h1>{{ title }}</h1>
    <h3 :class="{'gray': status === false, 'green': status == 0, 'red': status > 0}">{{ status | billPayStatus }}</h3>
    <h4>Valor de contas a pagar: {{ total | currency 'R$ ' }}</h4>
    <bill-pay-menu-component></bill-pay-menu-component>
    <router-view></router-view>
    `,
    data() {
        return {
            title: "Contas a pagar",
            status: false,
            total: 0
        };
    },
    created() {
        this.updateStatus();
        this.updateTotal();
    },
    methods: {
        countBills(bills) {
            if ( !bills.length ) {
                this.status = false;
            }

            let count = 0;
            for ( let o in bills ) {
                if ( bills[o].done == false ) {
                    count++;
                }
            }
            this.status = count;
        },
        updateStatus() {
            BillPay.query().then((response) => {
                this.countBills(response.data);
            });
        },
        updateTotal() {
            BillPay.totalNotDone().then((response) => {
                this.total = response.data.total;
            });
        }
    },
    events: {
        'update-info'() {
            this.updateStatus();
            this.updateTotal();
        }
    }
});