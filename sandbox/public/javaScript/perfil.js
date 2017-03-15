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
                    //console.log(user);
                    $("#nickUser").append($("<strong>").text(user.usuario.nombre + ' ' + user.usuario.apellido));
                    $("#dataUser").append($("<p>").text("Paralelo: " + user.usuario.paralelo));
                    $("#dataUser").append($("<p>").text("Carrera: " + user.usuario.carrera));
                    $("#dataUser").append($("<p>").text("Puntaje Ej. Facil: " + perfil.perfil[0].ejFacil*5));
                    $("#dataUser").append($("<p>").text("Puntaje Ej. Intermedio: " + perfil.perfil[0].ejIntermedio*10));
                    $("#dataUser").append($("<p>").text("Puntaje Ej. Dificil: " + perfil.perfil[0].ejDificil*15));
                    var sum = perfil.perfil[0].ejFacil*5 + perfil.perfil[0].ejIntermedio*10 + perfil.perfil[0].ejDificil*15;
                    $("#datatotal").append($("<strong>").text("Total: " + sum));
                    insigniaSemana("58b7458b56da5a0f90bb6067");
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
            var cont = 0;
            var f = new Date()
            var act = saberSemana(f.getDate(),f.getMonth(),f.getFullYear())
            resuelto.resuelto.forEach(function(i){
                var fecha = i.fecha.split("T")
                var fe = fecha[0].split("-")
                var mes = fe[1]-1;
                var ano = fe[0];
                var dia = fe[2];
                var pas = new Date(ano,mes,dia)
                var con = saberSemana(pas.getDate(),pas.getMonth(),pas.getFullYear());
                if(act==cont){
                    cont++;
                }
                console.log(cont)
            })
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




