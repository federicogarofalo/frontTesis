import {Component, OnInit} from '@angular/core';
import {AuthService} from '../../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  username: string;

  password: string;

  constructor(private authService: AuthService) { }

  ngOnInit() {
  }

  doLogin() {
    debugger;
    const loginModel = {
      username: this.username,
      password: this.password
    };
    this.authService.login(loginModel).subscribe(
      success => {
        debugger;
      },
      err => {
        debugger;
      }
    );
  }
}
