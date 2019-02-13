export class Severity {
  id: number;
  priority: string;
  reps: number;
  period: string;

  constructor(params: any) {
    this.id = params.id;
    this.priority = params.prioridad;
    this.reps = params.cantidadRepeticiones;
    this.period = params.periodoTiempo;
  }
}
