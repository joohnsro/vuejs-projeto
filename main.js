var router = new VueRouter();

window.mainComponent = Vue.extend({
    'components': {
        billComponent: billComponent
    },
    template: '<bill-component></bill-component>'
});

router.map({
    '/': {
        component: billComponent,
        subRoutes: {
            '/': {
                name: 'dashboard',
                component: billDashboardComponent
            },
            '/bill-pays': {
                component: billPayComponent,
                subRoutes: {
                    '/': {
                        name: 'bill-pay-list',
                        component: billPayListComponent
                    },
                    '/:index/update': {
                        name: 'bill-pay-update',
                        component: billPayCreateComponent
                    },
                    '/create': {
                        name: 'bill-pay-create',
                        component: billPayCreateComponent
                    },
                    '*': billPayListComponent
                }
            },
            '/bill-receives': {
                component: billReceiveComponent,
                subRoutes: {
                    '/': {
                        name: 'bill-receive-list',
                        component: billReceiveListComponent
                    },
                    '/:index/update': {
                        name: 'bill-receive-update',
                        component: billReceiveCreateComponent
                    },
                    '/create': {
                        name: 'bill-receive-create',
                        component: billReceiveCreateComponent
                    },
                    '*': billReceiveListComponent
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
        'main-component': mainComponent
    }
},'#app');

