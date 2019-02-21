import {Node} from './node';

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
  temperature1: number;
  temperature2: number;
  temperature3: number;
  temperature4: number;
  temperature5: number;
  humidity: number;
  pwm: number;
  date: string;
  hour: string;
  continuousPower: number|number[];
  internalPower: number|number[];
  networkPower: number|number[];
  controlState: boolean;

  constructor(params: any) {
    this.id = params.id;
    this.node = params.node ? new Node(params.node) : params.node;
    this.state = params.state;
    this.networkVoltage = params.networkVoltage;
    this.networkCurrent = params.networkCurrent;
    this.voltageFrequency = params.voltageFrequency;
    this.currentFrequency = params.currentFrequency;
    this.phaseShift = params.phaseShift;
    this.groundVoltage = params.groundVoltage;
    this.internalVoltage = params.internalVoltage;
    this.internalCurrent = params.internalCurrent;
    this.continuousVoltage = params.continuousVoltage;
    this.continuousCurrent = params.continuousCurrent;
    this.temperature1 = params.temperature1;
    this.temperature2 = params.temperature2;
    this.temperature3 = params.temperature3;
    this.temperature4 = params.temperature4;
    this.temperature5 = params.temperature5;
    this.humidity = params.humidity;
    this.pwm = params.pwm;
    this.date = params.date;
    this.hour = params.hour;
    this.continuousPower = params.continuousPower;
    this.internalPower = params.internalPower;
    this.networkPower = params.networkPower;
    this.controlState = params.controlState;
  }
}
