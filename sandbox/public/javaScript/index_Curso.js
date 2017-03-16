
/*****************************************************/
/* Funciones para cargar tablas utilizadas en cursos */
/*****************************************************/

function cargaCursos() {

    var myTable = $("#cursosTabla")
    	.html(
    			"<table><thead><tr>"+
    			"<th>Paralelo</th><th>Profesor</th><th>No. Estudiantes</th><th>Accion</th>"+
    			"</tr></thead></table>"
    		);

    var myCollection = { "data": [] };
    var tbls;

    // consulto todos los cursos
    $.ajax({
        url 			: '/api/cursos/',	// the url where we want to POST
        type 			: 'GET', 			// define the type of HTTP verb we want to use (POST for our form
	    dataType    	: 'json',			// what type of data do we expect back from the server
        success			: function (datos) {

			// consulto todos los profesores de cada curso       	        
		    $.ajax({
		        url 			: '/api/usuario/',	// the url where we want to POST
		        type 			: 'GET', 			// define the type of HTTP verb we want to use (POST for our form)
			    contentType 	: 'application/x-www-form-urlencoded; charset=UTF-8',	// When sending data to the server
		        success 		: function(respt) {

		            // var myCollection = { "data": [] };

		            for (var i = 0; i < datos.cursos.length ; i++) {
						// console.log(datos.cursos[i]);
						for (var j = 0; j < respt.usuarios.length; j++) {
							if ( respt.usuarios[j].rol == "Profesor" ){
								// console.log(respt.usuarios[j]);
								if ( datos.cursos[i].profesor == respt.usuarios[j]._id ) {
									myCollection.data.push( {
										"id" : datos.cursos[i]._id,
										"paralelo" : datos.cursos[i].paralelo, 
										"profesor" : respt.usuarios[j].nombre+" "+respt.usuarios[j].apellido,
										"estudiantes" : "0"
									} );
								}
							}

						}
		            }

		            // console.log(myCollection.data);
		            
		            tbls = $("table",myTable).DataTable({
					    data: myCollection.data,
					    columns: [
					        { "data": "paralelo" },
					        { "data": "profesor" },
					        { "data": "estudiantes" },
					        { "defaultContent": 
					        	"<button type='button' class='addEstCurso btn btn-success' onclick='cargaEstsnParl()' data-toggle='modal' data-target='#cursoEstudMDL' title='Agregar Estud' >"+
					        		"<i class='fa fa-users'></i>"+
					        	"</button>"+
					        	"<button type='button' class='edtEstCurso btn btn-success' data-toggle='modal' data-target='#cursoEdtEstudMDL' title='Ver Estud' >"+
					        		"<i class='fa fa-eye'></i>"+
					        	"</button>"+
					        	"<button type='button' class='edtProfCurso btn btn-primary' onclick='cargaEditProf()' data-toggle='modal' data-target='#cursoProfMDL' title='Editar Prof' >"+
					        		"<i class='fa fa-user'></i>"+
					        	"</button>"+
					        	"<button type='button' class='elimCurso btn btn-danger' data-toggle='modal' data-target='#cursoEliMDL' title='Eliminar Curso' >"+
					        		"<i class='fa fa-trash-o'></i>"+
					        	"</button>"
					        }
					    ],
	    				lengthMenu: [ [5, 10, -1], [5, 10, "All"] ]
					});

					obtener_data("#cursosTabla tbody", tbls);

		        },
		        error			: function (err) {
            		console.log( err.responseJSON.message );            	
            	}
			});			
		},
		error			: function (err) {
        	console.log( err.responseJSON.message );
        }
	});	
}


function cargaProf() {
    var cursoProfTabl = $("#profTabla")  
    	.html(
    			"<table><thead><tr>"+
					"<th width='10%'>Identificacion</th>"+
					"<th>Nombres</th>"+
					"<th>Apellidos</th>"+							
					"<th>Accion</th>"+
				"</tr></thead></table>"
			);

    var tbls1 = $("table",cursoProfTabl).DataTable({
    	ajax: {
	        url: '/api/usuario/prof',
	        type: 'GET',
	        dataSrc: 'usuarios'
	    },
	    columns: [
	        { "data": "ident" },
	        { "data": "nombre" },
	        { "data": "apellido" },
	        { "defaultContent": 
	        	"<button type='button' class='addProf btn btn-primary' data-toggle='tooltip' title='Agregar Prof'>"+
	        		"<i class='fa fa-pencil-square-o'></i>"+
	        	"</button>"
	        }
	    ],
	    lengthMenu: [ 4 ]
    });

    obtener_data("#profTabla tbody", tbls1);
}



