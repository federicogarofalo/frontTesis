import {Time} from '@angular/common';

export class Frame {
  id: number;
  node: any;
  state: string;
  networkTension: number;
  networkCurrent: number;
  voltageFrequency: number;
  currentFrequency: number;
  phaseShift: number;
  groundVoltage: number;
  internalTension: number;
  internalCurrent: number;
  continuousTension: number;
  continuousCurrent: number;
  temperature: number;
  humidity: number;
  pvm: number;
  date: Date;
  hour: Time;
  continuousPower: number|number[];
  internalPower: number|number[];
  networkPower: number|number[];
  controlState: boolean;

  constructor(params: any) {
    this.id = params.id;
    this.node = params.nodo;
    this.state = params.estado;
    this.networkTension = params.tensionRed;
    this.networkCurrent = params.corrienteRed;
    this.voltageFrequency = params.frecuenciaTension;
    this.currentFrequency = params.frecuenciaCorriente;
    this.phaseShift = params.desfasaje;
    this.groundVoltage = params.tensionRed;
    this.internalTension = params.tensionInterna;
    this.internalCurrent = params.corrienteInterna;
    this.continuousTension = params.tensionContinua;
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
