"use strict";

window.billDashboardComponent = Vue.extend({
    template: "\n    <div class=\"container\">\n        <h3>Dashboard</h3>\n        \n        <div class=\"row\">\n            <div class=\"col s12 l4\">\n                <div class=\"card\">\n                    <div class=\"card-content\">\n                        <p class=\"card-title\">\n                            <strong>{{ totalReceives | currency 'R$ ' }}</strong>\n                        </p>\n                        <p><i>Contas recebidas</i></p>\n                    </div>\n                </div>\n            </div>\n            <div class=\"col s12 l4\">\n                <div class=\"card\">\n                    <div class=\"card-content\">\n                        <p class=\"card-title\">\n                            <strong>{{ totalPays | currency 'R$ ' }}</strong>\n                        </p>\n                        <p><i>Contas pagas</i></p>\n                    </div>\n                </div>\n            </div>\n            <div class=\"col s12 l4\">\n                <div class=\"card\">\n                    <div class=\"card-content\">\n                        <p class=\"card-title\">\n                            <strong>{{ total | currency 'R$ ' }}</strong>\n                        </p>\n                        <p><i>Saldo total</i></p>\n                    </div>\n                </div>\n            </div>\n        </div>\n    </div>\n    ",
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