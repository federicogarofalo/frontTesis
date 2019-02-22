import {Node} from './node';

export class NodeHistory {
  id: number;
  node: Node;
  control: number;
  lastFrame: number;
  description: string;

  constructor(params) {
    this.id = params.id;
    this.node = params.node ? new Node(params.node) : params.node;
    this.control = params.control;
    this.lastFrame = params.lastFrame;
    this.description = params.description;
  }
}
