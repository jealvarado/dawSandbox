
(function() {

	$('#btnSign').on('click', function() {

		var formData = {
	        nombre      : $('input[name=uname]').val(),
	        contrasena	: $('input[name=psw]').val()
	    };

	    $.ajax({
	        url 			: '/authenticate',	
	        type 			: 'POST', 			
		    data 			: formData,
		    contentType 	: 'application/x-www-form-urlencoded; charset=UTF-8',
	        success 		: function(response) {
	            console.log(response);
	            borrarCampos();
	        }
		});

	});

});


function borrarCampos(){
	$('input[name=uname]').val();
	$('input[name=psw]').val();
}