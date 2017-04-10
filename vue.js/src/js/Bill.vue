<template>
    <nav>
        <div class="nav-wrapper container">
            <a href="#" class="brand-logo">Projeto 6</a>
            <a href="#" data-activates="nav-mobile" class="button-collapse">
                <i class="material-icons">menu</i>
            </a>
            <ul class="hide-on-med-and-down right">
                <li v-for="o in menus">
                    <a v-if="o.dropdownId" class="dropdown-button" href="#" v-bind:data-activates="o.dropdownId">
                        {{ o.name }} <i class="material-icons right">arrow_drop_down</i>
                    </a>
                    <a v-else v-link="{name: o.routeName}">{{ o.name }}</a>
                </li>
                <li>
                    <a v-link="{name: 'dashboard'}" class="btn btn-floating grey darken-4">
                        <i class="material-icons">face</i>
                    </a>
                </li>
            </ul>
            <ul id="nav-mobile" class="side-nav">
                <li v-for="o in menus">
                    <a v-link="{name: o.routeName}">{{ o.name }}</a>
                </li>
            </ul>
        </div>
    </nav>
    <ul v-bind:id="o.id" class="dropdown-content" v-for="o in menusDropdown">
        <li v-for="item in o.itens">
            <a v-link="{name: item.routeName}">{{ item.name }}</a>
        </li>
    </ul>
    <router-view></router-view>
</template>

<script type="text/javascript">
    export default {
        ready() {
            $(".button-collapse").sideNav();
            $(".dropdown-button").dropdown();
        },
        data() {
            return {
                menus: [
                    { name: 'Dashboard', routeName: 'dashboard', dropdownId: null },
                    { name: 'Contas a pagar', routeName: 'bill-pay.list', dropdownId: 'bill-pay' },
                    { name: 'Contas a receber', routeName: 'bill-receive.list', dropdownId: 'bill-receive' }
                ],
                menusDropdown: [
                    {
                        id: 'bill-pay',
                        itens: [
                            { name: "Listar contas", routeName: "bill-pay.list" },
                            { name: "Criar conta", routeName: "bill-pay.create" }
                        ]
                    },
                    {
                        id: 'bill-receive',
                        itens: [
                            { name: "Listar contas", routeName: "bill-receive.list" },
                            { name: "Criar conta", routeName: "bill-receive.create" }
                        ]
                    }
                ]
            };
        }
    }
</script>