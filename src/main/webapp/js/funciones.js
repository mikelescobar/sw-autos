

//VARIABLES GLOBALES
var taskID;
var estado;
var processid;
var codigoCliente;

//FORMATO DE FECHAS
function formatoFechaISO(stringFecha) {
    // padding function
    //var s = function (p) {
    //    return ('' + p).length < 2 ? '0' + p : '' + p;
    //};

    // default parameter
    //if (typeof d === 'undefined') {
        var d = new Date(stringFecha);
    //};

    // return ISO datetime
    return d.getDate() + '/' +
        (d.getMonth() + 1) + '/' +
        (d.getFullYear()) + ' ' +
        (d.getHours()) + ':' +
        (d.getMinutes()) + ':' +
        (d.getSeconds());
}


// OBTENER PARAMETRO DE URLS
$.urlParam = function (name) {
    var results = new RegExp('[\?&]' + name + '=([^&#]*)').exec(window.location.href);
    if (results === null) {
        return null;
    }
    else {
        return results[1] || 0;
    }
};

//OBTENER NOMBRE Y APELLIDO DE CLIENTE
var obtieneNombreCliente = function (idCliente) {
    $.ajax({
        type: 'GET',
        cache: true,
        dataType: 'json',
        url: 'http://bpmdemo:8080/ISSS_Servicios/webresources/entidades.afiliado/' + idCliente,
        success: function (data) {
            console.log(data.nombres);
            console.log(data.apellidos);
            nombreClienteActivo(data.nombres, data.apellidos);
        },
        error: function () {
            //para pruebas offline de formateo
            console.log('pruebas Offline Obtiene Nombre Cliente =====');
            var json = {
                "numafiliacion": 840285147,
                "nombres": "ROGER ERNESTO",
                "apellidos": "ESCOBAR RAMIREZ",
                "dui": "678925419",
                "sexo": "M",
                "ocupacion": "TECNICO EN SISTEMAS",
                "departamento": "SAN SALVADOR",
                "municipio": "SOYAPANGO",
                "direccion": "CASA #15 COL. SAN JOSE"
            };
            console.log(data.nombres);
            console.log(data.apellidos);
            nombreClienteActivo('PRUEBAS ', 'OFFLINE');
        }
    })
}

var nombreClienteActivo = function (primerNombreCliente, primerApellidoCliente) {
    $("#nombre_cliente").html(decodeURI(primerNombreCliente));
    $("#apellido_cliente").html(decodeURI(primerApellidoCliente));
};

//================================================================  FIN NOMBRE CLIENTUE

// MOSTRAR DATOS CLIENTE

//Funcion que ejecuto en la carga de cada pagina, setea las variables globales y decide como iniciar la tarea
var cargaPaginaIniciaTarea = function(){
    processid = $.urlParam('processid');
    codigoCliente = $.urlParam('clientesID');
    taskID = $.urlParam('taskID');
    estado = $.urlParam('estado');
    console.log('variables seteadas: processid=' + processid + ' codigoCliente=' + codigoCliente + ' taskID=' + taskID + ' estado=' + estado)
    //Verifico el estado y si es "Ready" o "Reserved" inicio la tarea, cuando existe un "estado" es que viene de la pantalla de tareas pendientes o en proceso.
    if (estado == 'Ready' || estado == 'Reserved') {
        console.log('INICIANDO TAREA CON ID: ' + taskID);
        iniciaTarea(taskID, processid, 0);
    }
    if (estado == null) {//vengo del paso anterior o abro la pagina sin parametros, solo recibo en la URL el processID y el clienteID
        //busco la tarea para obtener el ID e iniciarla
        obtieneTareaPorProceso(processid, 0);
    }
}

