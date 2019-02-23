import { Component, OnInit } from '@angular/core';
import {User} from '../../../models/user';
import {Role} from '../../../models/role';
import {AccountState} from '../../../models/account-state';
import {UserService} from '../../../services/user.service';
import {RoleService} from '../../../services/role.service';
import {AccountStateService} from '../../../services/account-state.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  users: User[];
  roles: Role[];
  accountStates: AccountState[];

  constructor(private userService: UserService, private roleService: RoleService,
              private accountStateService: AccountStateService) { }

  ngOnInit() {
    this.userService.getUsers().subscribe(users => {
      this.users = users;
    }, err => {
      console.log(err);
    });
    this.roleService.getRoles().subscribe(roles => {
      this.roles = roles;
    }, err => {
      console.log(err);
    });
    this.accountStateService.getAccountStates().subscribe(states => {
      this.accountStates = states;
    }, err => {
      console.log(err);
    });
  }

  editUser(user: User) {
    user['originalValue'] = Object.assign({}, user);
    user['editMode'] = true;
  }

  updateUser(user: User) {
    this.userService.updateUser(user).subscribe(res => {
      Object.assign(user, res);
      user['editMode'] = false;
    }, err => {
      console.log(err);
    });
  }

  cancelEdition(user: User) {
    Object.assign(user, user['originalValue']);
    user['editMode'] = false;
  }
}
