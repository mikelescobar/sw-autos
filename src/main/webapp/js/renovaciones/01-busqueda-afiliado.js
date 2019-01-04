$(document).ready(function () {
    var codigoAuto = 0;
    $("#btnBuscar").click(function () {
        codigoAuto = $('#vehiculo_num').val();
        console.log("Codigo de auto " + codigoAuto);
        var settingsVehiculo = {
            "async": true,
            "crossDomain": true,
            "url": "http://servidor02-prj-base.192.168.99.100.nip.io/SW-Vehiculos-1.0/webresources/vehiculows/vehiculoxid?idvehiculo=" + codigoAuto,
            "method": "GET",
            "headers": {
                "Access-Control-Allow-Origin":"http://servidor02-prj-base.192.168.99.100.nip.io",
                "Access-Control-Allow-Methods": "GET, POST, PUT",
                "Access-Control-Allow-Headers": "Content-Type",
                "content-type": "application/json",
                "cache-control": "no-cache",
            },
            "success": console.log('success')
        }

        $.ajax(settingsVehiculo).done(function (data) {
            console.log(data);
            document.getElementById('idVehiculo').innerHTML = data.idvehiculo;
            document.getElementById('marca').innerHTML = data.marca;
            document.getElementById('modelo').innerHTML = data.modelo;
            document.getElementById('tipo').innerHTML = data.tipo;
            document.getElementById('descripcion').innerHTML = data.descripcion;
        });
    });
});
