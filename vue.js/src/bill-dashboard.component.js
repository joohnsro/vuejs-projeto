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
    data() {
        return {
            totalPays: 0,
            totalReceives: 0,
            total: 0
        };
    },
    created() {
        this.getTotalBillsPays();
        this.getTotalBillsReceives();
        this.updateTotal();
    },
    methods: {
        getTotalBillsPays() {
            BillPay.totalDone().then((response) => {
                this.totalPays = response.data.total;
                this.updateTotal();
            });
        },
        getTotalBillsReceives() {
            BillReceive.totalDone().then((response) => {
                this.totalReceives = response.data.total;
                this.updateTotal();
            });
        },
        updateTotal() {
            this.total = this.totalReceives - this.totalPays;
        }
    }
});