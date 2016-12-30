window.billPayComponent = Vue.extend({
    components: {
        billPayMenuComponent: billPayMenuComponent
    },
    template: `
    <h1>{{ title }}</h1>
    <h3 :class="{'gray': status === false, 'green': status == 0, 'red': status > 0}">{{ status | billPayStatus }}</h3>
    <bill-pay-menu-component></bill-pay-menu-component>
    <router-view></router-view>
    `,
    data: function () {
        return {
            title: "Contas a pagar",
        };
    },
    computed: {
        status: function () {
            var bills = this.$root.$children[0].billPays;
            if ( !bills.length ) {
                return false;
            }
            
            var count = 0;
            for ( o in bills ) {
                if ( bills[o].done == 0 ) {
                    count++;
                }
            }
            return count;
        }
    },
});