function cargaEditProf() {
    var EditProfTabl = $("#profEditTabla")  
    	.html(
    			"<table><thead><tr>"+
					"<th width='10%'>Identificacion</th>"+
					"<th>Nombres</th>"+
					"<th>Apellidos</th>"+							
					"<th>Accion</th>"+
				"</tr></thead></table>"
			);

    var tbls2 = $("table",EditProfTabl).DataTable({
    	ajax: {
	        url: '/api/usuario/prof',
	        type: 'GET',
	        dataSrc: 'usuarios'
	    },
	    columns: [
	        { "data": "ident" },
	        { "data": "nombre" },
	        { "data": "apellido" },
	        { "defaultContent": 
	        	"<button type='button' class='editProfCrs btn btn-primary' data-toggle='tooltip' title='Cambiar Prof' >"+
	        		"<i class='fa fa-pencil-square-o'></i>"+
	        	"</button>"
	        }
	    ],
	    lengthMenu: [ 4 ]
    });

    obtener_data("#profEditTabla tbody", tbls2);
}



function cargaEstsnParl() {
    var cursoEstTabl = $("#EstTabla")
    	.html(
    			"<table><thead><tr>"+
					"<th width='10%'>Identificacion</th>"+
					"<th>Nombres</th>"+
					"<th>Apellidos</th>"+							
					"<th>Accion</th>"+
				"</tr></thead></table>"
			);

    var tbls3 = $("table",cursoEstTabl).DataTable({
    	ajax: {
	        url: '/api/usuario/estudsnparal',
	        type: 'GET',
	        dataSrc: 'usuarios'
	    },
	    columns: [
	        { "data": "ident" },
	        { "data": "nombre" },
	        { "data": "apellido" },
	        { "defaultContent": 
	        	"<button type='button' class='addEst btn btn-success' data-toggle='tooltip' title='Agregar Estud'>"+
	        		"<i class='fa fa-pencil-square-o'></i>"+
	        	"</button>"
	        }
	    ],
	    lengthMenu: [ 4 ]
    });

    obtener_data("#EstTabla tbody", tbls3);
}



function cargaEstParl(paralelo) {
    var estParTabl = $("#EstxParalTbl")
    	.html(
    			"<table><thead><tr>"+
					"<th width='10%'>Identificacion</th>"+
					"<th>Nombres</th>"+
					"<th>Apellidos</th>"+							
					"<th>Accion</th>"+
				"</tr></thead></table>"
			);

    var tbls4 = $("table",estParTabl).DataTable({
    	ajax: {
	        url: '/api/usuario/estudparal/'+paralelo,
	        type: 'GET',
	        dataSrc: 'usuarios'
	    },
	    columns: [
	        { "data": "ident" },	        
	        { "data": "nombre" },
	        { "data": "apellido" },
	        { "defaultContent": 
	        	"<button type='button' class='delEst btn btn-danger' data-toggle='tooltip' title='Quitar Estud'>"+
	        		"<i class='fa fa-trash-o'></i>"+
	        	"</button>"
	        }
	    ],
	    lengthMenu: [ 4 ]
	    // lengthMenu: [[10, 25, 50, -1], [10, 25, 50, "All"]]
    });

    obtener_data("#EstxParalTbl tbody", tbls4);
}



/**************************************/
/* Funciones eventos click de botones */
/**************************************/

