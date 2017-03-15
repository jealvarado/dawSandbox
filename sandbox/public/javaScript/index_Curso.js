

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
					        	"<button type='button' class='addEstCurso btn btn-success' onclick='cargaEstsnParl()' data-toggle='modal' data-target='#cursoEstudMDL' >"+
					        		"<i class='fa fa-users'></i>"+
					        	"</button>"+
					        	"<button type='button' class='edtEstCurso btn btn-success' data-toggle='modal' data-target='#cursoEdtEstudMDL'>"+
					        		"<i class='fa fa-pencil-square-o'></i>"+
					        	"</button>"+
					        	"<button type='button' class='edtProfCurso btn btn-primary' onclick='cargaEditProf()'data-toggle='modal' data-target='#cursoProfMDL' >"+
					        		"<i class='fa fa-user'></i>"+
					        	"</button>"+
					        	"<button type='button' class='elimCurso btn btn-danger' data-toggle='modal' data-target='#cursoEliMDL' >"+
					        		"<i class='fa fa-trash-o'></i>"+
					        	"</button>"
					        }
					    ]
					});

					obtener_data("#cursosTabla tbody", tbls);

		        }
			});			
		}
	});	
}



$(document).ready(function() {
    // $("#my-button").click(LoadData);
    cargaCursos();
});




$(function() {

	
	$('#cursoMDL #btnAdd').on('click', function() {		

	    // get the form data
	    // there are many ways to get this data using jQuery (you can use the class or id also)
	    var formData = {
	        paralelo    : $('#paraleloCurso').val(),
	        profesor    : $('#profCurso_id').val()
	    };
	    // console.log(formData);
	    
	    // process the form	       	        
	    $.ajax({
	        url 			: '/api/cursos/',	// the url where we want to POST
	        type 			: 'POST', 			// define the type of HTTP verb we want to use (POST for our form)
		    data 			: formData,			// our data object
		    // dataType    	: 'json' 			// what type of data do we expect back from the server
		    contentType 	: 'application/x-www-form-urlencoded; charset=UTF-8',	// When sending data to the server
	        success 		: function(response) {	            
	            cargaCursos();
	            $('#cursoMDL').modal('hide');	            
	        }
		});
		
	});


	$('#cursoEliMDL #btnElim').on('click', function() {		

	    // get the form data
	    // there are many ways to get this data using jQuery (you can use the class or id also)
	    var cursoId = $('#eliCrs_id').val();
	    // console.log(cursoId);
	    
	    // process the form	       	        
	    $.ajax({
	        url 			: '/api/cursos/'+cursoId,	// the url where we want to POST
	        type 			: 'DELETE', 		// define the type of HTTP verb we want to use (POST for our form)
		    // data 			: formData,			// our data object
		    // dataType    	: 'json' 			// what type of data do we expect back from the server
		    contentType 	: 'application/x-www-form-urlencoded; charset=UTF-8',	// When sending data to the server
	        success 		: function(response) {	            
	            cargaCursos();
	            $('#cursoEliMDL').modal('hide');	            
	        }
		});
		
	});


	$('#cursoProfMDL #btnAct').on('click', function() {	

		var formData = {
			cursoId		: $('#paralEditCrs_id').val(),
	        profesor    : $('#profEditCrs_id').val()
	    };
	    console.log(formData);

	    // process the form	       	        
	    $.ajax({
	        url 			: '/api/cursos/'+formData.cursoId,	// the url where we want to POST
	        type 			: 'PUT', 			// define the type of HTTP verb we want to use (POST for our form)
		    data 			: formData,			// our data object
		    // dataType    	: 'json' 			// what type of data do we expect back from the server
		    contentType 	: 'application/x-www-form-urlencoded; charset=UTF-8',	// When sending data to the server
	        success 		: function(response) {
	            // console.log(response);
	            // borrarCampos();
	            cargaCursos();
	            $('#cursoProfMDL').modal('hide');	            
	        }
		});

	});


});



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
	        	"<button type='button' class='addProf btn btn-primary'>"+
	        		"<i class='fa fa-pencil-square-o'></i>"+
	        	"</button>"
	        }
	    ]
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
	        	"<button type='button' class='editProfCrs btn btn-primary'>"+
	        		"<i class='fa fa-pencil-square-o'></i>"+
	        	"</button>"
	        }
	    ]
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
	        	"<button type='button' class='addEst btn btn-success'>"+
	        		"<i class='fa fa-pencil-square-o'></i>"+
	        	"</button>"
	        }
	    ]
    });

    obtener_data("#EstTabla tbody", tbls3);
}



var obtener_data = function(tbody, table){

	$(tbody).on("click", "button.addProf", function(){
		var data = table.row( $(this).parents("tr") ).data();
		// console.log(data);

		$('#profCurso').val(data.nombre + " " + data.apellido)
	    $('#profCurso_id').val(data._id)
	});

	$(tbody).on("click", "button.elimCurso", function(){
		var data = table.row( $(this).parents("tr") ).data();
		// console.log(data);

		$('#eli_paral').text(data.paralelo)
		$('#eli_prof').text(data.profesor)
	    $('#eliCrs_id').val(data.id)
	});

	$(tbody).on("click", "button.addEstCurso", function(){
		var data = table.row( $(this).parents("tr") ).data();
		// console.log(data);

		$('#estudCursoid').text("Paralelo: "+data.paralelo)
	    $('#estudCursoid').val(data.id)
	});

	$(tbody).on("click", "button.edtProfCurso", function(){
		var data = table.row( $(this).parents("tr") ).data();
		// console.log(data);

		$('#paralEditCrs_id').val(data.id)
		$('#paralEditCrs').val(data.paralelo)
		$('#profEditCrs').val(data.profesor)
	});

	$(tbody).on("click", "button.editProfCrs", function(){
		var data = table.row( $(this).parents("tr") ).data();
		// console.log(data);

		$('#profEditCrs_id').val(data._id)
		$('#profEditCrs').val(data.nombre+" "+data.apellido)
	});

}