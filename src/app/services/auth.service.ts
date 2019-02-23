import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { AbstractHttpService } from './abstract-http-service';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService extends AbstractHttpService {

  loggedIn = false;

  // store the URL so we can redirect after logging in
  redirectUrl: string;

  token: string;

  constructor(private http: HttpClient, private router: Router) {
    super();
  }

  login(model): Observable<Object> {
    return this.http.post(this.baseUrl + '/api/login', model);
  }

  logout(): void {
    localStorage.clear();
    this.loggedIn = false;
    this.router.navigate(['login']);
  }

  isLoggedIn() {
    if (localStorage.getItem('token')) {
      return true;
    }
    return false;
  }

  isAdmin() {
    const user = JSON.parse(localStorage.getItem('user'));
    return user.role.type === 'ROLE_ADMINISTRADOR';
  }

  isAdvanced() {
    const user = JSON.parse(localStorage.getItem('user'));
    return user.role.type === 'ROLE_AVANZADO';
  }
}
