import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {Node} from '../../../models/node';
import {NodeService} from '../../../services/node.service';
import {FrameService} from '../../../services/frame.service';
import {NodeSelectorComponent} from '../../utils/node-selector/node-selector.component';
import {interval} from 'rxjs';
import {startWith, switchMap} from 'rxjs/operators';
import * as _ from 'lodash';

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.css']
})
export class ReportComponent implements OnInit, AfterViewInit {

  node: Node;
  tzOffset = new Date().getTimezoneOffset() * 60000;
  defaultDateFrom: Date|string;
  defaultDateTo: Date|string;

  chartOptions: any = {
    scaleShowVerticalLines: false,
    responsive: true,
    scales: {
      yAxes: [{
        ticks: {
          beginAtZero: false,
          suggestedMin: 5,
          callback: function (value) {
            return value + ' Vol';
          }
        }
      }]
    }
  };

  powerChartOptions = this.chartOptions;
  powerChartLabels: string[] = [];
  powerChartType = 'bar';
  powerChartLegend = true;
  powerChartData: any[];

  voltageChartOptions = this.chartOptions;
  voltageChartLabels: string[] = [];
  voltageChartType = 'bar';
  voltageChartLegend = true;
  voltageChartData: any[];

  @ViewChild(NodeSelectorComponent) nodeSelector;

  constructor(private nodeService: NodeService, private frameService: FrameService) { }

  ngOnInit() {
    this.defaultDateTo = new Date(Date.now() - this.tzOffset);
    this.defaultDateTo.setDate(this.defaultDateTo.getDate() - 1);
    this.defaultDateFrom = new Date();
    this.defaultDateFrom.setDate(this.defaultDateTo.getDate() - 6);
    this.defaultDateFrom = this.defaultDateFrom.toISOString().substring(0, 10);
    this.defaultDateTo = this.defaultDateTo.toISOString().substring(0, 10);
  }

  ngAfterViewInit(): void {
    const nodesSubscription = this.nodeSelector.dataReady.subscribe(nodes => {
      this.node = nodes[0];
      this.getFramesData();
      nodesSubscription.unsubscribe();
    });
  }

  getFramesData() {
    this.frameService.getProcessedFilteredData(
      'tension_continua_avg,tension_red_avg,potencia_continua_avg,potencia_red_avg',
      String(this.defaultDateFrom), String(this.defaultDateTo), this.node, 2)
      .subscribe(resp => {
        this.powerChartLabels = [];
        this.voltageChartLabels = ['2019-02-21', '2019-02-20'];
        const continuousVoltage = [];
        const networkVoltage = [];
        const continuousPower = [];
        const networkPower = [];
        const self = this;
        _.forEach(resp[0].data, function (data) {
          continuousVoltage.push(data['valor']);
          self.voltageChartLabels.push(data['fecha']);
        });
        _.forEach(resp[1].data, function (data) {
          networkVoltage.push(data['valor']);
        });
        _.forEach(resp[2].data, function (data) {
          continuousPower.push(data['valor']);
          self.powerChartLabels.push(data['fecha']);
        });
        _.forEach(resp[3].data, function (data) {
          networkPower.push(data['valor']);
        });
        this.powerChartLabels.reverse();
        this.voltageChartLabels.reverse();
        this.powerChartData = [
          // {data: continuousPower, label: 'Potencia Continua'},
          // {data: networkPower, label: 'Potencia Red'},
          {data: [1000, 980, 995, 970, 999, 975, 986], label: 'Potencia Continua'},
          {data: [840, 830, 835, 832, 829, 839, 840], label: 'Potencia Red'}
        ];
        this.voltageChartData = [
          // {data: continuousVoltage, label: 'Tensión Continua'},
          // {data: networkVoltage, label: 'Tensión Red'},
          {data: [86, 90, 88, 84, 91, 92, 87], label: 'Tensión Continua', fill: false},
          {data: [220, 219, 221, 220, 220, 220, 218], label: 'Tensión Red', fill: false}
        ];
        console.log('Request worked');
      }, err => {
        console.log('Request did not work');
      });
  }

  onNodeChange(node: Node) {
    this.node = node;
    this.getFramesData();
  }

  changeData(tableData) {
    debugger;
  }
}
