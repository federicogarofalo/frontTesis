import {Severity} from './severity';
import {Node} from './node';

export class Threshold {
  id: number;
  type: string;
  minValue: number;
  maxValue: number;
  lastModification: string;
  variableName: string;
  isActive: boolean;
  severity: Severity;
  unitOfMeasurement: string;
  node: Node;

  constructor(params: any) {
    this.id = params.id;
    this.type = params.type;
    this.minValue = params.minValue;
    this.maxValue = params.maxValue;
    this.lastModification = params.lastModification;
    this.variableName = params.variableName;
    this.isActive = params.isActive;
    this.severity = new Severity(params.severity);
    this.unitOfMeasurement = params.unitOfMeasurement;
    this.node =  params.node ? new Node(params.node) : params.node;
  }
}
