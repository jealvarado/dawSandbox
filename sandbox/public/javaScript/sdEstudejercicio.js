//var PythonShell = require('python-shell');

var f;

function colocar(ar){
	$("#cuer").empty();
	$("#cuer").append($("<h1>").text(ar.titulo));
	$("#cuer").append("<hr id=\"linea\"></hr>");
	$("#cuer").append($("<h4>").text("Descripción:"));
	$("#cuer").append($("<p>").text(ar.descripcion));
	$("#cuer").append("<br>");
	$("#cuer").append($("<h4>").text("Entradas:"));
	$("#cuer").append($("<p>").text(ar.datosEntrada));
	$("#cuer").append("<br>");
	$("#cuer").append($("<h4>").text("Salidas:"));
	$("#cuer").append($("<p>").text(ar.datosSalida));
	$("#cuer").append("<br>");
	$("#cuer").append($("<h4>").text("Solución:"));
	$("#cuer").append($("<form>",{"class":"form-group", "id":"formUpload", "encType":"multipart/form-data"})
		.append($("<input>",{"id":"pyFile","type":"file", "name":"pyFile", "required":"true"}).text("Arhivo"))
		.append($("<input>",{"id":"arhivo","type":"hidden", "name":"idEjercicio", "required":"true"}).val(ar._id)));
	$("#cuer").append("<br>");	
	$("#cuer").append($("<button>",{"type":"button","class":"btn btn-info","data-toggle":"modal","data-target":"#myModal","style":"margin-right: 2%;"})
		.text("Enviar").click(enviar));
	$("#cuer").append($("<a>",{"href":"/sandbox_est/"}).append($("<button>",{"class":"btn btn-danger"}).text("Cerrar")));
}

$(document).ready(function(){
	var a = window.location.href.split("=");
	mostrarData(a[1]);
})

function enviar(){
	formData = new FormData($("#formUpload")[0]);
	f=formData;
	files=$('#pyFile')[0].files
	if (files.length) {
		console.log(files);
		//formData.append('pyFile', files[0])
		f=formData;		
		$("#btnOK").prop( "disabled", true );
		$("#pMensaje").text("Procesando arhivo en el servidor. Espere un momento")
		$.ajax({
			url: '/sandbox_est/ejercicio',
			type: 'POST',
			data: formData,
			processData: false,
			contentType: false,
			success: function(data, status, request){
				fup=data;
				console.log(data);
				console.log(status);
				console.log(request);
				$("#pMensaje").text(data.mensaje);
				$("#btnOK").prop( "disabled", false );
				if (data.estado) {
					$("#myModal").on("hide.bs.modal", function(){
						window.location = "/sandbox_est";
					});
				}
				else{
					if(data.redirectLogin){
						$("#myModal").on("hide.bs.modal", function(){
							window.location = "/index";
						});
					}
				}			
				//$("#pMensaje").text("Subiendo arhivo al servidor. Espere un momento")
			},
			error: function (res, status, error) {
				console.log(res.responseText);
				console.log(status);
				console.log(error);
				$("#pMensaje").text(data.mensaje);
				$("#btnOK").prop( "disabled", false );
			}
		});
	}
	else{
		$("#pMensaje").text("Seleccione arhivo para enviar.")
	}
}

function mostrarData(clave){
	$.ajax({
        url:'/api/ejercicios/'+clave,
        type: 'GET',
        success:function(ejercicio){
            console.log(ejercicio);
            colocar(ejercicio.ejercicio);
            if(ejercicio.ejercicio.nivel=="Facil"){
				$("#lis").empty();
				$("#lis").append($("<li>",{"class":"active","id":"prin"}).append($("<a>",{"href":"#"}).text("Principiante")));
				$("#lis").append($("<li>",{"id":"med"}).append($("<a>",{"href":"#"}).text("Intermedio")));
				$("#lis").append($("<li>",{"id":"avaz"}).append($("<a>",{"href":"#"}).text("Avanzado")));
			}else if(ejercicio.ejercicio.nivel=="Intermedio"){
				$("#lis").empty();
				$("#lis").append($("<li>",{"id":"prin"}).append($("<a>",{"href":"#"}).text("Principiante")));
				$("#lis").append($("<li>",{"class":"active","id":"med"}).append($("<a>",{"href":"#"}).text("Intermedio")));
				$("#lis").append($("<li>",{"id":"avaz"}).append($("<a>",{"href":"#"}).text("Avanzado")));
			}else{
				$("#lis").empty();
				$("#lis").append($("<li>",{"id":"prin"}).append($("<a>",{"href":"#"}).text("Principiante")));
				$("#lis").append($("<li>",{"id":"med"}).append($("<a>",{"href":"#"}).text("Intermedio")));
				$("#lis").append($("<li>",{"class":"active","id":"avaz"}).append($("<a>",{"href":"#"}).text("Avanzado")));
			}
        }
    })
}

