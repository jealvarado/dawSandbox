var cont = 4;

function agregarProyecto(){
	
	if ( $("#descrip").val() === "" || $("#titulo").val() === "" || $("#autor").val() === "" || $("#etiq").val() === "" ) {
		console.log("campos vacios");
		$("#errorMsj").attr("class","alert alert-danger").text("Se deben completar todos los campos...!!");
		return;		
	}

	cont++;
	localStorage.setItem("noEjercicios", cont );

	$('#panelColl').append(
	    $('<div>').attr('class','panel panel-info').append(
	        $('<div>').attr('class','panel-heading').append(
	        	$('<h4>').attr('class','panel-title').append(
	        		$('<a>').attr({
	        			'data-toggle':'collapse',
	        			'data-parent':'#panelColl',
	        			'href':'#collapse' + cont
	        		}).text( $("#titulo").val() )
	        	)
	        ),
	        $('<div>').attr({
	        			'class':'panel-collapse collapse',
	        			'id':'collapse' + cont
	        			}).append( 
	        				$('<div>').attr('class','panel-body').append(
	        					"Autor:" + "<br>" +
	        					$("#autor").val() + "<br><br>" +
	        					"Descripcion:" + "<br>" +
	        					$("#descrip").val() + "<br><br>" +
	        					"Etiquetas:" + "<br>" +
	        					"<a href=" + "'https://www.google.com.ec/search?q=google&oq=google&aqs=chrome.."+
	        					"69i57.3261j0j4&sourceid=chrome&ie=UTF-8#q="+ $("#etiq").val() + "%20'>" + $("#etiq").val() + "</a>"
	        				)
	        			)
	    )
	)


	
	$('#lista_Prof ul').append(
	    $('<li>').attr({
	    		'class':'list-group-item list-group-item-info',
	    		'id':'elemt-' + cont
	    	}).append(	        
		        $("<a>").attr('href','#').append(
		        	$('<span>').attr('class', 'label label-warning').append("Edit")
		        ),$("<a>").attr('href','#').append(
		        	$('<span>').attr('class', 'label label-danger').append("Delete")
		        ), $("#titulo").val()
	    )
	)

	$("#descrip").val("");
	$("#titulo").val("");
	$("#autor").val("");
	$("#etiq").val("");

	$("#errorMsj").attr("class","alert alert-success").text("Se ingreso correctamente...!!");

	console.log("Se agrego elemento");

	// $("#modalEjerc").modal('toggle');	
}


$("#modalEjerc button").click(
	function(){
		agregarProyecto();
		// $("input").val("");
	}
);