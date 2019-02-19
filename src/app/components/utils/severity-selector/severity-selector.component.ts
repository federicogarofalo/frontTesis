import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {SeverityService} from '../../../services/severity.service';
import {Severity} from '../../../models/severity';
import {Subject} from 'rxjs';

@Component({
  selector: 'app-severity-selector',
  templateUrl: './severity-selector.component.html',
  styleUrls: ['./severity-selector.component.css']
})
export class SeveritySelectorComponent implements OnInit {

  severities: Severity[];
  dataReady: Subject<any>;
  value: Severity;
  @Output() changed: EventEmitter<any> = new EventEmitter<any>();

  constructor(private severityService: SeverityService) { }

  ngOnInit() {
    this.dataReady = new Subject();
    this.severityService.getSeverities().subscribe(severities => {
      this.severities = severities;
      this.value = this.value ? this.value : this.severities[0];
      this.dataReady.next(severities);
    }, err => {
      console.log(err);
    });
  }

  getValue() {
    return this.value;
  }
}
