$(document).ready(function () {

    
    $("#btnLogin").click(function () {
        //guardo las variables processID y clientID en localStorage (validar que no se pueda usar este boton (btnTerminar) si no ha cargado un clientID)
        console.log('funcion guardar en localStorage');
        var credenciales = {
            usuario: $('#j_username').val(),
            pwd: $('#j_password').val()
        };
        //lo convierto a JSON
        credenciales = JSON.stringify(credenciales);
        //por si lo quiero encriptar
        //bpms = btoa(bpms);
        //lo guardo en el localStorage
        localStorage.setItem('credencialesls', credenciales);
        console.log('funcion guardar en localStorage completada');
        console.log(credenciales);
        window.location = '../index.html';
    });

});


