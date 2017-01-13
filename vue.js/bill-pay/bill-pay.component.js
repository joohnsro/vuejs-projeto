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
    data: function () {
        return {
            title: "Contas a pagar",
            status: false,
            total: 0
        };
    },
    created: function () {
        this.updateStatus();
        this.updateTotal();
    },
    methods: {
        countBills: function (bills) {
            if ( !bills.length ) {
                this.status = false;
            }

            var count = 0;
            for ( o in bills ) {
                if ( bills[o].done == false ) {
                    count++;
                }
            }
            this.status = count;
        },
        updateStatus: function () {
            var self = this;
            BillPay.query().then(function (response) {
                self.countBills(response.data);
            });
        },
        updateTotal: function () {
            var self = this;
            BillPay.totalNotDone().then(function (response) {
                self.total = response.data.total;
            });
        }
    },
    events: {
        'update-info': function () {
            this.updateStatus();
            this.updateTotal();
        }
    }
});