$(function() {

	/*********************/
	/* Graba curso nuevo */
	/*********************/
	$('#cursoMDL #btnAdd').on('click', function() {		

	    var formData = {
	        paralelo    : $('#paraleloCurso').val(),
	        profesor    : $('#profCurso_id').val()
	    };
	    // console.log(formData);
	          
	    $.ajax({
	        url 			: '/api/cursos/',	// the url where we want to POST
	        type 			: 'POST', 			// define the type of HTTP verb we want to use (POST for our form)
		    data 			: formData,			// our data object
		    // dataType    	: 'json' 			// what type of data do we expect back from the server
		    contentType 	: 'application/x-www-form-urlencoded; charset=UTF-8',	// When sending data to the server
	        success 		: function(response) {	            
	            cargaCursos();
	            $('#cursoMDL').modal('hide');
	            msjExito( "Se creo registro con exito" );	            
	        },
	        error			: function (err) {
        		msjError( err.responseJSON.message, "#cursoMDL .modal-body #errMsj" );            	
        	}
		});
		
	});


	/*****************/
	/* Elimina curso */
	/*****************/
	$('#cursoEliMDL #btnElim').on('click', function() {		

	    var cursoId = $('#eliCrs_id').val();
	    // console.log(cursoId);
	    
	    $.ajax({
	        url 			: '/api/cursos/'+cursoId,	// the url where we want to POST
	        type 			: 'DELETE', 		// define the type of HTTP verb we want to use (POST for our form)
		    // data 			: formData,			// our data object
		    // dataType    	: 'json' 			// what type of data do we expect back from the server
		    contentType 	: 'application/x-www-form-urlencoded; charset=UTF-8',	// When sending data to the server
	        success 		: function(response) {	            
	            cargaCursos();
	            $('#cursoEliMDL').modal('hide');
	            msjExito( "Se elimino registro con exito" );	            
	        },
	        error			: function (err) {
        		msjError( err.responseJSON.message, "#cursoEliMDL .modal-body #errMsj" );            	
        	}
		});
		
	});


	/********************************/
	/* Actualiza profesor del curso */
	/********************************/
	$('#cursoProfMDL #btnAct').on('click', function() {	

		var formData = {
			cursoId		: $('#paralEditCrs_id').val(),
	        profesor    : $('#profEditCrs_id').val()
	    };
	    // console.log(formData);
     	        
	    $.ajax({
	        url 			: '/api/cursos/'+formData.cursoId,	// the url where we want to POST
	        type 			: 'PUT', 			// define the type of HTTP verb we want to use (POST for our form)
		    data 			: formData,			// our data object
		    // dataType    	: 'json' 			// what type of data do we expect back from the server
		    contentType 	: 'application/x-www-form-urlencoded; charset=UTF-8',	// When sending data to the server
	        success 		: function(response) {
	            // console.log(response);
	            cargaCursos();
	            $('#cursoProfMDL').modal('hide');	
	            msjExito( "Se actualizo registro con exito" );            
	        },
	        error			: function (err) {
        		msjError( err.responseJSON.message, "#cursoProfMDL .modal-body #errMsj" );            	
        	}
		});

	});


});

	/***********************************/
	/* Actualiza estudiantes del curso */
	/***********************************/
	function grabaEstCrs() {
	    
		var formData = {
			usuarioId	: $('#estudSN_id').val(),
	        paralelo    : $('#estudCursoid').val()
	    };
	    // console.log(formData);
	 	       
	    $.ajax({
	        url 			: '/api/usuario/'+formData.usuarioId,	// the url where we want to POST
	        type 			: 'PUT', 			// define the type of HTTP verb we want to use (POST for our form)
		    data 			: formData,			// our data object
		    // dataType    	: 'json' 			// what type of data do we expect back from the server
		    contentType 	: 'application/x-www-form-urlencoded; charset=UTF-8',	// When sending data to the server
	        success 		: function(response) {
	            // console.log(response);
	            cargaEstsnParl();
	            // $('#cursoEstudMDL').modal('hide');
	            msjExitoMDL( "Se agrego registro con exito","#cursoEstudMDL .modal-body #errMsj" );
	        },
	        error			: function (err) {
        		msjError( err.responseJSON.message, "#cursoEstudMDL .modal-body #errMsj" );            	
        	}
		});
			
	}


	/***********************************/
	/* Elimina estudiantes del curso */
	/***********************************/
	function elimEstCrs( est_id, paralelo ) {
	    
		var formData = {
			usuarioId	: est_id,
	        paralelo    : "00"
	    };
	    // console.log(formData);
	 	       
	    $.ajax({
	        url 			: '/api/usuario/'+formData.usuarioId,	// the url where we want to POST
	        type 			: 'PUT', 			// define the type of HTTP verb we want to use (POST for our form)
		    data 			: formData,			// our data object
		    // dataType    	: 'json' 			// what type of data do we expect back from the server
		    contentType 	: 'application/x-www-form-urlencoded; charset=UTF-8',	// When sending data to the server
	        success 		: function(response) {
	            // console.log(response);
	            cargaEstParl( paralelo )
	            msjExitoMDL( "Se quito registro con exito","#cursoEdtEstudMDL .modal-body #errMsj" );
	        },
	        error			: function (err) {
        		msjError( err.responseJSON.message, "#cursoEdtEstudMDL .modal-body #errMsj" );            	
        	}
		});
			
	}



