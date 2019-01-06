import {Time} from '@angular/common';

export class Notification {
  id: number;
  description: string;
  affectedVariable: string;
  value: number;
  thresholdExceeded: any;
  node: any;
  criticality: any;
  visualize: boolean;
  date: Date;
  hour: Time;

  constructor(params: any) {
    this.id = params.id;
    this.description = params.descripcion;
    this.affectedVariable = params.variableAfectada;
    this.value = params.valor;
    this.thresholdExceeded = params.umbralSuperado;
    this.node = params.nodo;
    this.criticality = params.criticidad;
    this.visualize = params.visualizar;
    this.date = params.fecha;
    this.hour = params.hora;
  }
}
