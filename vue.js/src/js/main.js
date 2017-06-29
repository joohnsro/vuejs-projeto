import './bootstrap';
import BillDashboardComponent from './BillDashboard.vue';
import BillPayComponent from './bill-pay/BillPay.vue';
import BillPayListComponent from './bill-pay/BillPayList.vue';
import BillPayCreateComponent from './bill-pay/BillPayCreate.vue';
import BillReceiveComponent from './bill-receive/BillReceive.vue';
import BillReceiveListComponent from './bill-receive/BillReceiveList.vue';
import BillReceiveCreateComponent from './bill-receive/BillReceiveCreate.vue';
import BillComponent from './Bill.vue';

let VueRouter = require('vue-router');
let router = new VueRouter();

router.map({
    '/': {
        component: BillComponent,
        subRoutes: {
            '/': {
                name: 'dashboard',
                component: BillDashboardComponent
            },
            '/bill-pays': {
                component: BillPayComponent,
                subRoutes: {
                    '/': {
                        name: 'bill-pay.list',
                        component: BillPayListComponent
                    },
                    '/:id/update': {
                        name: 'bill-pay.update',
                        component: BillPayCreateComponent
                    },
                    '/create': {
                        name: 'bill-pay.create',
                        component: BillPayCreateComponent
                    }
                    // '*': BillPayListComponent
                }
            },
            '/bill-receives': {
                component: BillReceiveComponent,
                subRoutes: {
                    '/': {
                        name: 'bill-receive.list',
                        component: BillReceiveListComponent
                    },
                    '/:id/update': {
                        name: 'bill-receive.update',
                        component: BillReceiveCreateComponent
                    },
                    '/create': {
                        name: 'bill-receive.create',
                        component: BillReceiveCreateComponent
                    }
                    // '*': BillReceiveListComponent
                }
            }
        },
    },
});

router.redirect({
    '*': '/'
});

router.start({
    components: {
        'bill-component': BillComponent
    }
},'#app');