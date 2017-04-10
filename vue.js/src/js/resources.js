Vue.http.options.root = 'http://192.168.10.10:8000/api';

let BillPayResource =  Vue.resource('bills-pays{/id}', {}, {
    totalDone: { method: 'GET', url: 'bills-pays/total/done' },
    totalNotDone: { method: 'GET', url: 'bills-pays/total/not-done' }
});

let BillReceiveResource =  Vue.resource('bills-receives{/id}', {}, {
    totalDone: { method: 'GET', url: 'bills-receives/total/done' },
    totalNotDone: { method: 'GET', url: 'bills-receives/total/not-done' }
});

export {BillPayResource, BillReceiveResource};