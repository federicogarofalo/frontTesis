import {Component, OnInit} from '@angular/core';
import {FrameService} from '../../../services/frame.service';
import * as _ from 'lodash';
import {interval} from 'rxjs';
import {startWith, switchMap} from 'rxjs/operators';
import {NodeHistoryService} from '../../../services/node-history.service';
import {NodeHistory} from '../../../models/node-history';
import {NodeService} from '../../../services/node.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  // Power Bars Chart
  nodesPower = {
    continuousPower: 0,
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
  networkPower;

  lineChartOptions = this.chartOptions;
  lineChartLabels: string[] = ['10', '9', '8', '7', '6', '5', '4', '3', '2', '1'];
  lineChartType = 'line';
  lineChartLegend = true;
  lineChartData: any[];

  nodeHistory: NodeHistory[];
  activeNodesPercentage: number|string = 100;
  someNodesNotWorking = false;

  constructor(private frameService: FrameService, private nodeService: NodeService,
              private nodeHistoryService: NodeHistoryService) { }

  ngOnInit() {
    this.getNodesPower();
    this.getLastNodesPower();
    this.getActiveNodes();
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
        {data: [this.nodesPower.networkPower], label: 'Potencia Red'}
      ];
    }, err => {
      console.log(err);
    });
  }

  getLastNodesPower() {
    interval(30000).pipe(startWith(0), switchMap(() => this.frameService.getLastPowerMeasurementByNode()))
      .subscribe(resp => {
        const sumC = [];
        const sumN = [];
        _.forEach(resp, function (node) {
          node.continuousPower = node.continuousPower.split(',').map(Number);
          sumC.push(node.continuousPower);
          node.networkPower = node.networkPower.split(',').map(Number);
          sumN.push(node.networkPower);
        });
        function sum_columns(data) {
          return _.map(_.unzip(data), _.sum);
        }

        this.continuousPower = sum_columns(sumC).reverse();
        this.networkPower = sum_columns(sumN).reverse();
        this.lineChartData = [
          {data: this.continuousPower, label: 'Potencia Continua', fill: false},
          {data: this.networkPower, label: 'Potencia Red', fill: false}
        ];
      }, err => {
        console.log(err);
      });
  }

  showNodesHistory() {
    this.nodeHistoryService.getNodesHistory().subscribe(history => {
      this.nodeHistory = history;
      this.someNodesNotWorking = false;
    });
  }

  getActiveNodes() {
    interval(30000*10).pipe(startWith(0), switchMap(() => this.nodeService.getActiveNodes()))
      .subscribe(resp => {
        let count = 0;
        _.forEach(resp, function(node) {
          if (!node.working) {
            count ++;
          }
        });
        this.activeNodesPercentage = count !== 0 ? Number(100 - count * 100 / resp.length).toFixed(2) : 100;
        if (this.activeNodesPercentage !== 100) {
          this.someNodesNotWorking = true;
        }
      }, err => {
        console.log(err);
      });
  }
}
