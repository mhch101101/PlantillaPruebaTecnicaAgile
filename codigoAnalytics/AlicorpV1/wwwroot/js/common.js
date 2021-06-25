function FormaData(objeto) {
    var result = new FormData();

    for (var key in objeto) {
        result.append(key, objeto[key]);
    }

    return result;
}

function Encrypt(valor,keys) {
    const key = CryptoJS.enc.Utf8.parse(keys);
    const iv = CryptoJS.enc.Utf8.parse(keys);

    let result = CryptoJS.AES.encrypt(CryptoJS.enc.Utf8.parse(valor), key,
        {
            keySize: 128 / 8,
            iv: iv,
            mode: CryptoJS.mode.CBC,
            padding: CryptoJS.pad.Pkcs7
        });

    return result.toString();
}

function toFormData(obj,key) {
    let fd = new FormData();
    let dato;
    for (var i in obj) {
        dato = Encrypt(obj[i], key);
        fd.append(i, dato);
    }
    return fd;
}

function JustLetterNumber(e) {
    key = e.keyCode || e.which;
    tecla = String.fromCharCode(key).toLowerCase();
    letters = " áéíóúabcdefghijklmnñopqrstuvwxyz0123456789,.-#_";
    //special = [8, 37, 39, 46];
    special = [8, 39];

    special_key = false
    for (var i in special) {
        if (key == special[i]) {
            special_key = true;
            break;
        }
    }

    if (letters.indexOf(tecla) == -1 && !special_key)
        return false;
}
function nobackbutton() {
    window.location.hash = "no-back-button";
    window.location.hash = "Again-No-back-button"
    window.onhashchange = function () { window.location.hash = "no-back-button"; }
}
function LettersUpper(e) {
    e.value = e.value.toUpperCase();
}

function JustNumber(e) {
    var key = window.Event ? e.which : e.keyCode
    return (key >= 48 && key <= 57)
}

function FullNumber(evento) {
    //Data
    var decimalPlaces = $(evento.currentTarget).data('puntos-decimales');
    var maximoValor = $(evento.currentTarget).data('maximo-valor');
    var esDecimal = decimalPlaces !== undefined && decimalPlaces !== null;
    var tieneMaximo = maximoValor !== undefined && maximoValor !== null;
    //Constantes
    var excepciones = esDecimal ? [46] : [];
    var exceptionPass = true;
    var maxValuePass = true;
    var maxDecimalPass = true;
    //Validar direccionales
    if (evento.keyCode != null) {
        var directionals = [38, 40, 37, 39];
        if (jQuery.inArray(evento.keyCode, directionals) != -1) {
            return true;
        }
    }
    //Empezar Validaciones
    var charCode = (evento.which) ? evento.which : evento.keyCode;
    //Excepciones
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
        if (jQuery.inArray(charCode, excepciones) == -1) {
            exceptionPass = false;
        }
    }
    if (!exceptionPass) return false;
    //Validacion decimales
    if (esDecimal) {
        var startPos = evento.currentTarget.selectionStart;
        var currentValue = evento.currentTarget.value;
        var currentSelectionInvalidPass = window.getSelection().toString() != currentValue;
        if ((currentValue.length <= 0 && charCode == 46)
            || (currentValue.indexOf(".") != -1 && charCode == 46)
            || (currentValue.indexOf(".") != -1 && currentValue.split(".")[1].length >= decimalPlaces
                && startPos > currentValue.indexOf(".") && currentSelectionInvalidPass)
            || (startPos == 0 && charCode == 46)) {
            maxDecimalPass = false;
        }
    }
    if (!maxDecimalPass) return false;
    //Validacion Maximo
    var validarMaximo = function (control, codigoAscii) {
        var startPaste = evento.currentTarget.selectionStart;
        var leftTake = control.value.substr(0, startPaste);
        var rightTake = control.value.substr(startPaste, 13);
        var numero = (window.getSelection().toString() == control.value)
            ? parseFloat(String.fromCharCode(codigoAscii))
            : parseFloat(leftTake + String.fromCharCode(codigoAscii) + rightTake);
        return !(numero > maximoValor);
    };
    if (tieneMaximo) {
        maxValuePass = validarMaximo(evento.currentTarget, charCode);
        if (!maxValuePass) return false;
    }
    return true;
}
//patron = /[A-Za-zñÑ\sÁáéíóú]/;
//pattern = ""
function JustLetters(e) {
    tecla = (document.all) ? e.keyCode : e.which; // 2
    if (tecla == 8) return true; // 3
    if (tecla == 189) return true; // 3
    if (tecla == 109) return true; // 3
    if (tecla == 111) return true; // 3
    if (tecla == 13) return true; //

    patron = /[a-zA-ZñÑáéíóúÁÉÍÓÚ\s]/
    te = String.fromCharCode(tecla); // 5
    return patron.test(te); // 6
}

