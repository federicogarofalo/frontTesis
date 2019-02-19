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
    this.description = params.descripcion;
    this.affectedVariable = params.variableAfectada;
    this.value = params.valor;
    this.thresholdExceeded = params.umbralSuperado ? new Threshold(params.umbralSuperado) : params.umbralSuperado;
    this.node = new Node(params.nodo);
    this.severity = params.criticidad ? new Severity(params.criticidad) : params.criticidad;
    this.visualize = params.visualizar;
    this.date = params.fecha;
    this.hour = params.hora;
  }
}
