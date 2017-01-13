window.billDashboardComponent = Vue.extend({
    template: `
    <h1>Dashboard</h1>
    <p>
        Contas recebidas: {{ totalReceives | currency 'R$ ' }}
    </p>
    <p>
        Contas pagas: {{ totalPays | currency 'R$ ' }}
    </p>
    <p>
        Saldo total: {{ total | currency 'R$ ' }}
    </p>
    `,
    data: function () {
        return {
            totalPays: 0,
            totalReceives: 0,
            total: 0
        };
    },
    created: function () {
        this.getTotalBillsPays();
        this.getTotalBillsReceives();
        this.updateTotal();
    },
    methods: {
        getTotalBillsPays: function () {
            var self = this;
            BillPay.totalDone().then(function (response) {
                self.totalPays = response.data.total;
                self.updateTotal();
            });
        },
        getTotalBillsReceives: function () {
            var self = this;
            BillReceive.totalDone().then(function (response) {
                self.totalReceives = response.data.total;
                self.updateTotal();
            });
        },
        updateTotal: function () {
            this.total = this.totalReceives - this.totalPays;
        }
    }
});