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
    const role = params.authorities ? params.authorities[0] : params.role;
    this.role = role !== null ? new Role(role) : role;
    this.accountState = params.accountState ? new AccountState(params.accountState) : params.accountState;
  }
}
