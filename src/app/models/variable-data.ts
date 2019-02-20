export class VariableData {
  value: number;
  date: string;
  hour: string;

  constructor(params) {
    this.value = params.valor;
    this.date = params.fecha;
    this.hour = params.hora;
  }
}
