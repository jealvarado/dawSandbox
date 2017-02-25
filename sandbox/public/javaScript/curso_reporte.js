$(document).ready(function(){
    var url = "json/curso.json" // esta url debe ser generada con la fecha 
        $.getJSON(url, function(resp){
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
                    type: 'pie'
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
                    name: 'Brands',
                    colorByPoint: true,
                    data:datos
                    }]
                });
            });
});        
        