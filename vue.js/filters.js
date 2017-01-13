Vue.filter('payLabel', function ( value ) {
    if ( value == 1 ) {
        return "Pago";
    } else {
        return "Não pago";
    }
});

Vue.filter('receiveLabel', function ( value ) {
    if ( value == 1 ) {
        return "Recebido";
    } else {
        return "Não recebido";
    }
});

Vue.filter('billPayStatus', function ( value ) {
    if ( value === false ) {
        return "Nenhuma conta cadastrada";
    }

    if ( value == 0 ) {
        return "Nenhuma conta a pagar";
    } else {
        if ( value > 1 ) {
            return "Existem " + value +  " contas a serem pagas";
        } else {
            return "Existe 1 conta a ser paga";
        }
    }
});

Vue.filter('billReceiveStatus', function ( value ) {
    if ( value === false ) {
        return "Nenhuma conta cadastrada";
    }

    if ( value == 0 ) {
        return "Nenhuma conta a receber";
    } else {
        if ( value > 1 ) {
            return "Existem " + value +  " contas a receber";
        } else {
            return "Existe 1 conta a receber";
        }
    }
});