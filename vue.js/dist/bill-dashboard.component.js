"use strict";

window.billDashboardComponent = Vue.extend({
    template: "\n    <h1>Dashboard</h1>\n    <p>\n        Contas recebidas: {{ totalReceives | currency 'R$ ' }}\n    </p>\n    <p>\n        Contas pagas: {{ totalPays | currency 'R$ ' }}\n    </p>\n    <p>\n        Saldo total: {{ total | currency 'R$ ' }}\n    </p>\n    ",
    data: function data() {
        return {
            totalPays: 0,
            totalReceives: 0,
            total: 0
        };
    },
    created: function created() {
        this.getTotalBillsPays();
        this.getTotalBillsReceives();
        this.updateTotal();
    },

    methods: {
        getTotalBillsPays: function getTotalBillsPays() {
            var _this = this;

            BillPay.totalDone().then(function (response) {
                _this.totalPays = response.data.total;
                _this.updateTotal();
            });
        },
        getTotalBillsReceives: function getTotalBillsReceives() {
            var _this2 = this;

            BillReceive.totalDone().then(function (response) {
                _this2.totalReceives = response.data.total;
                _this2.updateTotal();
            });
        },
        updateTotal: function updateTotal() {
            this.total = this.totalReceives - this.totalPays;
        }
    }
});