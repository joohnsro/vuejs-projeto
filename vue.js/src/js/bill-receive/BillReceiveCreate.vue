<template>
    <form @submit.prevent="submit">
        <div class="row">
            <div class="input-field col s6">
                <label class="active">Vencimento:</label>
                <input type="text" v-model="bill.date_due | dateFormat 'pt-BR'">
            </div>
            <div class="input-field col s6">
                <label class="active">Valor:</label>
                <input type="text" v-model="bill.value | numberFormat 'pt-BR'">
            </div>
        </div>
        <div class="row">
            <div class="input-field col s6">
                <label class="active">Nome:</label>
                <select class="browser-default" v-model="bill.name">
                    <option v-for="o in billReceivesNames" value="{{ o }}">{{ o | textFormat }}</option>
                </select>
            </div>
            <div class="input-field col s6">
                <input id="pago" class="filled-in" type="checkbox" v-model="bill.done">
                <label for="pago">Pago?</label>
            </div>
        </div>
        <div class="row">
            <div class="input-field col s12">
                <button class="btn right" type="submit">Enviar</button>
            </div>
        </div>
    </form>
</template>

<script type="text/javascript">
    import * as resource from '../resources';
    import {BillPay} from '../bill';

    export default {
        data() {
            return {
                billReceivesNames: [
                    'projeto symfony',
                    'projeto laravel',
                    'projeto silex'
                ],
                bill: new BillPay()
            };
        },
        created() {
            if ( this.$route.name == 'bill-receive.update' ) {
                this.getBill( this.$route.params.id );
            }
        },
        methods: {
            submit() {
                let data = this.bill.toJSON();
                if ( this.$route.name == 'bill-receive.create' ) {
                    resource.BillReceiveResource.save(data).then((response) => {
                        this.$dispatch('update-info');
                    this.$router.go({name: 'bill-receive.list'});
                    });
                } else {
                    resource.BillReceiveResource.update({id: this.bill.id}, data).then((response) => {
                        this.$dispatch('update-info');
                    this.$router.go({name: 'bill-receive.list'});
                    });
                }
            },
            getBill(id) {
                resource.BillReceiveResource.get({id: id}).then((response) => {
                    this.bill = new BillPay(response.data);
                });
            }
        }
    };
</script>