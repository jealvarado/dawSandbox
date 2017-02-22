$(document).ready(function () {

    // Build the chart
    Highcharts.chart('container', {
        chart: {
            plotBackgroundColor: null,
            plotBorderWidth: null,
            plotShadow: false,
            type: 'pie'
        },
        title: {
            text: 'Módulo de Reporte '
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
            name: 'Raquel',
            colorByPoint: true,
            data: [{
                name: 'Ejercicios Resueltos',
                y: 56.33
            }, {
                name: 'Ejercicios No Resueltos',
                y: 43.67,
                sliced: true,
                selected: true
            }]
        }]
    });
});