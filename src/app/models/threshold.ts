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
    this.type = params.tipoUmbral;
    this.minValue = params.valorMin;
    this.maxValue = params.valorMax;
    this.lastModification = params.ultimaModificacion;
    this.variableName = params.nombreVariable;
    this.isActive = params.activo;
    this.severity = new Severity(params.criticidad);
    this.unitOfMeasurement = params.unidadMedida;
    this.node =  params.nodo ? new Node(params.nodo) : params.nodo;
  }
}
