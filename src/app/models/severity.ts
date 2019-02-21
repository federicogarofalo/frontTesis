export class Severity {
  id: number;
  priority: string;
  reps: number;
  period: string;

  constructor(params: any) {
    this.id = params.id;
    this.priority = params.priority;
    this.reps = params.reps;
    this.period = params.period;
  }
}
