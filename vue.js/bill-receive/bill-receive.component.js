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
    data: function () {
        return {
            title: "Contas a receber",
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
            BillReceive.query().then(function (response) {
                self.countBills(response.data);
            });
        },
        updateTotal: function () {
            var self = this;
            BillReceive.totalNotDone().then(function (response) {
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