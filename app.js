Vue.filter('doneLabel', function ( value ) {
    if ( value == 1 ) {
        return "Pago";
    } else {
        return "Não pago";
    }
});

Vue.filter('statusMessage', function ( value ) {
    var statusMessage = "Nenhuma conta cadastrada";
    if ( value ) {
        if ( value.count > 0 ) {
            statusMessage = "Existem " + value.count + " contas a serem pagas";
        } else {
            statusMessage = "Nenhuma conta a pagar";
        }
    }
    return statusMessage;
});

Vue.filter('statusClass', function ( value ) {
    var statusClass = "status-default";
    if ( value ) {
        if ( value.count > 0 ) {
            statusClass = "status-atention";
        } else {
            statusClass = "status-success";
        }
    }
    return statusClass;
});

var app = new Vue({
    el: "#app",
    data: {
        title: "Contas a pagar",
        menus: [
            { id: 0, name: "Listar contas" },
            { id: 1, name: "Criar conta" }
        ],
        activedView: 0,
        formType: "submit",
        billNames: [
            'Conta de luz',
            'Conta de água',
            'Conta de telefone',
            'Cartão de crédito',
            'Supermercado',
            'Gasolina'
        ],
        bill: {
            dateDue: "",
            name: "",
            value: 0,
            done: 0
        },
        bills: [
            { dateDue: "01/01/2017", name: "Conta de luz", value: 135.00, done: 1 },
            { dateDue: "02/01/2017", name: "Conta de água", value: 79.32, done: 0 },
            { dateDue: "03/01/2017", name: "Conta de telefone", value: 49.90, done: 0 },
            { dateDue: "04/01/2017", name: "Cartão de crédito", value: 450.00, done: 0 },
            { dateDue: "05/01/2017", name: "Supermercado", value: 265.45, done: 1 },
            { dateDue: "06/01/2017", name: "Gasolina", value: 78.00, done: 0 },
        ]
    },
    computed: {
        status: function () {
            if ( this.bills.length > 0 ) {
                var count = 0;
                for ( o in this.bills ) {
                    if ( this.bills[o].done == 0 ) {
                        count++;
                    }
                }
                if ( count > 0 ) {
                    return { count: count };
                }
                return { count: 0 };
            }
            return false;
        }
    },
    methods: {
        showView: function ( id ) {
            if ( id == 1 ) {
                this.formType = "submit";
                this.bill = {
                    dateDue: "",
                    name: "",
                    value: 0,
                    done: 0
                };
            }
            this.activedView = id;
        },
        billView: function ( bill ) {
            this.bill = bill;
            this.formType = "edit";
            this.activedView = 1;
        },
        submit: function () {
            if ( this.formType == "submit" ) {
                this.bills.push(this.bill);
            }
            this.activedView = 0;
        },
        billDelete: function ( bill ) {
            var value = confirm('Deseja realmente excluir esta conta?');

            if ( value ) {
                this.bills.splice(bill, 1);
            }
        }
    }
});