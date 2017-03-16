$(document).ready(function(){
	$("#formCambiar").submit(function( event ) {
		var pass = $("#password").val()
		var pconfirm = $("#pconfirm").val()
		if (pass==pconfirm) {
			return;
		}
		alert("Los valores no son iguales.");		
		event.preventDefault();
	});
});  