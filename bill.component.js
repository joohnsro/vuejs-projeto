window.billComponent = Vue.extend({
    template: `
    <nav>
        <ul>
            <li v-for="o in menus">
                <a v-link="{name: o.routeName}">{{ o.name }}</a>
            </li>
        </ul>
    </nav>
    <router-view></router-view>
    `,
    data: function () {
        return {
            menus: [
                { name: 'Dashboard', routeName: 'dashboard' },
                { name: 'Contas a pagar', routeName: 'bill-pay-list' },
                { name: 'Contas a receber', routeName: 'bill-receive-list' }
            ],
            billPays: [
                { dateDue: "01/01/2017", name: "Conta de luz", value: 135.00, done: 1 },
                { dateDue: "02/01/2017", name: "Conta de água", value: 79.32, done: 0 },
                { dateDue: "03/01/2017", name: "Conta de telefone", value: 49.90, done: 0 },
                { dateDue: "04/01/2017", name: "Cartão de crédito", value: 450.00, done: 0 },
                { dateDue: "05/01/2017", name: "Supermercado", value: 265.45, done: 1 },
                { dateDue: "06/01/2017", name: "Gasolina", value: 78.00, done: 0 }
            ],
            billReceives: [
                { dateDue: "01/01/2017", name: "Job Symfony", value: 5000.00, done: 0 },
                { dateDue: "05/01/2017", name: "Job Laravel", value: 2400.00, done: 1 },
                { dateDue: "07/01/2017", name: "Job Silex", value: 700.00, done: 0 }
            ]
        };
    }
});