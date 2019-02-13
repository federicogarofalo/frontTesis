export class Node {
  module: string;
  number: number;
  isActive: boolean;
  description: string;

  constructor(params: any) {
    this.module = params.modulo;
    this.number = params.numero;
    this.isActive = params.activo;
    this.description = params.descripcion;
  }
}
