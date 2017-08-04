import LoginComponent from './components/Login.vue';
import LogoutComponent from './components/Logout.vue';
import DashboardComponent from './components/Dashboard.vue';
import BillPayComponent from './components/bill-pay/BillPay.vue';
import BillPayListComponent from './components/bill-pay/BillPayList.vue';
import BillPayCreateComponent from './components/bill-pay/BillPayCreate.vue';
import BillReceiveComponent from './components/bill-receive/BillReceive.vue';
import BillReceiveListComponent from './components/bill-receive/BillReceiveList.vue';
import BillReceiveCreateComponent from './components/bill-receive/BillReceiveCreate.vue';

export default {
    '/login': {
        name: 'auth.login',
        component: LoginComponent,
        auth: false
    },
    '/logout': {
        name: 'auth.logout',
        component: LogoutComponent,
        auth: true
    },
    '/': {
        name: 'dashboard',
        component: DashboardComponent,
        auth: true
    },
    '/bill-pay': {
        component: BillPayComponent,
        auth: true,
        subRoutes: {
            '/': {
                name: 'bill-pay.list',
                component: BillPayListComponent
            },
            '/create': {
                name: 'bill-pay.create',
                component: BillPayCreateComponent
            }
        }
    },
    '/bill-receive': {
        component: BillReceiveComponent,
        auth: true,
        subRoutes: {
            '/': {
                name: 'bill-receive.list',
                component: BillReceiveListComponent
            },
            '/create': {
                name: 'bill-receive.create',
                component: BillReceiveCreateComponent
            }
        }
    }
}