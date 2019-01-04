Date.prototype.addSeconds= function(h){
	this.setSeconds(this.getSeconds()+h);
	return this;
};

//si se lo mando en negativo empieza a contar mas
//var date = new Date().addSeconds(-376280) / 1000;

//$('.timer').countid({
//  clock: true,
//  dateTime: date,
//  dateTplRemaining: "%H:%M:%S",
//  dateTplElapsed: "%H:%M:%S",
//  complete: function( el ){
//	  el.animate({ 'font-size': '18px'});
//  }
//});
