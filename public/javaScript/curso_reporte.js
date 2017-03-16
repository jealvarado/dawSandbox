var dictCursos={};
var cursos=[];
var perfil;
var estudiantes;
var estPerfil=[];
var datosCar


function consegirPerfiles(){
    $.ajax({
        url:'/api/perfil/',
        type: 'GET',
        success:function(res){
            perfil = res.perfiles;
            $.ajax({
                url:'/api/usuario/estud',
                type: 'GET',
                success:function(resp) {
                    estudiantes=resp.usuarios;
                    perfil.forEach(function (p) {
                        estudiantes.forEach(function (e) {
                            if (p.idestudiante==e._id) {
                                var total=p.ejDificil+p.ejFacil+p.ejIntermedio
                                var ps={
                                    curso:e.paralelo,
                                    ejercicios:total
                                }
                                estPerfil.push(ps);
                            }
                        })
                    });
                    estPerfil.forEach(function(ep) {
                        if (dictCursos[ep.curso]) {
                            dictCursos[ep.curso]+=ep.ejercicios;
                        }
                        else{
                            dictCursos[ep.curso]=ep.ejercicios;
                            cursos.push(ep.curso)
                        }
                    })
                    var data = [];
                    cursos.forEach(function(c) {
                        var d={
                            "paralelo":c,
                            "ejercicios":dictCursos[c]
                        }
                        data.push(d);
                    });
                    datosCar=data;
                    generarGrafico({data:data});
                }
            })
        }
    })
}


$(document).ready(function(){
    consegirPerfiles();
});        
        

function generarGrafico(resp){
            r=resp;
            //tutorial del grafico 
            var datos = []
            resp.data.forEach(function(i){
                datos.push(
                {
                    name: "paralelo " + i.paralelo ,
                    y:Number(i.ejercicios)
                });
            });
            Highcharts.chart('container', {
                chart: {
                    plotBackgroundColor: null,
                    plotBorderWidth: null,
                    plotShadow: false,
                    type: 'column'
                },
                title: {
                    text: 'Reporte estadisticos cantidad de ejercicios por curso'
                },
                tooltip: {
                    pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
                },
                plotOptions: {
                    pie: {
                        allowPointSelect: true,
                        cursor: 'pointer',
                        dataLabels: {
                            enabled: false
                        },
                        showInLegend: true
                    }
                },
                series: [{
                    name: 'Cursos',
                    colorByPoint: true,
                    data:datos
                    }]
                });
}