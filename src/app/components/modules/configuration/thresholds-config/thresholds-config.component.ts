import { Component, OnInit } from '@angular/core';
import {ThresholdService} from '../../../../services/threshold.service';
import {Threshold} from '../../../../models/threshold';
import {Severity} from '../../../../models/severity';
import {SeverityService} from '../../../../services/severity.service';
import {VariableService} from '../../../../services/variable.service';
import {DatePipe} from '@angular/common';

@Component({
  selector: 'app-thresholds-config',
  templateUrl: './thresholds-config.component.html',
  styleUrls: ['./thresholds-config.component.css']
})
export class ThresholdsConfigComponent implements OnInit {

  thresholds: Threshold[];
  severities: Severity[];

  constructor(private thresholdService: ThresholdService, private severityService: SeverityService,
              public variable: VariableService, private datePipe: DatePipe) { }

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
    this.thresholdService.updateThreshold(threshold).subscribe(res => {
      Object.assign(threshold, res);
      threshold.lastModification = this.datePipe.transform(new Date(res.lastModification), 'yyyy-MM-dd');
      threshold['editMode'] = false;
    }, err => {
      console.log(err);
    });
  }

  cancelEdition(threshold: Threshold) {
    Object.assign(threshold, threshold['originalValue']);
    threshold['editMode'] = false;
  }
}
