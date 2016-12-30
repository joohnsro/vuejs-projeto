window.billReceiveComponent = Vue.extend({
    components: {
        billReceiveMenuComponent: billReceiveMenuComponent
    },
    template: `
    <h1>{{ title }}</h1>
    <h3 :class="{'gray': status === false, 'green': status == 0, 'red': status > 0}">{{ status | billReceiveStatus }}</h3>
    <bill-receive-menu-component></bill-receive-menu-component>
    <router-view></router-view>
    `,
    data: function () {
        return {
            title: "Contas a receber",
        };
    },
    computed: {
        status: function () {
            var bills = this.$root.$children[0].billReceives;
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