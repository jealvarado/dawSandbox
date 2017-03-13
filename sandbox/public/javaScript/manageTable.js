
/*
var usrTabla;

function cargarUsrTbl(){

	usrTabla = $('#usuariosTabla').DataTable( {
		// serverSide: true,
	    ajax: {
	        url: '/api/usuario/',
	        type: 'GET',
	        dataSrc: 'usuarios'
	    },
	    columns: [
	        { data: 'ident' },
	        { data: 'nombre' },
	        { data: 'apellido' },
	        { data: 'carrera' },
	        { data: 'rol' },
	        { data: 'correo' }
	    ]
	} );
	
}

$(document).ready(
	function() {
		cargarUsrTbl();
	}
);
*/

function LoadData() {
    var myDataTable = $("#usuariosTabla")
    	.html("<table>\
    				<thead>\
    					<tr>\
							<th width='10%'>Identificacion</th>\
							<th>Nombres</th>\
							<th>Apellidos</th>\
							<th>Carrera</th>\
							<th>Rol</th>\
							<th>Email</th>\
							<th>Accion</th>\
						</tr>\
					</thead>\
				</table>");

    $("table",myDataTable).dataTable({
    	ajax: {
	        url: '/api/usuario/',
	        type: 'GET',
	        dataSrc: 'usuarios'
	    },
	    columns: [
	        { "data": "ident" },
	        { "data": "nombre" },
	        { "data": "apellido" },
	        { "data": "carrera" },
	        { "data": "rol" },
	        { "data": "correo" },
	        { "defaultContent": 
	        	"<button type='button' class='editar btn btn-primary'><i class='fa fa-pencil-square-o'></i></button>"+
	        	"<button type='button' class='eliminar btn btn-danger' data-toggle='modal' data-target='#modalEliminar' ><i class='fa fa-trash-o'></i></button>"
	        }
	    ]
    });
}

$(document).ready(function() {
    //$("#my-button").click(LoadData);
    LoadData();
});




$(function() {

	$('#btnAdd').on('click', function() {

		var tipoIdent
		if ( $('#rol').val() == "Estudiante" || $('#rol').val() == "Ayudante" )
			tipoIdent = "matricula"
		else
			tipoIdent = "cedula"

		console.log(tipoIdent+' - '+ $('#rol').val());

	    // get the form data
	    // there are many ways to get this data using jQuery (you can use the class or id also)
	    var formData = {
	        nombre      : $('input[name=nombre]').val(),
	        apellido    : $('input[name=apellido]').val(),
	        tipoIdent	: tipoIdent,
	        rol			: $('#rol').val(),
	        ident		: $('input[name=ident]').val(),
	        carrera		: $('input[name=carrera]').val(),
	        correo		: $('input[name=correo]').val(),
	        contrasena	: $('input[name=pass]').val()
	    };

	    // console.log(formData);
	    // console.log(JSON.stringify(formData));

	    // process the form	       	        
	    $.ajax({
	        url 			: '/api/usuario/',	// the url where we want to POST
	        type 			: 'POST', 			// define the type of HTTP verb we want to use (POST for our form)
		    data 			: formData,			// our data object
		    // dataType    	: 'json' 			// what type of data do we expect back from the server
		    contentType 	: 'application/x-www-form-urlencoded; charset=UTF-8',	// When sending data to the server
	        success 		: function(response) {
	            console.log(response);
	            borrarCampos();
	            LoadData();
	            $('#usuarioMDL').modal('hide');	            
	        }
		});

	});

});


function borrarCampos(){
	$('input[name=nombre]').val('');
	$('input[name=apellido]').val('');
	$('#rol').val('Estudiante');
	$('input[name=ident]').val('');
	$('input[name=carrera]').val('');
	$('input[name=correo]').val('');
	$('input[name=pass]').val('');
}


function tipoIdentif(){
	if ( $('#rol').val() == "Estudiante" || $('#rol').val() == "Ayudante" ) {
		$('#ident').attr('placeholder','Ingrese matrícula');
		// $('#carrera').disabled = false;
		document.getElementById("carrera").disabled = false;
	}
	else {
    	$('#ident').attr('placeholder','Ingrese cédula');
    	// $('#carrera').disabled = true;
    	document.getElementById("carrera").disabled = true;
	}
}


/*
var options = {
    type: "POST",
    url: url,
    dataType: "json",
    data: jsonString,
    accept: "application/json"
};

$.ajax(options)


var data = [
    [
        "Tiger Nixon",
        "System Architect",
        "Edinburgh",
        "5421",
        "2011/04/25",
        "$3,120"
    ],
    [
        "Garrett Winters",
        "Director",
        "Edinburgh",
        "8422",
        "2011/07/25",
        "$5,300"
    ]
]


$('#manageMemberTable').DataTable( {
    data: data
} );
*/