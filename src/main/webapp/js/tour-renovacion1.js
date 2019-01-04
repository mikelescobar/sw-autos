// Instance the tour
var tour = new Tour({
  storage: false,
  template: "<div class='popover tour'><div class='arrow'></div><h3 class='popover-title'></h3><div class='popover-content'></div><div class='popover-navigation'><button class='btn btn-default' data-role='prev'>«</button><button class='btn btn-default' data-role='next'>»</button><button class='btn btn-default' data-role='end'>Fin</button></div></div>",
  steps: [
  {
    element: "#app-header",
	placement: "bottom",
    title: "Bienvenido",
    content: "Bienvenido a tu dashboard, aqui encuentras tus tareas pendientes y completadas",

},
{
  element: "#simple-menu",
  placement: "right",
  title: "Acceder al men&uacute;",
  content: "Abrelo dando click en este bot&oacute;n; para cerrarlo, solo necesitas dar click fuera de el.",
  backdrop: true,
  backdropPadding: 5
},
{
  element: "#aviso-tiempo",
  placement: "top",
  title: "Tiempo de tarea",
  content: "Este es un reloj que te muestra cuento tiempo te lleva completar cada paso.",
  backdrop: true,
  backdropPadding: 5
},
{
  element: "#formulario-renovacion-1",
  placement: "top",
  title: "Formulario de b&uacute;squeda de cliente",
  content: "Estos son los campos requeridos para buscar al cliente.",
  backdrop: true,
  backdropPadding: 5
},
{
  element: "#btnTerminar",
  placement: "top",
  title: "Terminar formulario",
  content: "Cuando hayas completado le formulario, debes terminar la tarea dando click en este bot&oacute;n.",
  backdrop: true,
  backdropPadding: 5
},
{
  element: "#btnSiguiente",
  placement: "top",
  title: "Siguiente paso",
  content: "Una vez hayas terminado este paso, pasa al siguiente dando click en este bot&oacute;n.",
  backdrop: true,
  backdropPadding: 5
}
]});

// Initialize the tour
tour.init();

// Start the tour
$('#dash-bt-ayuda').click(function(e){
    tour.start();
	e.preventDefault();
});
