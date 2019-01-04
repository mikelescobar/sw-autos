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
  element: "#cuadro-informativo",
  placement: "bottom",
  title: "Cuadro de tareas",
  content: "Aquí puedes ver cuantas son tus tareas pendientes, tus tareas completadas y el promedio de horas que te lleva completarlas.",
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
