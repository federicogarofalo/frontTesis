export class VariableData {
  value: number;
  date: string;
  hour: string;

  constructor(params) {
    this.value = params.value;
    this.date = params.date;
    this.hour = params.hour;
  }
}
