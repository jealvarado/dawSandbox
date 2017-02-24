var r
$(document).ready(function(){
    $("#enviar").click(function(){
        console.log("entro")
        var fI=$("#fechaInicio").val();
        var fechaF = $("#fechaFin").val();
        //if((Date.parse(fI)) > (Date.parse(fechaF))){// 
        var url = "json/fecha.json" // esta url debe ser generada con la fecha 
        $.getJSON(url, function(resp){
            r=resp;
            //tutorial del grafico 
            var datos = []
            resp.data.forEach(function(i){
                datos.push(
                {
                    name:i.fecha,
                    y:Number(i.ejercicios)
                });
            });
            Highcharts.chart('container', {
                chart: {
                    plotBackgroundColor: null,
                    plotBorderWidth: null,
                    plotShadow: false,
                    type: 'pie'
                },
                title: {
                    text: 'Browser market shares January, 2015 to May, 2015'
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
                    name: 'Brands',
                    colorByPoint: true,
                    data:datos
                    }]
                });
            });
            //
        });
});