/********************************************/
/* Funcion para obtener datos de las tablas */
/********************************************/

var obtener_data = function(tbody, table){

	/* Carga datos del prof para crear el nuevo curso */
	$(tbody).on("click", "button.addProf", function(){
		var data = table.row( $(this).parents("tr") ).data();
		// console.log(data);

		$('#profCurso').val(data.nombre + " " + data.apellido)
	    $('#profCurso_id').val(data._id)
	});

	
	/* Pasa datos a modal que presenta estudiantes sin curso */
	$(tbody).on("click", "button.addEstCurso", function(){
		var data = table.row( $(this).parents("tr") ).data();
		// console.log(data);

		$('#estudCursoid').text("Paralelo: "+data.paralelo)
	    $('#estudCursoid').val(data.paralelo)
	});


	/* Actualiza el paralelo del estudiante sin curso */
	$(tbody).on("click", "button.addEst", function(){
		var data = table.row( $(this).parents("tr") ).data();
		// console.log(data);

		$('#estudSN_id').val(data._id)
		
		grabaEstCrs()
	});


	/* Pasa datos a modal de editar estudiantes por curso */
	$(tbody).on("click", "button.edtEstCurso", function(){
		var data = table.row( $(this).parents("tr") ).data();
		// console.log(data);

		cargaEstParl(data.paralelo)

	});


	/* Pasa datos de la tabla de editar estudiantes por curso para quitarlos */
	$(tbody).on("click", "button.delEst", function(){
		var data = table.row( $(this).parents("tr") ).data();
		// console.log(data);

		elimEstCrs( data._id, data.paralelo )

	});


	/* Pasa datos a modal de editar profesor del curso */
	$(tbody).on("click", "button.edtProfCurso", function(){
		var data = table.row( $(this).parents("tr") ).data();
		// console.log(data);

		$('#paralEditCrs_id').val(data.id)
		$('#paralEditCrs').val(data.paralelo)
		$('#profEditCrs').val(data.profesor)
	});


	/* Carga id del nuevo profesor del curso actualizar en el modal de editar profesor del curso */
	$(tbody).on("click", "button.editProfCrs", function(){
		var data = table.row( $(this).parents("tr") ).data();
		// console.log(data);

		$('#profEditCrs_id').val(data._id)
		$('#profEditCrs').val(data.nombre+" "+data.apellido)
	});	


	/* Pasa datos a modal de eliminar curso */
	$(tbody).on("click", "button.elimCurso", function(){
		var data = table.row( $(this).parents("tr") ).data();
		// console.log(data);

		$('#eli_paral').text(data.paralelo)
		$('#eli_prof').text(data.profesor)
	    $('#eliCrs_id').val(data.id)
	});

}



/*********/
/* READY */
/*********/

$(document).ready(function() {
    
    cargaCursos();
     
});


function msjExito( msj ){
	$("section .tab-pane #msjSec2").text( msj ).css( "background-color", "rgb(159, 255, 128)" );
	$("section .tab-pane #msjSec2").fadeIn();
	$("section .tab-pane #msjSec2").fadeOut(4000);
}

function msjExitoMDL( msj, etiqMsj ){
	$(etiqMsj).text( msj ).css( "background-color", "rgb(159, 255, 128)" );
	$(etiqMsj).fadeIn();
	$(etiqMsj).fadeOut(4000);
}

function msjError( msj, etiqMsj ){
	$(etiqMsj).text( msj ).css( "background-color", "rgb(255, 26, 26)" );
	$(etiqMsj).fadeIn();
	$(etiqMsj).fadeOut(5000);
}

