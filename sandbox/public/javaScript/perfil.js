$document.ready(function({
    $("#enviar").click(function(){
        
       url ="json/perfil.json"; // esta url debe ser generada con el nombre del usuario

        $.getJSON(url, function(resp){
        	$("#name").html(resp.nombre);
        	$("#puntaje").html(resp.puntaje_obtenido);
        	$("#ejercicios").html(resp.ejercicioscompletados);

        	var insig = $("#insignias");
        	resp.insignias.forEach(function(i){
        		insig.add($("<li>",{"class":i.nombre}).html(i.nombre));
        	});
        });

    })

}));