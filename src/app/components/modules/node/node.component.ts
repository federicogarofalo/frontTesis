import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {Threshold} from '../../../models/threshold';
import {Severity} from '../../../models/severity';
import {ThresholdService} from '../../../services/threshold.service';
import {SeverityService} from '../../../services/severity.service';
import {VariableService} from '../../../services/variable.service';
import {Node} from '../../../models/node';
import {NodeSelectorComponent} from '../../utils/node-selector/node-selector.component';

@Component({
  selector: 'app-node',
  templateUrl: './node.component.html',
  styleUrls: ['./node.component.css']
})
export class NodeComponent implements OnInit, AfterViewInit {

  node: Node;
  thresholds: Threshold[];
  severities: Severity[];

  @ViewChild(NodeSelectorComponent) nodeSelector;

  constructor(private thresholdService: ThresholdService, private severityService: SeverityService,
              public variable: VariableService) { }

  ngOnInit() {

  }

  ngAfterViewInit(): void {
    const nodesSubscription = this.nodeSelector.dataReady.subscribe(nodes => {
      this.node = nodes[0];
      this.getThresholds();
      nodesSubscription.unsubscribe();
    });
  }

  getThresholds() {
    this.thresholdService.getThresholds(this.node).subscribe(thresholds => {
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

  onNodeChange(node: Node) {
    this.node = node;
    this.getThresholds();
  }
}
