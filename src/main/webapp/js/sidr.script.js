$(document).ready(function () {
  $('#simple-menu').sidr({
	timing: 'ease-in-out',
	speed: 500
  });
});

$( window ).resize(function () {
  $.sidr('close', 'sidr');
});

$('#overlay, #close-menu-button, #close-menu-inside').click(function (event) {
    event.preventDefault();
  $.sidr('close', 'sidr');
});

