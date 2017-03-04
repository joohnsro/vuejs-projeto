window.billDashboardComponent = Vue.extend({
    template: `
    <div class="container">
        <h3>Dashboard</h3>
        
        <div class="row">
            <div class="col s12 l4">
                <div class="card">
                    <div class="card-content">
                        <p class="card-title">
                            <strong>{{ totalReceives | currency 'R$ ' }}</strong>
                        </p>
                        <p><i>Contas recebidas</i></p>
                    </div>
                </div>
            </div>
            <div class="col s12 l4">
                <div class="card">
                    <div class="card-content">
                        <p class="card-title">
                            <strong>{{ totalPays | currency 'R$ ' }}</strong>
                        </p>
                        <p><i>Contas pagas</i></p>
                    </div>
                </div>
            </div>
            <div class="col s12 l4">
                <div class="card">
                    <div class="card-content">
                        <p class="card-title">
                            <strong>{{ total | currency 'R$ ' }}</strong>
                        </p>
                        <p><i>Saldo total</i></p>
                    </div>
                </div>
            </div>
        </div>
    </div>
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