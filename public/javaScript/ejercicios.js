var idEjercicio;
var borrar;

function LoadData() {
	$('#panelColl').empty();
    $.ajax({
        url:'/api/ejercicios/',
        type: 'GET',
        success:function(ejercicio){
            ejercicio.ejercicios.forEach(function(i){
              	$('#panelColl').append($('<div>',{"class":"panel panel-info","id":''+i._id}).append($('<div>',{"class":"panel-heading","style":"padding-bottom:20px;","id":'c'+i._id}).append(i.titulo+'	')));
               	$('#'+i._id).append($('<div>',{"class":"panel-body"}).append(i.descripcion));
               	$('#c'+i._id).append($('<button>',{"type":"button","class":"btn btn-warning","style":"float:right;margin-right:4px;margin-bottom:4px;","onclick":"mostrarData(\""+i._id+"\")"}).append("Editar"));
               	$('#c'+i._id).append(' ');
               	$('#c'+i._id).append($('<button>',{"type":"button","class":"btn btn-danger","style":"float:right;margin-right:4px;margin-bottom:4px;","onclick":"eliminarData(\""+i._id+"\")"}).append("Borrar"));
            })
        }
    })
}

function eliminarData(clave){
	$('#modalElim').modal('show');
	borrar=clave;
}

$(function() {
	$('#btnDelete').on('click', function() {
		console.log(borrar);
		$.ajax({
        	url:'/api/ejercicios/'+borrar,
        	type: 'DELETE',
        });
        LoadData();
	});
});

function mostrarData(clave){
	$("#errorMsj").hide();
	$('#btnAdd').hide();
	$('#btnEdit').show();
	$('#modalEjerc').modal('show');
	$.ajax({
        url:'/api/ejercicios/'+clave,
        type: 'GET',
        success:function(ejercicio){
        	console.log(ejercicio)
        	idEjercicio=ejercicio.ejercicio._id;
            $('input[name=titulo]').val(ejercicio.ejercicio.titulo),
	        $('#descrip').val(ejercicio.ejercicio.descripcion),
	        $('input[name=datoEntrada]').val(ejercicio.ejercicio.datosEntrada),
	        $('input[name=datoSalida]').val(ejercicio.ejercicio.datosSalida),
	        $('input[name=etiq]').val(ejercicio.ejercicio.etiquetas),
	        $('#nivel').val(ejercicio.ejercicio.nivel)
        }
    })
}

$(document).ready(function() {
    LoadData();
    $('#btnEdit').hide(); 
    $('#btnnew').click(function(){
    	$("#errorMsj").hide();
		$('#btnAdd').show();
		$('#btnEdit').hide();
		borrarCampos();    	
    })
});

$(function() {
	$('#btnEdit').on('click', function() {

		if ( $("input[name=titulo]").val() === "" || $("#descrip").val() === "" || $("input[name=datoEntrada]").val() === "" || $("input[name=datoSalida]").val() === "" || $("input[name=etiq]").val() === "" || $("#nivel").val() === "" ) {
			console.log("campos vacios");
			$("#errorMsj").show();
			$("#errorMsj").attr("class","alert alert-danger").text("Se deben completar todos los campos!!");
			return;		
		}

		console.log(idEjercicio);
		var idUsuario = "sss";
	    var formData = {
	    	idUsuario    : idUsuario,
	        titulo       : $('input[name=titulo]').val(),
	        descripcion  : $('#descrip').val(),
	        datosEntrada : $('input[name=datoEntrada]').val(),
	        datosSalida	 : $('input[name=datoSalida]').val(),
	        etiquetas	 : $('input[name=etiq]').val(),
	        nivel		 : $('#nivel').val()
	    };
	    $.ajax({
	        url 			: '/api/ejercicios/'+idEjercicio,	// the url where we want to POST
	        type 			: 'PUT', 			// define the type of HTTP verb we want to use (POST for our form)
		    data 			: formData,			// our data object
		       contentType 	: 'application/x-www-form-urlencoded; charset=UTF-8',	// When sending data to the server
	        success 		: function(response) {
	            console.log(response);
	            borrarCampos();
	            LoadData();
	            $('#modalEjerc').modal('hide');	            
	        }
		});
	})
});

$(function() {

	$('#btnAdd').on('click', function() {

		var idUsuario = "sss"

		if ( $("input[name=titulo]").val() === "" || $("#descrip").val() === "" || $("input[name=datoEntrada]").val() === "" || $("input[name=datoSalida]").val() === "" || $("input[name=etiq]").val() === "" || $("#nivel").val() === "" ) {
			console.log("campos vacios");
			$("#errorMsj").show();
			$("#errorMsj").attr("class","alert alert-danger").text("Se deben completar todos los campos!!");
			return;		
		}
		
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
	            LoadData();
	            $('#modalEjerc').modal('hide');	            
	        }
		});

	});

});

function borrarCampos(){
	$('input[name=titulo]').val('');
	$('#descrip').val('');
	$('#nivel').val('Facil');
	$('input[name=datoEntrada]').val('');
	$('input[name=datoSalida]').val('');
	$('input[name=etiq]').val('');
}