//Funcion para obtener usuario
var cargaCredenciales = function (esIndex) {
    //verifico si existe la entrada en localstorage
    if (localStorage.getItem('usuarioAPP') !== null) {//existe, seteo todo
        console.log("LS Usuario: " + localStorage.getItem("usuarioAPP"));
        console.log("LS Rol: " + localStorage.getItem("rolAPP"));
        //hago la distincion si debo cargar la opcion de los procesos o no (en el menu)
        if (localStorage.getItem("rolAPP") == 'recepcionista'){//cargo el menu de procesos
            $('#procesolista').html('<li><h2><span class="glyphicon glyphicon-cog"></span> Procesos</h2></li><li><a href="../consulta/01-busqueda-afiliado.html">Consulta Externa</a></li>');
        }
        //Seteo el usuario en la parte superior derecha
        window.usuario = localStorage.getItem("usuarioAPP");
        $('#dash-bt-user').html('<span class="glyphicon glyphicon-user"></span> ' + window.usuario );
    }
    else {//no existe, lo redirigo al root para que la tome       
            window.location = '../';
    }
    //var usuarioDigicel = $.cookie("userDigicel");
    //var rolDigicel = $.cookie("rolDigicel");
    
    //window.passwd = credenciales.pwd;
    //window.rol = rolDigicel;
    

    //var credenciales = localStorage.getItem('credencialesls');
    //console.log(credenciales);
    //credenciales = JSON.parse(credenciales);
    //window.usuario = credenciales.usuario;
    //window.passwd = credenciales.pwd;

    //localStorage.setItem("usuarioAPP", usuarioDigicel);
    //localStorage.setItem("rolAPP", rolDigicel);
    
}


// BOTONES

var botonSiguiente = function (processIDparam, dataArray) {
    var pasoSiguiente = $("#paso_siguiente").val();
    //si es el boton Siguiente de la primera pantalla el idCliente se toma de un Div, para todos los demas se toma de la URL.
    if (!$("#clientes_numeroAfiliacion").val()) {//paso 2 en adelante
        var codigoCliente = $.urlParam("clientesID");
        //finalizo la tarea, taskID la seteo en la funcion iniciaTarea al cargar cada pagina.
        completaTarea(taskID, processid, dataArray, 0);
        //alert('Boton Siguiente paso N, codigoCliente=' + codigoCliente);

        window.location = pasoSiguiente + "?processid=" + processid + "&clientesID=" + codigoCliente;
    }
    else {//Caso: Boton siguiente paso 1
        var codigoCliente = $("#clientes_numeroAfiliacion").val();
        //alert('Boton Siguiente paso 1, codigoCliente=' + codigoCliente);
        window.location = pasoSiguiente + "?processid=" + processIDparam + "&clientesID=" + codigoCliente;
    }
};


// BOTONES

var botonSiguientePaso1 = function () {//Inicio un proceso.
    var parametros = {
        "map_afiliadoID": '"' + $('#clientes_numeroAfiliacion').val() + '"',
        "map_DUI": '"' + $('#clientes_DUI').val() + '"',
        "map_nombreAfiliado": '"' + $('#clientes_nombreAfiliado').val() + '"'
    };
    iniciaProceso(processDefinitionID, processDeployment, parametros);
};

//Equivalente a botonSiguiente paso 3
var seleccionarLineas = function () {
    var totalTemprana = 0;
    var selected_value = "";
    //var urlJSON = $("#urlJSON").val();
    $.agregarValorLinea = function () {
        var lineaStr = ($(this).val());
        var linea = lineaStr.substring(0, (lineaStr.length - 1));
        var nLinea = lineaStr.substring((lineaStr.length - 1), lineaStr.length);
        if (parseInt(nLinea) > 0) {
            totalTemprana = totalTemprana + 1;
            console.log(nLinea);
        }
        selected_value += linea + ",";
    };
    $("input:checked[name='selLineaCuentaId']").each($.agregarValorLinea);

    if (totalTemprana > 0) {//si hay renovacion temprana
        $.getJSON('http://172.26.20.122:8080/DigicelSPP_Services/webresources/BuscarSolicitud/getUpdateSolicitud', { lineascuentaid: selected_value.substring(0, (selected_value.length - 1)) }, $.mostrarMensajeTemprana);
        //completo la tarea y la redirijo a la lista de tareas pendientes, lo hago seteando el valor de "paso_siguiente" a la lista de tareas pendientes
        //$.iniciaProcesoEmail("RenovacionLineas.Aprobacion_Temprana", "bpmDigicel:RenovacionLineas:1.0", "89008", "mikel.escobar@datumredsoft.com");
        $("#paso_siguiente").val('../tareas/tareas-pendientes.html');
        var param_map = {
            'map_tipo_renovacion': 'temprana',
            'map_dir_correo': 'jose.ramirez@datumredsoft.com'
        }
        //alert('Boton siguiente renovacion temprana');
        window.setTimeout(botonSiguiente, 3000, '', param_map);
        //window.setTimeout($.redirHome,5000);

    } else {//si no hay renovacion temprana
        $.getJSON('http://172.26.20.122:8080/DigicelSPP_Services/webresources/BuscarSolicitud/getUpdateSolicitud', { lineascuentaid: selected_value.substring(0, (selected_value.length - 1)) }, $.mostrarMensajeConfirma);
        //completo la tarea y redirijo a la tarea 4: Oferta
        var param_map = {
            'map_tipo_renovacion': 'notemprana'
        }
        //alert('Boton siguiente NO renovacion temprana');
        window.setTimeout(botonSiguiente, 3000, '', param_map);
    }
};


