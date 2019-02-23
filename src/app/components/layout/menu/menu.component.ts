import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {AuthService} from '../../../services/auth.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  active = true;

  constructor(private router: Router, public auth: AuthService) { }

  ngOnInit() {
  }

  redirectTo(page: string) {
    this.router.navigate([page]);
  }
}
