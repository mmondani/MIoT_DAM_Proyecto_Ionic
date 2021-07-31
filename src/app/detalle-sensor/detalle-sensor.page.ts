//correr antes npm install --save highcharts

import { Component, Input, OnInit } from '@angular/core';
import * as Highcharts from 'highcharts';
import { Dispositivo } from '../dispositivo';
import { DispositivoService } from '../services/dispositivo.service';
import { Medicion } from '../services/medicion';
declare var require: any;
require('highcharts/highcharts-more')(Highcharts);
require('highcharts/modules/solid-gauge')(Highcharts);

@Component({
  selector: 'detalle-sensor',
  templateUrl: './detalle-sensor.page.html',
  styleUrls: ['./detalle-sensor.page.scss'],
})
export class DetalleSensorPage implements OnInit {

  private ultimaMedicion: Medicion;
  public myChart;
  private chartOptions;

  @Input() dispositivo:Dispositivo;
  constructor(private dispositivoService: DispositivoService) { 
  }

  ngOnInit() {
    this.dispositivoService.getUltimaMedicion(this.dispositivo.dispositivoId)
      .subscribe(resp => {
          if (resp.status == 200) {
            this.ultimaMedicion = resp.body;

            this.generarChart();

            //llamo al update del chart para refrescar y mostrar el nuevo valor
            this.myChart.update({series: [{
                name: 'kPA',
                data: [parseInt(this.ultimaMedicion.valor)],
                tooltip: {
                    valueSuffix: ' kPA'
                }
            }]});
          }
      });
  }

  ionViewWillEnter() {

  }

  ionViewDidEnter() {
    
  }

  generarChart() {
    this.chartOptions={
      chart: {
          type: 'gauge',
          plotBackgroundColor: null,
          plotBackgroundImage: null,
          plotBorderWidth: 0,
          plotShadow: false
        }
        ,title: {
          text: this.dispositivo.nombre
        }

        ,credits:{enabled:false}
        

        ,pane: {
            startAngle: -150,
            endAngle: 150
        } 
        // the value axis
      ,yAxis: {
        min: 0,
        max: 100,
  
        minorTickInterval: 'auto',
        minorTickWidth: 1,
        minorTickLength: 10,
        minorTickPosition: 'inside',
        minorTickColor: '#666',
  
        tickPixelInterval: 30,
        tickWidth: 2,
        tickPosition: 'inside',
        tickLength: 10,
        tickColor: '#666',
        labels: {
            step: 2,
            rotation: 'auto'
        },
        title: {
            text: 'kPA'
        },
        plotBands: [{
            from: 0,
            to: 10,
            color: '#55BF3B' // green
        }, {
            from: 10,
            to: 30,
            color: '#DDDF0D' // yellow
        }, {
            from: 30,
            to: 100,
            color: '#DF5353' // red
        }]
    }
    ,
  
    series: [{
        name: 'kPA',
        data: [0],
        tooltip: {
            valueSuffix: ' kPA'
        }
    }]

    };
    this.myChart = Highcharts.chart('highcharts', this.chartOptions );
  }

}