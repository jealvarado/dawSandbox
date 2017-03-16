$(document).ready(function() {
    LoadData();    
});

function LoadData() {
    $.ajax({
        url:'/api/perfil/usuario',
        type: 'GET',
        success:function(perfil){
            //console.log(perfil);
            $.ajax({
                url:'/api/usuario/'+perfil.perfil[0].idestudiante,
                type: 'GET',
                success:function(user){
                    console.log(user);
                    $("#nickUser").append($("<strong>").text(user.usuario.nombre + ' ' + user.usuario.apellido));
                    $("#dataUser").append($("<p>").text("Paralelo: " + user.usuario.paralelo));
                    $("#dataUser").append($("<p>").text("Carrera: " + user.usuario.carrera));
                    $("#dataUser").append($("<p>").text("Puntaje Ej. Facil: " + perfil.perfil[0].ejFacil*5));
                    $("#dataUser").append($("<p>").text("Puntaje Ej. Intermedio: " + perfil.perfil[0].ejIntermedio*10));
                    $("#dataUser").append($("<p>").text("Puntaje Ej. Dificil: " + perfil.perfil[0].ejDificil*15));
                    var sum = perfil.perfil[0].ejFacil*5 + perfil.perfil[0].ejIntermedio*10 + perfil.perfil[0].ejDificil*15;
                    $("#datatotal").append($("<strong>").text("Total: " + sum));
                    insigniaSemana(user.usuario._id);
                }
            })
        }
    })
}

function insigniaSemana(clave){
    $.ajax({
        url:'/api/resuelto/usuario/'+ clave,
        type: 'GET',
        success:function(resuelto){
            console.log(resuelto);
            var contS = 0;
            var f = new Date()
            var act = saberSemana(f.getDate(),f.getMonth(),f.getFullYear())
            var contE = resuelto.resuelto.length; 
            resuelto.resuelto.forEach(function(i){
                var fecha = i.fecha.split("T")
                var fe = fecha[0].split("-")
                var mes = fe[1]-1;
                var ano = fe[0];
                var dia = fe[2];
                var pas = new Date(ano,mes,dia)
                var con = saberSemana(pas.getDate(),pas.getMonth(),pas.getFullYear());
                if(act==con){
                    contS++;
                }
            })
            console.log(contE)
            if(contE>=10&&contE<20){
                $("#dataUser").append($("<strong>").text("Nivel: Novato "));
            }else if (contE>=20&&contE<30){
                $("#dataUser").append($("<strong>").text("Nivel: Pro "));
            }else if(contE>=30){
                $("#dataUser").append($("<strong>").text("Nivel: Experto"));
            }
            $("#dataUser").append("<br>");
            console.log(contS)
            if(contS>=5&&contS<10){
                $("#dataUser").append($("<strong>").text("Insignia de la Semana: Indestructible "));
            }else if (contS>=10&&contS<15){
                $("#dataUser").append($("<strong>").text("Insignia de la Semana: Duro de Matar "));
            }else if(contS>=15){
                $("#dataUser").append($("<strong>").text("Insignia de la Semana: Rapido y Furioso"));
            }
        }
    })
}

function saberSemana(d,m,a){
    fecha=new Date(a,0,1);
    primerDiaDelAno=fecha.getDay();
    fecha2=new Date(a,m,(d+7-primerDiaDelAno));
    tiempopasado=fecha2-fecha;
    semanas=Math.floor(tiempopasado/1000/60/60/24/7);
    if(semanas==0){semanas=52}
        return semanas;
}