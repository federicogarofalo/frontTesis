import {Component, OnInit} from '@angular/core';
import {AuthService} from '../../../services/auth.service';
import {Router} from '@angular/router';
import {User} from '../../../models/user';
import {UserService} from '../../../services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  username: string;
  password: string;

  hasAccount = true;

  newUser: User = new User({});

  invalidCredentials: boolean;
  success: boolean;

  constructor(private authService: AuthService, private router: Router, private userService: UserService) { }

  ngOnInit() {
  }

  doLogin() {
    const loginModel = {
      username: this.username,
      password: this.password
    };
    this.authService.login(loginModel).subscribe(
      success => {
        localStorage.setItem('token', success['token']);
        localStorage.setItem('role', success['user']['authorities'][0]['authority']);
        localStorage.setItem('user', JSON.stringify(new User(success['user'])));
        this.router.navigate(['home']);
      },
      err => {
        this.invalidCredentials = true;
      }
    );
  }

  toggleHasAccount() {
    this.hasAccount = !this.hasAccount;
  }

  createUser() {
    this.userService.createUser(this.newUser).subscribe(res => {
      this.success = true;
    }, err => {
      // mostrar campos que fallaron
    });
  }
}
