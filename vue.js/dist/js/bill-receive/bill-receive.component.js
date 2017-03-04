"use strict";

window.billReceiveComponent = Vue.extend({
    template: "\n    <div class=\"container\">\n        <h3>\n            {{ title }}\n            <small class=\"hide-on-large-only\">\n                <a v-link=\"{name: 'bill-receive.create'}\" class=\"btn btn-floating green waves-effect waves-light\">\n                    <i class=\"material-icons\">add</i>\n                </a>\n            </small>\n        </h3>\n        <div class=\"row\">\n            <div class=\"col s12 l6\">\n                <div class=\"card-panel\">\n                    <h5 class=\"truncate grey-text text-darken-1\">\n                        <i>{{ status | billReceiveStatus }}</i>\n                    </h5>\n                </div>\n            </div>\n            <div class=\"col s12 l6\">\n                <div class=\"card-panel\">\n                    <h5 class=\"truncate grey-text text-darken-1\">\n                        <i>Total: {{ total | numberFormat 'pt-BR' }}</i>\n                    </h5>\n                </div>\n            </div>\n        </div>\n        <router-view></router-view>\n    </div>\n    ",
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