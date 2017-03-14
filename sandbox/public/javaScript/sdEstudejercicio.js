
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
	$("#cuer").append($("<form>",{"class":"form-group	"})
		.append($("<input>",{"id":"arhivo","type":"file"}).text("Arhivo")));
	$("#cuer").append("<br>");	
	$("#cuer").append($("<button>",{"type":"button","class":"btn btn-info","data-toggle":"modal","data-target":"#myModal","style":"margin-right: 2%;"}).text("Enviar"));
	$("#cuer").append($("<a>",{"href":"/sandbox_est/"}).append($("<button>",{"class":"btn btn-danger"}).text("Cerrar")));
}

$(document).ready(function(){
	var a = window.location.href.split("=");
	mostrarData(a[1]);
})

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

