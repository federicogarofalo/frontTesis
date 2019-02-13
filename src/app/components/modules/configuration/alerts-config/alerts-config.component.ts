import { Component, OnInit } from '@angular/core';
import {SeverityService} from '../../../../services/severity.service';
import {Severity} from '../../../../models/severity';

@Component({
  selector: 'app-alerts-config',
  templateUrl: './alerts-config.component.html',
  styleUrls: ['./alerts-config.component.css']
})
export class AlertsConfigComponent implements OnInit {

  severities: Severity[];

  constructor(private severityService: SeverityService) { }

  ngOnInit() {
    this.severityService.getSeverities().subscribe(severities => {
      this.severities = severities;
    }, err => {
      console.log(err);
    });
  }

  editNode(severity: Severity) {
    severity['originalValue'] = Object.assign({}, severity);
    severity['editMode'] = true;
  }

  updateNode(severity: Severity) {
    this.severityService.updateSeverity(severity).subscribe(res => {
      severity = res;
      severity['editMode'] = false;
    }, err => {
      console.log(err);
    });
  }

  cancelEdition(severity: Severity) {
    Object.assign(severity, severity['originalValue']);
    severity['editMode'] = false;
  }
}
