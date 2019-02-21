import {Time} from '@angular/common';
import {Node} from './node';
import {Severity} from './severity';
import {Threshold} from './threshold';

export class Notification {
  id: number;
  description: string;
  affectedVariable: string;
  value: number;
  thresholdExceeded: Threshold;
  node: Node;
  severity: Severity;
  visualize: boolean;
  date: Date;
  hour: Time;

  constructor(params: any) {
    this.id = params.id;
    this.description = params.description;
    this.affectedVariable = params.affectedVariable;
    this.value = params.value;
    this.thresholdExceeded = params.thresholdExceeded ? new Threshold(params.thresholdExceeded) : params.thresholdExceeded;
    this.node = new Node(params.node);
    this.severity = params.severity ? new Severity(params.severity) : params.severity;
    this.visualize = params.visualize;
    this.date = params.date;
    this.hour = params.hour;
  }
}
