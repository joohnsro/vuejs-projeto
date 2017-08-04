<template>
    <form>
        <div class="row">
            <div class="input-field col s6">
                <label class="active">Vencimento:</label>
                <input type="text">
            </div>
            <div class="input-field col s6">
                <label class="active">Valor:</label>
                <input type="text">
            </div>
        </div>
        <div class="row">
            <div class="input-field col s6">
                <label class="active">Nome:</label>
                <select class="browser-default">
                    <option v-for="o in billPaysNames" value="{{ o }}">{{ o }}</option>
                </select>
            </div>
            <div class="input-field col s6">
                <input id="pago" class="filled-in" type="checkbox">
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
    export default {
        data() {
            return {
                billPaysNames: [
                    'Conta de luz',
                    'Conta de água',
                    'Conta de telefone',
                    'Cartão de crédito',
                    'Supermercado',
                    'Gasolina',
                    'Empréstimo'
                ]
            };
        }
    };
</script>