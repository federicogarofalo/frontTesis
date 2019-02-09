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

  nodesPower = {
    continuousPower: 0,
    internalPower: 0,
    networkPower: 0
  };

  barChartOptions: any = {
    scaleShowVerticalLines: false,
    responsive: true,
    scales: {
      yAxes: [{
        ticks: {
          callback: function (value) {
            return value + ' Watts';
          }
        }
      }]
    }
  };
  barChartLabels: string[] = ['Ultima Medición'];
  barChartType = 'bar';
  barChartLegend = true;
  barChartData: any[];

  constructor(private frameService: FrameService) { }

  ngOnInit() {
    this.getNodesPower();
  }

  getNodesPower() {
    interval(10000).pipe(startWith(0), switchMap(() => this.frameService.getNodesPower()))
      .subscribe(resp => {
      const self = this;
      this.nodesPower = {continuousPower: 0, internalPower: 0, networkPower: 0};
      _.forEach(resp, function(frame) {
        self.nodesPower.continuousPower += frame.continuousPower;
        self.nodesPower.internalPower += frame.internalPower;
        self.nodesPower.networkPower += frame.networkPower;
      });
      this.barChartData = [
        {data: [this.nodesPower.continuousPower], label: 'Potencia Continua'},
        {data: [this.nodesPower.internalPower], label: 'Potencia Interna'},
        {data: [this.nodesPower.networkPower], label: 'Potencia Red'}
      ];
      console.log('Request worked');
    }, err => {
      console.log('Request did not work');
    });
  }
}
