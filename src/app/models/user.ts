import {Role} from './role';
import {AccountState} from './account-state';

export class User {
  id: number;
  userName: string;
  firstName: string;
  lastName: string;
  email: string;
  role: Role;
  accountState: AccountState;

  constructor(params) {
    this.id = params.id;
    this.userName = params.username;
    this.firstName = params.firstName;
    this.lastName = params.lastName;
    this.email = params.email;
    this.role = params.authorities ? new Role(params.authorities[0]) : new Role(params.userProfile);
    this.accountState = new AccountState(params.estado);
  }
}
