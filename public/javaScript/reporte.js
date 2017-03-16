var r;
$(document).ready(function(){
    $("#enviar").click(function(){
        //console.log("entro")
        var fI=$("#fechaInicio").val();
        var fechaF = $("#fechaFin").val();
        console.log(fI);
        //if((Date.parse(fI)) > (Date.parse(fechaF))){//
        var url = "/api/resuelto/resueltosPorFecha" // esta url debe ser generada con la fecha
        var info = {
          fechaInicio: fI,
          fechaFin: fechaF
        }
        $.ajax({
          url: url,
          type: 'post',
          data: info,
          success: function(resp){
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
                      text: 'Reporte estadisticos por fecha'
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
                      name: 'Ejercicios',
                      colorByPoint: true,
                      data:datos
                      }]
                  });
              }
        });


        /*$.getJSON(url, function(resp){
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
                    text: 'Reporte estadisticos por fecha'
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
            });*/
            //
        });
});
