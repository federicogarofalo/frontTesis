export class AccountState {
  id: number;
  description: string;

  constructor(params) {
    this.id = params.id;
    this.description = params.description;
  }
}
