import {Component, Input, OnInit} from '@angular/core';
import {SeverityService} from '../../../services/severity.service';
import {Severity} from '../../../models/severity';

@Component({
  selector: 'app-severity-selector',
  templateUrl: './severity-selector.component.html',
  styleUrls: ['./severity-selector.component.css']
})
export class SeveritySelectorComponent implements OnInit {

  severities: Severity[];
  @Input() value: Severity;

  constructor(private severityService: SeverityService) { }

  ngOnInit() {
    this.severityService.getSeverities().subscribe(severities => {
      this.severities = severities;
    }, err => {
      console.log(err);
    });
  }

  getValue() {
    return this.value;
  }
}