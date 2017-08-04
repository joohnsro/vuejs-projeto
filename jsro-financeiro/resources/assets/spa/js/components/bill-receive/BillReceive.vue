<template>
    <div class="container">
        <h3>
            {{ title }}
            <small class="hide-on-large-only">
                <a v-link="{name: 'bill-receive.create'}" class="btn btn-floating green waves-effect waves-light">
                    <i class="material-icons">add</i>
                </a>
            </small>
        </h3>
        <div class="row">
            <div class="col s12 l6">
                <div class="card-panel">
                    <h5 class="truncate grey-text text-darken-1">
                        <i>1 conta a ser recebida</i>
                    </h5>
                </div>
            </div>
            <div class="col s12 l6">
                <div class="card-panel">
                    <h5 class="truncate grey-text text-darken-1">
                        <i>Total: R$ 6.700,00</i>
                    </h5>
                </div>
            </div>
        </div>
        <router-view></router-view>
    </div>
</template>

<script type="text/javascript">
    export default {
        data() {
            return {
                title: "Contas a receber",
                status: false,
                total: 0
            };
        }
    };
</script>