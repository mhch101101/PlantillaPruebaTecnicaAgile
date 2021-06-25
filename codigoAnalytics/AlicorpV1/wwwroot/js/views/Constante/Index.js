function abrirModal() {
    $("#modalUno").modal('show');
}

var row = {
    obj: { IdUsuario: 2 },
}
$.ajax({
    data: row,
    url: "/Home/MetodoUno",
    type: 'POST',
    dataType: "json",
    success: function (resultado) {
        console.log(resultado);
    },
    error: function () {

    }

});