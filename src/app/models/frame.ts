import {Time} from '@angular/common';

export class Frame {
  id: number;
  node: any;
  state: string;
  networkVoltage: number;
  networkCurrent: number;
  voltageFrequency: number;
  currentFrequency: number;
  phaseShift: number;
  groundVoltage: number;
  internalVoltage: number;
  internalCurrent: number;
  continuousVoltage: number;
  continuousCurrent: number;
  temperature: number;
  humidity: number;
  pvm: number;
  date: Date;
  hour: Time;
  continuousPower: number;
  internalPower: number;
  networkPower: number;
  controlState: boolean;

  constructor(params: any) {
    this.id = params.id;
    this.node = params.nodo;
    this.state = params.estado;
    this.networkVoltage = params.tensionRed;
    this.networkCurrent = params.corrienteRed;
    this.voltageFrequency = params.frecuenciaTension;
    this.currentFrequency = params.frecuenciaCorriente;
    this.phaseShift = params.desfasaje;
    this.groundVoltage = params.tensionRed;
    this.internalVoltage = params.tensionInterna;
    this.internalCurrent = params.corrienteInterna;
    this.continuousVoltage = params.tensionContinua;
    this.continuousCurrent = params.corrienteContinua;
    this.temperature = params.temperatura1;
    this.humidity = params.humedad;
    this.pvm = params.pvm;
    this.date = params.fecha;
    this.hour = params.hora;
    this.continuousPower = params.potenciaContinua;
    this.internalPower = params.potenciaInterna;
    this.networkPower = params.potenciaRed;
    this.controlState = params.estadoControl;
  }
}
