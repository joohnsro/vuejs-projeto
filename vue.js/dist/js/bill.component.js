'use strict';

window.billComponent = Vue.extend({
    template: '\n    <nav>\n        <div class="nav-wrapper container">\n            <a href="#" class="brand-logo">Projeto 5</a>\n            <a href="#" data-activates="nav-mobile" class="button-collapse">\n                <i class="material-icons">menu</i>\n            </a>\n            <ul class="hide-on-med-and-down right">\n                <li v-for="o in menus">\n                    <a v-if="o.dropdownId" class="dropdown-button" href="#" v-bind:data-activates="o.dropdownId">\n                        {{ o.name }} <i class="material-icons right">arrow_drop_down</i>\n                    </a>\n                    <a v-else v-link="{name: o.routeName}">{{ o.name }}</a>\n                </li>\n                <li>\n                    <a v-link="{name: \'dashboard\'}" class="btn btn-floating grey darken-4">\n                        <i class="material-icons">face</i>\n                    </a>\n                </li>\n            </ul>\n            <ul id="nav-mobile" class="side-nav">\n                <li v-for="o in menus">\n                    <a v-link="{name: o.routeName}">{{ o.name }}</a>\n                </li>\n            </ul>\n        </div>\n    </nav>\n    <ul v-bind:id="o.id" class="dropdown-content" v-for="o in menusDropdown">\n        <li v-for="item in o.itens">\n            <a v-link="{name: item.routeName}">{{ item.name }}</a>\n        </li>\n    </ul>\n    <router-view></router-view>\n    ',
    data: function data() {
        return {
            menus: [{ name: 'Dashboard', routeName: 'dashboard', dropdownId: null }, { name: 'Contas a pagar', routeName: 'bill-pay.list', dropdownId: 'bill-pay' }, { name: 'Contas a receber', routeName: 'bill-receive.list', dropdownId: 'bill-receive' }],
            menusDropdown: [{
                id: 'bill-pay',
                itens: [{ name: "Listar contas", routeName: "bill-pay.list" }, { name: "Criar conta", routeName: "bill-pay.create" }]
            }, {
                id: 'bill-receive',
                itens: [{ name: "Listar contas", routeName: "bill-receive.list" }, { name: "Criar conta", routeName: "bill-receive.create" }]
            }]
        };
    },
    created: function created() {
        $(document).ready(function () {
            $(".button-collapse").sideNav();
            $(".dropdown-button").dropdown();
        });
    }
});