import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {NodeService} from '../../../services/node.service';
import {Node} from '../../../models/node';
import {Subject} from 'rxjs';

@Component({
  selector: 'app-node-selector',
  templateUrl: './node-selector.component.html',
  styleUrls: ['./node-selector.component.css']
})
export class NodeSelectorComponent implements OnInit {

  nodes: Node[];
  dataReady: Subject<any>;
  value: Node;
  @Output() changed: EventEmitter<any> = new EventEmitter<any>();

  constructor(private nodeService: NodeService) { }

  ngOnInit() {
    this.dataReady = new Subject();
    this.nodeService.getActiveNodes().subscribe(nodes => {
      this.nodes = nodes;
      this.value = this.value ? this.value : this.nodes[0];
      this.dataReady.next(nodes);
    }, err => {
      console.log(err);
    });
  }

  getValue() {
    return this.value;
  }
}
