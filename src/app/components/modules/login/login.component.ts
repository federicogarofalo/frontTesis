import {Component, OnInit} from '@angular/core';
import {AuthService} from '../../../services/auth.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  username: string;

  password: string;

  constructor(private authService: AuthService, private router: Router) { }

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
        this.router.navigate(['home']);
      },
      err => {
      }
    );
  }
}
