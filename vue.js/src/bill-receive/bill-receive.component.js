window.billReceiveComponent = Vue.extend({
    components: {
        billReceiveMenuComponent: billReceiveMenuComponent
    },
    template: `
    <h1>{{ title }}</h1>
    <h3 :class="{'gray': status === false, 'green': status == 0, 'red': status > 0}">{{ status | billReceiveStatus }}</h3>
    <h4>Valor de contas a receber: {{ total | currency 'R$ ' }}</h4>
    <bill-receive-menu-component></bill-receive-menu-component>
    <router-view></router-view>
    `,
    data() {
        return {
            title: "Contas a receber",
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
            BillReceive.query().then((response) => {
                this.countBills(response.data);
            });
        },
        updateTotal() {
            BillReceive.totalNotDone().then((response) => {
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