window.billPayListComponent = Vue.extend({
    components: {
        'modal-component': modalComponent
    },
    template: `
    <table class="bordered striped highlight centered responsive-table">
        <thead>
        <tr>
            <th>#</th>
            <th>Vencimento</th>
            <th>Nome</th>
            <th>Valor</th>
            <th>Paga?</th>
            <th>Ações</th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="(index, o) in bills">
            <td>{{ index + 1 }}</td>
            <td>{{ o.date_due | dateFormat 'pt-BR' }}</td>
            <td>{{ o.name | textFormat }}</td>
            <td>{{ o.value | numberFormat 'pt-BR' }}</td>
            <td :class="{
                'green white-text': o.done == 1,
                'red white-text': o.done == 0
            }">
                {{ o.done | payLabel }}
            </td>
            <td>
                <a v-link="{name: 'bill-pay.update', params: { id: o.id }}">Editar</a> | 
                <a href="#" @click.prevent="openModalDelete(o)">Excluir</a>
            </td>
        </tr>
        </tbody>
    </table>
    <modal-component :modal="modal">
        <div slot="content">
            <h4>Mensagem de confirmação</h4>
            <p><strong>Deseja excluir esta conta?</strong></p>
            <div class="divider"></div>
            <p><strong>Nome:</strong> {{ billToDelete.name }}</p>
            <p><strong>Data de vencimento:</strong> {{ billToDelete.date_due | dateFormat 'pt-BR' }}</p>
            <p><strong>Valor:</strong> {{ billToDelete.value | numberFormat 'pt-BR' }}</p>
            <div class="divider"></div>
        </div>
        <div slot="footer">
            <button class="btn btn-flat red white-text waves-effect waves-light modal-action modal-close" @click.prevent="billDelete()">OK</button>
            <button class="btn btn-flat white modal-action modal-close">Cancelar</button>
        </div>
    </modal-component>
    `,
    data() {
        return {
            bills: [],
            billToDelete: null,
            modal: {
                id: 'modal-delete'
            }
        };
    },
    created() {
        BillPay.query().then((response) => {
            this.bills = response.data;
            this.$dispatch('update-info');
        });
        $(document).ready(function () {
            $('#modal-delete').modal();
        });
    },
    methods: {
        billDelete() {
            BillPay.delete({id: this.billToDelete.id}).then((response) => {
                this.bills.$remove(this.billToDelete);
                this.billToDelete = null;
                Materialize.toast('Conta excluída com sucesso. <i class="material-icons right">done</i>', 4000);
                this.$dispatch('update-info');
            });
        },
        openModalDelete( bill ) {
            this.billToDelete = bill;
            $('#modal-delete').modal('open');
        }
    }
});