var botonSiguientePaso4 = function () {
    console.log('Boton Siguiente Paso 4');
    obtieneVariablePaso4();
    //var incremento = $("#incrementoLC").val();
    //var incremento = $("#contenido_ucOfertaRenovacion1_ucEncabezadoOfertaRenovacion1_Label_IncrementoLC").text();
    //$.wsOferta($.urlParam('processid'), $("#incrementoLC").val());
    //if (incremento > 5) {//Camino por defecto
    //    $("#paso_siguiente").val('05-adicionar-actualizar-ingresos-egresos.html');
    //    window.location = pasoSiguiente + "?processid=" + processid + "&clientesID=" + codigoCliente;
    //    //LO SIGUIENTE ES SI QUIERO USAR EL CAMPO MANUAL
    //    //var param_map = {
    //    //    'map_autorizarLC': 'Si_CC'
    //    //}
    //    ////alert('Boton siguiente Si_CC');
    //    //botonSiguiente('', param_map);
    //}
    //else {
    //    window.location = pasoSiguiente + "?processid=" + processid + "&clientesID=" + codigoCliente;
    //    //var param_map = {
    //    //    'map_autorizarLC': 'No_CC'
    //    //}
    //    ////alert('Boton siguiente No_CC');
    //    //botonSiguiente('', param_map);
    //}
}

var botonSiguienteAprobacionTemprana = function (aprobado) {
    console.log('Boton Siguiente Aprobacion Temprana');
    //$.wsOferta($.urlParam('processid'), $("#incrementoLC").val());
    if (aprobado == 'aprobado') {//Camino por defecto
        var param_map = {
            'map_aprobarRenovacion': 'aprobada'
        }
        //alert('Boton siguiente renovacion temprana aprobada');
        botonSiguiente('', param_map);
    }
    else {
        var param_map = {
            'map_aprobarRenovacion': 'noaprobada'
        }
        //alert('Boton siguiente renovacion temprana rechazada');
        botonSiguiente('', param_map);
    }
}

var botonSiguientePaso8 = function (aprobado) {
    console.log('Boton Siguiente Aprobacion Temprana');
    //$.wsOferta($.urlParam('processid'), $("#incrementoLC").val());
    if (aprobado == 'aprobado') {//Camino por defecto
        var param_map = {
            'map_aprobarLC': 'SiApro_CC'
        }
        //alert('Boton siguiente Aprobado LC');
        botonSiguiente('', param_map);
    }
    else {
        var param_map = {
            'map_aprobarLC': 'NoApro_CC'
        }
        //alert('Boton siguiente renovacion rechazado LC');
        botonSiguiente('', param_map);
    }
}


$.botonTerminar = function(){
    var r = confirm("Esta seguro que desea salir?");
    if (r === true) {
        window.location = "../tareas/tareas-pendientes.html";
    }
};


$.mostrarMensajeConfirma = function (){
	$.alert('Las lineas seleccionadas se han enviado a Renovacion', {
		closeTime: 3000,
		type: 'success',
		title: false,
		position: ['center', [-0.42, 0]]
  	});
};

$.mostrarMensajeTemprana = function (datos){
	$.alert('Fue enviada al lider una solicitud de aprobación temprana para las lineas seleccionadas', {
		closeTime: 5000,
		type: 'success',
		title: false,
		position: ['center', [-0.42, 0]]
  	});
};

$.redirHome = function(){
	window.location = "../index.html";
};
