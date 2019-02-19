export class Role {
  id: number;
  type: string;

  constructor(params) {
    this.id = params.id;
    this.type = params.authority ? params.authority : params.type;
  }

}
