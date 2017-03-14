var id = localStorage.getItem("id");

function colocar(ar){
	$("#cuer").empty();
	$("#cuer").append($("<h1>").text(ar.titulo));
	$("#cuer").append("<hr id=\"linea\"></hr>");
	$("#cuer").append($("<h4>").text("Descripción:"));
	$("#cuer").append($("<p>").text(ar.ejerc));
	$("#cuer").append("<br>");
	$("#cuer").append($("<h4>").text("Entradas:"));
	$("#cuer").append($("<p>").text(ar.entrada));
	$("#cuer").append("<br>");
	$("#cuer").append($("<h4>").text("Salidas:"));
	$("#cuer").append($("<p>").text(ar.salida));
	$("#cuer").append("<br>");
	$("#cuer").append($("<h4>").text("Solución:"));
	$("#cuer").append($("<form>",{"class":"form-group	"})
		.append($("<input>",{"id":"arhivo","type":"file"}).text("Arhivo")));
	$("#cuer").append("<br>");	
	$("#cuer").append($("<button>",{"type":"button","class":"btn btn-info","data-toggle":"modal","data-target":"#myModal","style":"margin-right: 2%;"}).text("Enviar"));
	$("#cuer").append($("<a>",{"href":"sb_estd.html"}).append($("<button>",{"class":"btn btn-danger"}).text("Cerrar")));
}

$(document).ready(function(){
	console.log(id);
	url = "json/ejercicios.json";
	$.getJSON(url,function(resp){
		arch = resp[id-1];
		colocar(arch);
		if(arch.difi=="Principiante"){
		$("#lis").empty();
			$("#lis").append($("<li>",{"class":"active","id":"prin"}).append($("<a>",{"href":"#"}).text("Principiante")));
			$("#lis").append($("<li>",{"id":"med"}).append($("<a>",{"href":"#"}).text("Intermedio")));
			$("#lis").append($("<li>",{"id":"avaz"}).append($("<a>",{"href":"#"}).text("Avanzado")));
		}else if(arch.difi=="Intermedio"){
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
	})	
})