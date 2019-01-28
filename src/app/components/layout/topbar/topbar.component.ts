import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../../services/auth.service';

@Component({
  selector: 'app-topbar',
  templateUrl: './topbar.component.html',
  styleUrls: ['./topbar.component.css']
})
export class TopbarComponent implements OnInit {

  userMenu = false;

  constructor(private authService: AuthService) { }

  ngOnInit() {
  }

  toggleUserMenu() {
    this.userMenu = !this.userMenu;
  }

  logout() {
    this.authService.logout();
  }
}
