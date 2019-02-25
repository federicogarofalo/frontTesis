import {AfterViewInit, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {Node} from '../../../models/node';
import {NodeService} from '../../../services/node.service';
import {FrameService} from '../../../services/frame.service';
import {NodeSelectorComponent} from '../../utils/node-selector/node-selector.component';
import * as _ from 'lodash';
import {FilteredFrame} from '../../../models/filtered-frame';

interface ChartDataParams {
  type: number;
  dateFrom: string;
  dateTo: string;
  hourFrom: string;
  hourTo: string;
  label: string;
}
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
  powerChartExpandedDate;
  powerChartProcessType = 2;

  voltageChartOptions = this.chartOptions;
  voltageChartLabels: string[] = [];
  voltageChartType = 'bar';
  voltageChartLegend = true;
  voltageChartData: any[];
  voltageChartExpandedDate;
  voltageChartProcessType = 2;

  expandedDataFrames: FilteredFrame[];
  showModal = false;

  @ViewChild(NodeSelectorComponent) nodeSelector;
  @ViewChild('myModal') myModal: ElementRef;


  constructor(private nodeService: NodeService, private frameService: FrameService) { }

  ngOnInit() {
    this.defaultDateTo = new Date(Date.now() - this.tzOffset);
    this.defaultDateTo.setDate(this.defaultDateTo.getDate() - 1);
    this.defaultDateFrom = new Date();
    this.defaultDateFrom.setDate(this.defaultDateTo.getDate() - 6);
    this.defaultDateFrom = this.defaultDateFrom.toISOString().substring(0, 10);
    this.defaultDateTo = this.defaultDateTo.toISOString().substring(0, 10);

    this.defaultDateFrom = '2019-02-16';
    this.defaultDateTo = '2019-02-22';
  }

  ngAfterViewInit(): void {
    const nodesSubscription = this.nodeSelector.dataReady.subscribe(nodes => {
      this.node = nodes[0];
      this.getPowerData();
      this.getVoltageData();
      nodesSubscription.unsubscribe();
    });
  }

  getVoltageData(type = 2, dateFrom = String(this.defaultDateFrom), dateTo = String(this.defaultDateTo),
                hourFrom?: string, hourTo?: string, label = 'date') {
    this.frameService.getProcessedFilteredData(
      'tension_continua_avg,tension_red_avg', dateFrom, dateTo, this.node, type).subscribe(resp => {
      if (dateFrom === dateTo) {
        this.voltageChartExpandedDate = dateTo;
      }
      this.voltageChartProcessType = type;
      this.voltageChartLabels.length = 0;
      const continuousVoltage = [];
      const networkVoltage = [];
      const self = this;
      _.forEach(resp[0].data, function (data) {
        continuousVoltage.push(data['value']);
        self.voltageChartLabels.push(data[label]);
      });
      _.forEach(resp[1].data, function (data) {
        networkVoltage.push(data['value']);
      });
      this.voltageChartLabels.reverse();
      this.voltageChartData = [
        {data: continuousVoltage, label: 'Tensión Continua'},
        {data: networkVoltage, label: 'Tensión Red'},
        // {data: [86, 90, 88, 84, 91, 92, 87], label: 'Tensión Continua', fill: false},
        // {data: [220, 219, 221, 220, 220, 220, 218], label: 'Tensión Red', fill: false}
      ];
    }, err => {
      console.log(err);
      });
  }

  getPowerData(type = 2, dateFrom = String(this.defaultDateFrom), dateTo = String(this.defaultDateTo),
                 hourFrom?: string, hourTo?: string, label = 'date') {
    this.frameService.getProcessedFilteredData(
      'potencia_continua_avg,potencia_red_avg', dateFrom, dateTo, this.node, type).subscribe(resp => {
      if (dateFrom === dateTo) {
        this.powerChartExpandedDate = dateTo;
      }
      this.powerChartProcessType = type;
      this.powerChartLabels.length = 0;
      const continuousPower = [];
      const networkPower = [];
      const self = this;
      _.forEach(resp[0].data, function (data) {
        continuousPower.push(data['value']);
        self.powerChartLabels.push(data[label]);
      });
      _.forEach(resp[1].data, function (data) {
        networkPower.push(data['value']);
      });
      this.powerChartLabels.reverse();
      this.powerChartData = [
        {data: continuousPower, label: 'Potencia Continua'},
        {data: networkPower, label: 'Potencia Red'},
        // {data: [1000, 980, 995, 970, 999, 975, 986], label: 'Potencia Continua'},
        // {data: [840, 830, 835, 832, 829, 839, 840], label: 'Potencia Red'}
      ];
    }, err => {
      console.log(err);
    });
  }

  getFrames(variableName: string, dateFrom: string, dateTo: string, hourFrom?: string, hourTo?: string) {
    this.frameService.getFilteredData(variableName, dateFrom, dateTo, this.node, hourFrom, hourTo).subscribe(res => {
      this.expandedDataFrames = res;
    });
  }

  onNodeChange(node: Node) {
    this.node = node;
    this.getVoltageData();
    this.getPowerData();
  }

  changeData(tableData) {
    if (tableData.active.length === 0) {
      return;
    }
    const period = tableData.active[0]._model.label;
    const chart = tableData.active[0]._model.datasetLabel;
    if (chart.includes('Tensión')) {
      const params = this.getNextProcessType(this.voltageChartProcessType, period, this.voltageChartExpandedDate);
      if (params) {
        this.getVoltageData(params.type, params.dateFrom, params.dateTo, params.hourFrom, params.hourTo, params.label);
      } else {
        this.getFrames('tension_continua,tension_red', this.voltageChartExpandedDate, this.voltageChartExpandedDate, null, period);
      }
    } else {
      const params = this.getNextProcessType(this.powerChartProcessType, period, this.powerChartExpandedDate);
      if (params) {
        this.getPowerData(params.type, params.dateFrom, params.dateTo, params.hourFrom, params.hourTo, params.label);
      } else {
        this.getFrames('potencia_continua,potencia_red', this.powerChartExpandedDate, this.powerChartExpandedDate, null, period);
      }
    }
  }

  getNextProcessType(type, period, expandedDate): ChartDataParams  {
    switch (type) {
      case 2:
        return {
          type: 4,
          dateFrom: period,
          dateTo: period,
          hourFrom: null,
          hourTo: null,
          label: 'hour'
        };
      case 4:
        return {
          type: 1,
          dateFrom: expandedDate,
          dateTo: expandedDate,
          hourFrom: null,
          hourTo: period,
          label: 'hour'
        };
      default:
        return null;
    }
  }
}
