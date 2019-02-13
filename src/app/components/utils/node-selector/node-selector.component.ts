import {Component, Input, OnInit} from '@angular/core';
import {NodeService} from '../../../services/node.service';
import {Node} from '../../../models/node';

@Component({
  selector: 'app-node-selector',
  templateUrl: './node-selector.component.html',
  styleUrls: ['./node-selector.component.css']
})
export class NodeSelectorComponent implements OnInit {

  nodes: Node[];
  @Input() value: Node;

  constructor(private nodeService: NodeService) { }

  ngOnInit() {
    this.nodeService.getNodes().subscribe(nodes => {
      this.nodes = nodes;
    }, err => {
      console.log(err);
    });
  }

  getValue() {
    return this.value;
  }
}