function IsUrl(str) {
    //Declaramos la expresión regular que se usará para validar la url pasada por parámetro
    var regexp = /(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/
    //Retorna true en caso de que la url sea valida o false en caso contrario
    return regexp.test(str);
}

function FormatBytes(bytes, decimals) {
    if (bytes == 0) return 0;
    var k = 1024,
        dm = decimals || 2,
        i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm));
}

function ValidateEmail(valor) {
    emailRegex = /^[-\w.%+]{1,64}@(?:[A-Z0-9-]{1,63}\.){1,125}[A-Z]{2,63}$/i;

    if (emailRegex.test(valor)) {
        return true;
    } else {
        return false;
    }

}

function Page_Confirm(opciones) {
    var bootboxOptions = {
        message: opciones.mensaje,
        buttons: {
            confirm: {
                label: opciones.botonSi,
                className: 'btn btn-danger'
            },
            cancel: {
                label: opciones.botonNo,
                className: 'btn btn-default'
            }
        },
        callback: function (result) {
            if (result) {
                if (opciones.funcionSi) {
                    opciones.funcionSi();
                }
            } else {
                if (opciones.funcionNo) {
                    opciones.funcionNo();
                }
            }
        }
    };
    if (opciones.titulo) {
        bootboxOptions.title = opciones.titulo;
    }
    var confirm = bootbox.confirm(bootboxOptions);
    //SetEstilosAlertConfirm(confirm);
}

function Page_Alert(opciones) {
    var bootboxOptions = {
        message: opciones.mensaje,
        size: 'small',
        buttons: {
            ok: {
                label: opciones.botonOK,
                className: 'btn btn-danger'
            }
        },
        callback: function () {
            if (opciones.funcionSi) {
                opciones.funcionSi();
            }
        }
    };
    if (opciones.titulo) {
        bootboxOptions.title = opciones.titulo;
    }

    var alerta = bootbox.alert(bootboxOptions);
    //SetEstilosAlertConfirm(alerta);
}

function ConvertirFechaFormatoReconocido(date) {
    var d = date.getDate();
    var m = date.getMonth() + 1;
    var y = date.getFullYear();

    var dateString = (d <= 9 ? '0' + d : d) + '/' + (m <= 9 ? '0' + m : m) + '/' + y;
    return dateString;
}

function esFechaMayorHoy(fechaVal) {
    var arrFecha = fechaVal.split("/");
    if (arrFecha.length != 3)
        return null;
    var dia = arrFecha[0];
    var mes = (arrFecha[1] - 1);
    var anio = (arrFecha[2]);
    //--
    var fecha = new Date(anio, mes, dia);
    var hoy = new Date();
    //--
    return (dateDiff('d', fecha, hoy) < 0);
}

//Funcion para comparar fechas, que la fecha inicio
//no sea mayor a la fecha fin
function CompararFechas(DateInit, DateEnd) {

    var ValidateDate = false;

    if (DateInit == '' || DateEnd == '' || typeof DateInit === "undefined" || typeof DateEnd === "undefined") {
        ValidateDate = true;
    } else {

        var fechaIniVal = DateInit;
        var fechaFinVal = DateEnd;

        var inicio = fechaIniVal.split("/");
        var end = fechaFinVal.split("/");

        if (end[2] > inicio[2]) {
            ValidateDate = true;
        }
        else if (end[2] == inicio[2]) {
            if (end[1] > inicio[1]) {
                ValidateDate = true;
            } else if (end[1] == inicio[1]) {
                if (end[0] >= inicio[0]) {
                    ValidateDate = true;
                } else {
                    ValidateDate = false;
                }
            } else {
                ValidateDate = false;
            }
        } else {
            ValidateDate = false;
        }
    }
    return ValidateDate;
}


