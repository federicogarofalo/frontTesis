export class Node {
  id: number;
  module: string;
  number: number;
  isActive: boolean;
  description: string;
  working: boolean;

  constructor(params: any) {
    this.id = params.id;
    this.module = params.module;
    this.number = params.number;
    this.isActive = params.isActive;
    this.description = params.description;
    this.working = params.working;
  }
}
