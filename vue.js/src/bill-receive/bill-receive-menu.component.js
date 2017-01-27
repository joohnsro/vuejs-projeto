window.billReceiveMenuComponent = Vue.extend({
    template: `
    <nav>
        <ul>
            <li v-for="o in menus">
                <a v-link="{name: o.routeName}">{{ o.name }}</a>
            </li>
        </ul>
    </nav>
    `,
    data() {
        return {
            menus: [
                { name: "Listar contas", routeName: "bill-receive.list" },
                { name: "Criar conta", routeName: "bill-receive.create" }
            ],
        };
    }
});