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
                "Access-Control-Allow-Origin":"*",
                "Access-Control-Allow-Methods": "GET",
                "content-type": "application/json",
                "cache-control": "no-cache",
            },
            "success": console.log('success')
        }

        $.ajax(settingsVehiculo).done(function (data) {
            console.log(data);
            html = '';
            html += '<tr>';
            html += '<td>' + data.marca + '</td>';
            html += '<td>' + data.modelo + '</td>';
            html += '<td>' + data.tipo + '</td>';
            html += '<tr>';
            document.getElementById('tblBodyVehiculo').innerHTML = html;
        });
        var settingsPersona = {
            "async": true,
            "crossDomain": true,
            "url": "http://servidor03-prj-base.192.168.99.100.nip.io/SW-Personas-1.0/webresources/personaws/personaxvehiculo?idvehiculo=" + codigoAuto,
            "method": "GET",
            "headers": {
                "Access-Control-Allow-Origin":"*",
                "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE",
                "content-type": "application/json",
                "cache-control": "no-cache",
            },
            "success": console.log('success')
        }

        $.ajax(settingsPersona).done(function (data) {
            html = '<table>';
            $.each(data, function (i, item) {
                html += '<tr>';
                html += '<td>' + item.dui + '</td>';
                html += '<td>' + item.nombre + ', ' + item.apellido + '</td>';
                html += '<tr>';
            });
            html 
            document.getElementById('tblBodyPersona').innerHTML = html;
        });
    });
});
