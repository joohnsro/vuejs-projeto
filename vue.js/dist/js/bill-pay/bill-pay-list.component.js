'use strict';

window.billPayListComponent = Vue.extend({
    components: {
        'modal-component': modalComponent
    },
    template: '\n    <table class="bordered striped highlight centered responsive-table">\n        <thead>\n        <tr>\n            <th>#</th>\n            <th>Vencimento</th>\n            <th>Nome</th>\n            <th>Valor</th>\n            <th>Paga?</th>\n            <th>A\xE7\xF5es</th>\n        </tr>\n        </thead>\n        <tbody>\n        <tr v-for="(index, o) in bills">\n            <td>{{ index + 1 }}</td>\n            <td>{{ o.date_due | dateFormat \'pt-BR\' }}</td>\n            <td>{{ o.name | textFormat }}</td>\n            <td>{{ o.value | numberFormat \'pt-BR\' }}</td>\n            <td :class="{\n                \'green white-text\': o.done == 1,\n                \'red white-text\': o.done == 0\n            }">\n                {{ o.done | payLabel }}\n            </td>\n            <td>\n                <a v-link="{name: \'bill-pay.update\', params: { id: o.id }}">Editar</a> | \n                <a href="#" @click.prevent="openModalDelete(o)">Excluir</a>\n            </td>\n        </tr>\n        </tbody>\n    </table>\n    <modal-component :modal="modal">\n        <div slot="content">\n            <h4>Mensagem de confirma\xE7\xE3o</h4>\n            <p><strong>Deseja excluir esta conta?</strong></p>\n            <div class="divider"></div>\n            <p><strong>Nome:</strong> {{ billToDelete.name }}</p>\n            <p><strong>Data de vencimento:</strong> {{ billToDelete.date_due | dateFormat \'pt-BR\' }}</p>\n            <p><strong>Valor:</strong> {{ billToDelete.value | numberFormat \'pt-BR\' }}</p>\n            <div class="divider"></div>\n        </div>\n        <div slot="footer">\n            <button class="btn btn-flat red white-text waves-effect waves-light modal-action modal-close" @click.prevent="billDelete()">OK</button>\n            <button class="btn btn-flat white modal-action modal-close">Cancelar</button>\n        </div>\n    </modal-component>\n    ',
    data: function data() {
        return {
            bills: [],
            billToDelete: null,
            modal: {
                id: 'modal-delete'
            }
        };
    },
    created: function created() {
        var _this = this;

        BillPay.query().then(function (response) {
            _this.bills = response.data;
            _this.$dispatch('update-info');
        });
        $(document).ready(function () {
            $('#modal-delete').modal();
        });
    },

    methods: {
        billDelete: function billDelete() {
            var _this2 = this;

            BillPay.delete({ id: this.billToDelete.id }).then(function (response) {
                _this2.bills.$remove(_this2.billToDelete);
                _this2.billToDelete = null;
                Materialize.toast('Conta excluída com sucesso. <i class="material-icons right">done</i>', 4000);
                _this2.$dispatch('update-info');
            });
        },
        openModalDelete: function openModalDelete(bill) {
            this.billToDelete = bill;
            $('#modal-delete').modal('open');
        }
    }
});