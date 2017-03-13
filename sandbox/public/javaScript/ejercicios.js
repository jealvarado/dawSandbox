$(document).ready(function() {
    
});

$(function() {

	$('#btnAdd').on('click', function() {

		var idUsuario = "sss"
		
	    // get the form data
	    // there are many ways to get this data using jQuery (you can use the class or id also)
	    var formData = {
	    	idUsuario    : idUsuario,
	        titulo       : $('input[name=titulo]').val(),
	        descripcion  : $('#descrip').val(),
	        datosEntrada : $('input[name=datoEntrada]').val(),
	        datosSalida	 : $('input[name=datoSalida]').val(),
	        etiquetas	 : $('input[name=etiq]').val(),
	        nivel		 : $('#nivel').val()
	    };

	    // console.log(formData);
	    // console.log(JSON.stringify(formData));

	    // process the form	       	        
	    $.ajax({
	        url 			: '/api/ejercicios',	// the url where we want to POST
	        type 			: 'POST', 			// define the type of HTTP verb we want to use (POST for our form)
		    data 			: formData,			// our data object
		    // dataType    	: 'json' 			// what type of data do we expect back from the server
		    contentType 	: 'application/x-www-form-urlencoded; charset=UTF-8',	// When sending data to the server
	        success 		: function(response) {
	            console.log(response);
	            borrarCampos();
	            //LoadData();
	            $('#modalEjerc').modal('hide');	            
	        }
		});

	});

});


function borrarCampos(){
	$('input[name=titulo]').val('');
	$('input[name=descrip]').val('');
	$('#nivel').val('principiante');
	$('input[name=datoEntrada]').val('');
	$('input[name=datoSalida]').val('');
	$('input[name=etiq]').val('');
}
