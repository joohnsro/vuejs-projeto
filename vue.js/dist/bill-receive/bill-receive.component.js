"use strict";

window.billReceiveComponent = Vue.extend({
    components: {
        billReceiveMenuComponent: billReceiveMenuComponent
    },
    template: "\n    <h1>{{ title }}</h1>\n    <h3 :class=\"{'gray': status === false, 'green': status == 0, 'red': status > 0}\">{{ status | billReceiveStatus }}</h3>\n    <h4>Valor de contas a receber: {{ total | currency 'R$ ' }}</h4>\n    <bill-receive-menu-component></bill-receive-menu-component>\n    <router-view></router-view>\n    ",
    data: function data() {
        return {
            title: "Contas a receber",
            status: false,
            total: 0
        };
    },
    created: function created() {
        this.updateStatus();
        this.updateTotal();
    },

    methods: {
        countBills: function countBills(bills) {
            if (!bills.length) {
                this.status = false;
            }

            var count = 0;
            for (var o in bills) {
                if (bills[o].done == false) {
                    count++;
                }
            }
            this.status = count;
        },
        updateStatus: function updateStatus() {
            var _this = this;

            BillReceive.query().then(function (response) {
                _this.countBills(response.data);
            });
        },
        updateTotal: function updateTotal() {
            var _this2 = this;

            BillReceive.totalNotDone().then(function (response) {
                _this2.total = response.data.total;
            });
        }
    },
    events: {
        'update-info': function updateInfo() {
            this.updateStatus();
            this.updateTotal();
        }
    }
});