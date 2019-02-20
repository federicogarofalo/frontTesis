import {Component, OnInit} from '@angular/core';
import {FrameService} from '../../../services/frame.service';
import * as _ from 'lodash';
import {interval} from 'rxjs';
import {startWith, switchMap} from 'rxjs/operators';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  // Power Bars Chart
  nodesPower = {
    continuousPower: 0,
    // internalPower: 0,
    networkPower: 0
  };

  chartOptions: any = {
    scaleShowVerticalLines: false,
    responsive: true,
    scales: {
      yAxes: [{
        ticks: {
          beginAtZero: true,
          callback: function (value) {
            return value + ' Vol';
          }
        }
      }]
    }
  };

  barChartOptions = this.chartOptions;
  barChartLabels: string[] = ['Ultima Medición'];
  barChartType = 'bar';
  barChartLegend = true;
  barChartData: any[];

  // Last 10 Power Measures line Chart
  continuousPower;
  internalPower;
  networkPower;

  lineChartOptions = this.chartOptions;
  lineChartLabels: string[] = ['10', '9', '8', '7', '6', '5', '4', '3', '2', '1'];
  lineChartType = 'line';
  lineChartLegend = true;
  lineChartData: any[];

  constructor(private frameService: FrameService) { }

  ngOnInit() {
    this.getNodesPower();
    this.getLastNodesPower();
  }

  getNodesPower() {
    interval(30000).pipe(startWith(0), switchMap(() => this.frameService.getNodesPower()))
      .subscribe(resp => {
      const self = this;
      this.nodesPower = {continuousPower: 0, networkPower: 0};
      _.forEach(resp, function(frame) {
        self.nodesPower.continuousPower += frame.continuousPower;
        // self.nodesPower.internalPower += frame.internalPower;
        self.nodesPower.networkPower += frame.networkPower;
      });
      this.barChartData = [
        {data: [this.nodesPower.continuousPower], label: 'Potencia Continua'},
        // {data: [this.nodesPower.internalPower], label: 'Potencia Interna'},
        {data: [this.nodesPower.networkPower], label: 'Potencia Red'}
      ];
      console.log('Request worked');
    }, err => {
      console.log('Request did not work');
    });
  }

  getLastNodesPower() {
    interval(30000).pipe(startWith(0), switchMap(() => this.frameService.getLastPowerMeasurementByNode()))
      .subscribe(resp => {
        const sumC = [];
        // const sumI = [];
        const sumN = [];
        _.forEach(resp, function (node) {
          node.continuousPower = node.continuousPower.split(',').map(Number);
          sumC.push(node.continuousPower);
          // node.internalPower = node.internalPower.split(',').map(Number);
          // sumI.push(node.internalPower);
          node.networkPower = node.networkPower.split(',').map(Number);
          sumN.push(node.networkPower);
        });
        function sum_columns(data) {
          return _.map(_.unzip(data), _.sum);
        }

        this.continuousPower = sum_columns(sumC).reverse();
        // this.internalPower = sum_columns(sumI).reverse();
        this.networkPower = sum_columns(sumN).reverse();
        this.lineChartData = [
          {data: this.continuousPower, label: 'Potencia Continua', fill: false},
          // {data: this.internalPower, label: 'Potencia Interna', fill: false},
          {data: this.networkPower, label: 'Potencia Red', fill: false}
        ];
      }, err => {
        console.log('Request did not work');
      });
  }
}
