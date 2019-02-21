export class Node {
  id: number;
  module: string;
  number: number;
  isActive: boolean;
  description: string;

  constructor(params: any) {
    this.id = params.id;
    this.module = params.module;
    this.number = params.number;
    this.isActive = params.isActive;
    this.description = params.description;
  }
}
