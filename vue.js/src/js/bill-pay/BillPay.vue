<template>
    <div class="container">
        <h3>
            {{ title }}
            <small class="hide-on-large-only">
                <a v-link="{name: 'bill-pay.create'}" class="btn btn-floating green waves-effect waves-light">
                    <i class="material-icons">add</i>
                </a>
            </small>
        </h3>
        <div class="row">
            <div class="col s12 l6">
                <div class="card-panel">
                    <h5 class="truncate grey-text text-darken-1">
                        <i>{{ status | billPayStatus }}</i>
                    </h5>
                </div>
            </div>
            <div class="col s12 l6">
                <div class="card-panel">
                    <h5 class="truncate grey-text text-darken-1">
                        <i>Total: {{ total | numberFormat 'pt-BR' }}</i>
                    </h5>
                </div>
            </div>
        </div>
        <router-view></router-view>
    </div>
</template>

<script type="text/javascript">
    import * as resource from '../resources';

    export default {
        data() {
            return {
                title: "Contas a pagar",
                status: false,
                total: 0
            };
        },
        created() {
            this.updateStatus();
            this.updateTotal();
        },
        methods: {
            countBills(bills) {
                if ( !bills.length ) {
                    this.status = false;
                }

                let count = 0;
                for ( let o in bills ) {
                    if ( bills[o].done == false ) {
                        count++;
                    }
                }
                this.status = count;
            },
            updateStatus() {
                resource.BillPayResource.query().then((response) => {
                    this.countBills(response.data);
            });
            },
            updateTotal() {
                resource.BillPayResource.totalNotDone().then((response) => {
                    this.total = response.data.total;
            });
            }
        },
        events: {
            'update-info'() {
                this.updateStatus();
                this.updateTotal();
            }
        }
    };
</script>