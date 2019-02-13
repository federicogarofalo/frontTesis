import { Component, OnInit } from '@angular/core';
import {ThresholdService} from '../../../../services/threshold.service';
import {Threshold} from '../../../../models/threshold';

@Component({
  selector: 'app-thresholds-config',
  templateUrl: './thresholds-config.component.html',
  styleUrls: ['./thresholds-config.component.css']
})
export class ThresholdsConfigComponent implements OnInit {

  thresholds: Threshold[];

  constructor(private thresholdService: ThresholdService) { }

  ngOnInit() { debugger;
    this.thresholdService.getThresholds().subscribe(thresholds => {
      this.thresholds = thresholds;
    }, err => {
      console.log(err);
    });
  }

  editNode(threshold: Threshold) {
    threshold['originalValue'] = Object.assign({}, threshold);
    threshold['editMode'] = true;
  }

  updateNode(threshold: Threshold) {
    threshold.lastModification = this.getLocalISOTime();
    this.thresholdService.updateThreshold(threshold).subscribe(res => {
      threshold = res;
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

  getHumanRedableName(name: string) {
    name = name.replace('_', ' ');
    return name.charAt(0).toUpperCase() + name.slice(1);
  }
}
