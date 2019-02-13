import { Component, OnInit } from '@angular/core';
import {NodeService} from '../../../../services/node.service';
import {Node} from '../../../../models/node';

@Component({
  selector: 'app-nodes-config',
  templateUrl: './nodes-config.component.html',
  styleUrls: ['./nodes-config.component.css']
})
export class NodesConfigComponent implements OnInit {

  nodes: Node[];
  modules = ['Solar', 'Eólico', 'Termotanque'];

  constructor(private nodeService: NodeService) { }

  ngOnInit() {
    this.nodeService.getNodes().subscribe(nodes => {
      this.nodes = nodes;
    }, err => {
      console.log(err);
    });
  }

  editNode(node: Node) {
    node['originalValue'] = Object.assign({}, node);
    node['editMode'] = true;
  }

  updateNode(node: Node) {
    this.nodeService.updateNode(node).subscribe(res => {
      node = res;
      node['editMode'] = false;
    }, err => {
      console.log(err);
    });
  }

  cancelEdition(node: Node) {
    Object.assign(node, node['originalValue']);
    node['editMode'] = false;
  }

}
