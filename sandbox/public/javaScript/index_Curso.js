

function cargaCursos() {

    var myTable = $("#cursosTabla")
    	.html("<table><thead><tr>"+
    			"<th>Paralelo</th>"+"<th>Profesor</th>"+"<th>No. Estudiantes</th>"+"<th>Accion</th>"+
    			"</tr></thead></table>");

    $.ajax({
        url 			: '/api/cursos/',	// the url where we want to POST
        type 			: 'GET', 			// define the type of HTTP verb we want to use (POST for our form
	    dataType    	: 'json',			// what type of data do we expect back from the server
        success: function (datos) {
	    	//Do stuff with the JSON data
	    	// console.log(datos.cursos);
//	  	}
//	});	
			var tbls = $("table",myTable).DataTable( {
			    data: datos.cursos,
			    columns: [
			        { "data": "paralelo" },
			        { "data": "profesor" },
			        { "defaultContent": 
			        	"<button type='button' class='editar btn btn-primary' data-toggle='modal' data-target='#usrEditMDL' >"+
			        		"<i class='fa fa-pencil-square-o'></i>"+
			        	"</button>"+
			        	"<button type='button' class='eliminar btn btn-danger' data-toggle='modal' data-target='#modalEliminar' >"+
			        		"<i class='fa fa-trash-o'></i>"+
			        	"</button>"
			        }
			    ]
			});
		}
	});

/*
    var tbls = $("table",myTable).DataTable({
    	ajax: {
	        url: '/api/cursos/',
	        type: 'GET',
	        dataSrc: 'cursos'
	    },
	    columns: [
	        { "data": "paralelo" },
	        { "data": "profesor" },
	        { "data": "estudiantes" },
	        { "defaultContent": 
	        	"<button type='button' class='editar btn btn-primary' data-toggle='modal' data-target='#usrEditMDL' >"+
	        		"<i class='fa fa-pencil-square-o'></i>"+
	        	"</button>"+
	        	"<button type='button' class='eliminar btn btn-danger' data-toggle='modal' data-target='#modalEliminar' >"+
	        		"<i class='fa fa-trash-o'></i>"+
	        	"</button>"
	        }
	    ]
    });
*/
    // obtener_data_editar("#cursosTabla tbody", tbls);
}

/*
var obtener_data_editar = function(tbody, table){
	$(tbody).on("click", "button.editar", function(){
		var data = table.row( $(this).parents("tr") ).data();
		// console.log(data);

		$('#edit_nomb').val(data.nombre),
	    $('#edit_apel').val(data.apellido),
	    $('#edit_ident').val(data.ident),
	    $('#edit_carr').val(data.carrera),
	    $('#edit_correo').val(data.correo),
	    $('#edit_rol').val(data.rol),
	    $('#edit_id').val(data._id)
	});
}
*/

$(document).ready(function() {
    // $("#my-button").click(LoadData);
    cargaCursos();
});