function JustLettersAndNumbers(e) {
    key = e.keyCode || e.which;
    tecla = String.fromCharCode(key).toLowerCase();
    letters = " 0123456789áéíóúabcdefghijklmnñopqrstuvwxyz";
    special = "8-37-39-46";
    //special = "8-37";
    special_key = false
    for (var i in special) {
        if (key == special[i]) {
            special_key = true;
            break;
        }
    }

    if (letters.indexOf(tecla) == -1 && !special_key)
        return false;
}

// 0: iguales
// 1: hora1 > hora2
// 2: hora2 > hora1
function CompareHours(sHora1, sHora2) {

    var arHour1 = sHora1.split(":");
    var arHour2 = sHora2.split(":");

    // Obtener horas y minutos (hora 1) 
    var hh1 = parseInt(arHour1[0], 10);
    var mm1 = parseInt(arHour1[1], 10);

    // Obtener horas y minutos (hora 2) 
    var hh2 = parseInt(arHour2[0], 10);
    var mm2 = parseInt(arHour2[1], 10);

    // Comparar 
    if (hh1 < hh2 || (hh1 == hh2 && mm1 < mm2))
        return 2;
    else if (hh1 > hh2 || (hh1 == hh2 && mm1 > mm2))
        return 1;
    else
        return 0;
} 

function soloNumerosCommons(e) {
    var key = window.Event ? e.which : e.keyCode
    return (key >= 48 && key <= 57)
}

function soloDecimalesCommons(e) {
    var key = window.Event ? e.which : e.keyCode
    return (key >= 48 && key <= 57) || key == 46
}

function validarDecimalesDirecto(event) {
    if ((event.charCode >= 48 && event.charCode <= 57) || event.charCode == 46) {
        return true;
    }
    return false;  
}

function soloLetrasCommons(e) {
    tecla = (document.all) ? e.keyCode : e.which; // 2
    if (tecla == 8) return true; // 3
    if (tecla == 189) return true; // 3
    if (tecla == 109) return true; // 3
    if (tecla == 111) return true; // 3
    if (tecla == 13) return true; //

    patron = /[a-zA-ZñÑáéíóúÁÉÍÓÚ\s]/
    te = String.fromCharCode(tecla); // 5
    return patron.test(te); // 6
}

function soloLetrasNumeroCommons(e) {
    tecla = (document.all) ? e.keyCode : e.which; // 2
    if (tecla == 8) return true; // 3
    if (tecla == 189) return true; // 3
    if (tecla == 109) return true; // 3
    if (tecla == 111) return true; // 3
    if (tecla == 13) return true; //

    patron = /[a-zA-ZñÑáéíóúÁÉÍÓÚ\s]/
    te = String.fromCharCode(tecla); // 5

    var key = window.Event ? e.which : e.keyCode

    return patron.test(te) || (key >= 48 && key <= 57); // 6
}

$(".txtSoloDigitos").on("keypress", function (event) {
    if (!soloNumerosCommons(event)) {
        event.preventDefault();
    }
});

$(".txtDecimales").on("keypress", function (event) {
    if (!soloDecimalesCommons(event)) {
        event.preventDefault();
    }
});

$(".txtSoloLetras").on("keypress", function (event) {
    if (!soloLetrasCommons(event)) {
        event.preventDefault();
    }
});

$(".txtSoloLetrasNumeros").on("keypress", function (event) {
    if (!soloLetrasNumeroCommons(event)) {
        event.preventDefault();
    }
});

$(".txtSinEspacio").on("keypress", function (event) {
    if (event.which === 32) {
        event.preventDefault();
    }
});

$(".txtMayus").on("keyup", function () {
    $input = $(this);
    $input.val($input.val().toUpperCase());
});

$('.disabledCopyPaste').on('copy paste', function (e) {
    e.preventDefault();
});