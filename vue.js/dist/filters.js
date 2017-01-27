"use strict";

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

Vue.filter('payLabel', function (value) {
    return value == 1 ? "Pago" : "Não Pago";
});

Vue.filter('receiveLabel', function (value) {
    return value === false ? "Recebido" : "Não Recebido";
});

Vue.filter('billPayStatus', function (value) {
    if (value === false) {
        return "Nenhuma conta cadastrada";
    }

    if (value == 0) {
        return "Nenhuma conta a pagar";
    } else {
        if (value > 1) {
            return "Existem " + value + " contas a serem pagas";
        } else {
            return "Existe 1 conta a ser paga";
        }
    }
});

Vue.filter('billReceiveStatus', function (value) {
    if (value === false) {
        return "Nenhuma conta cadastrada";
    }

    if (value == 0) {
        return "Nenhuma conta a receber";
    } else {
        if (value > 1) {
            return "Existem " + value + " contas a receber";
        } else {
            return "Existe 1 conta a receber";
        }
    }
});

Vue.filter('numberFormat', {
    read: function read(value, language) {
        var number = 0;

        var currency = function currency(language) {
            if (language == 'pt-BR') {
                return 'BRL';
            }
            return 'USD';
        };

        if (value && (typeof value === "undefined" ? "undefined" : _typeof(value)) !== undefined) {
            var numberRegex = value.toString().match(/\d+(\.{1}\d{1,2}){0,1}/g);
            number = numberRegex ? numberRegex[0] : numberRegex;
        }

        return new Intl.NumberFormat(language, {
            maximumFractionDigits: 2,
            minimumFractionDigits: 2,
            style: 'currency',
            currency: currency(language)
        }).format(number);
    },
    write: function write(value) {
        var number = 0;
        if (value.length > 0) {
            number = value.replace(/[^\d\,]/g, '').replace(/\,/g, '.');
        }
        return number;
    }
});

Vue.filter('dateFormat', {
    read: function read(value, language) {
        if (value && (typeof value === "undefined" ? "undefined" : _typeof(value)) !== undefined) {
            if (!(value instanceof Date)) {
                var dateRegex = value.match(/\d{4}\-\d{2}\-\d{2}/g);
                var dateString = dateRegex ? dateRegex[0] : dateRegex;
                if (dateString) {
                    value = new Date(dateString + "T03:00:00");
                } else {
                    return value;
                }
            }
            return new Intl.DateTimeFormat(language).format(value).split(' ')[0];
        }
        return value;
    },
    write: function write(value) {
        var dateRegex = value.match(/\d{2}\/\d{2}\/\d{4}/g);
        if (dateRegex) {
            var dateString = dateRegex[0];
            var date = new Date(dateString.split('/').reverse().join('-') + "T03:00:00");
            if (!isNaN(date.getTime())) {
                return date;
            }
        }

        return value;
    }
});

Vue.filter('textFormat', {
    read: function read(value) {
        var text = value.toString();
        return text.toUpperCase();
    },
    write: function write(value) {
        var text = value.toString();
        return text.toLowerCase();
    }
});