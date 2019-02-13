import { Component, OnInit } from '@angular/core';
import {ThresholdService} from '../../../../services/threshold.service';
import {Threshold} from '../../../../models/threshold';
import {Severity} from '../../../../models/severity';
import {SeverityService} from '../../../../services/severity.service';

@Component({
  selector: 'app-thresholds-config',
  templateUrl: './thresholds-config.component.html',
  styleUrls: ['./thresholds-config.component.css']
})
export class ThresholdsConfigComponent implements OnInit {

  thresholds: Threshold[];
  severities: Severity[];

  constructor(private thresholdService: ThresholdService, private severityService: SeverityService) { }

  ngOnInit() {
    this.thresholdService.getThresholds().subscribe(thresholds => {
      this.thresholds = thresholds;
    }, err => {
      console.log(err);
    });
    this.severityService.getSeverities().subscribe( severities => {
      this.severities = severities;
    }, err => {
      console.log(err);
    });
  }

  editNode(threshold: Threshold) {
    threshold['originalValue'] = Object.assign({}, threshold);
    threshold['editMode'] = true;
  }

  updateThreshold(threshold: Threshold) {
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
