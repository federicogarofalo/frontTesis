import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {Threshold} from '../../../models/threshold';
import {Severity} from '../../../models/severity';
import {ThresholdService} from '../../../services/threshold.service';
import {SeverityService} from '../../../services/severity.service';
import {VariableService} from '../../../services/variable.service';
import {Node} from '../../../models/node';
import {NodeSelectorComponent} from '../../utils/node-selector/node-selector.component';
import {FrameService} from '../../../services/frame.service';
import {interval} from 'rxjs';
import {startWith, switchMap} from 'rxjs/operators';
import * as _ from 'lodash';

@Component({
  selector: 'app-node',
  templateUrl: './node.component.html',
  styleUrls: ['./node.component.css']
})
export class NodeComponent implements OnInit, AfterViewInit {

  node: Node;
  thresholds: Threshold[];
  severities: Severity[];

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

  barChartOptions = this.chartOptions;
  barChartLabels: string[] = ['Ultima Medición'];
  barChartType = 'bar';
  barChartLegend = true;
  barChartData: any[];

  lineChartOptions = this.chartOptions;
  lineChartLabels: string[] = ['10', '9', '8', '7', '6', '5', '4', '3', '2', '1'].reverse();
  lineChartType = 'line';
  lineChartLegend = true;
  lineChartData: any[];

  @ViewChild(NodeSelectorComponent) nodeSelector;

  constructor(private thresholdService: ThresholdService, private severityService: SeverityService,
              public variable: VariableService, private frameService: FrameService) { }

  ngOnInit() {
    this.severityService.getSeverities().subscribe( severities => {
      this.severities = severities;
    }, err => {
      console.log(err);
    });
  }

  ngAfterViewInit(): void {
    const nodesSubscription = this.nodeSelector.dataReady.subscribe(nodes => {
      this.node = nodes[0];
      this.getThresholds();
      this.getFramesData();
      nodesSubscription.unsubscribe();
    });
  }

  getThresholds() {
    this.thresholdService.getThresholds(this.node).subscribe(thresholds => {
      this.thresholds = thresholds;
    }, err => {
      console.log(err);
    });
  }

  getFramesData() {
    interval(30000).pipe(startWith(0), switchMap(() => this.frameService.getLastFramesByNode(this.node)))
      .subscribe(resp => {
        this.barChartData = [
          {data: [resp[0].continuousVoltage], label: 'Tensión Continua'},
          {data: [resp[0].networkVoltage], label: 'Tensión Red'}
          // {data: [86], label: 'Tensión Continua'},
          // {data: [220], label: 'Tensión Red'}
        ];
        const continuousVoltage = [];
        const networkVoltage = [];
        _.forEach(resp, function (frame) {
          continuousVoltage.push(frame.continuousVoltage);
          networkVoltage.push(frame.networkVoltage);
        });
        this.lineChartData = [
          {data: continuousVoltage, label: 'Tensión Continua', fill: false},
          {data: networkVoltage, label: 'Tensión Red', fill: false}
          // {data: [86, 90, 88, 84, 91, 92, 87, 89, 92, 86], label: 'Tensión Continua', fill: false},
          // {data: [220, 219, 221, 220, 220, 220, 218, 220, 222, 220], label: 'Tensión Red', fill: false}
        ];
        console.log('Request worked');
      }, err => {
        console.log('Request did not work');
      });
  }

  editNode(threshold: Threshold) {
    threshold['originalValue'] = Object.assign({}, threshold);
    threshold['editMode'] = true;
  }

  updateThreshold(threshold: Threshold) {
    threshold.lastModification = this.getLocalISOTime();
    this.thresholdService.updateThreshold(threshold).subscribe(res => {
      Object.assign(threshold, res);
      threshold['editMode'] = false;
    }, err => {
      console.log(err);
    });
  }

  cancelEdition(threshold) {
    Object.assign(threshold, threshold['originalValue']);
    threshold['editMode'] = false;
  }

  getLocalISOTime() {
    const tzOffset = (new Date()).getTimezoneOffset() * 60000,
      localISOTime = (new Date(Date.now() - tzOffset)).toISOString().slice(0, -1);
    return localISOTime.split('T')[0];
  }

  onNodeChange(node: Node) {
    this.node = node;
    this.getThresholds();
    this.getFramesData();
  }
}
