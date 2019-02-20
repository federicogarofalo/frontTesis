import { Injectable } from '@angular/core';
import {AbstractHttpService} from './abstract-http-service';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';;
import {map} from 'rxjs/operators';
import {User} from '../models/user';
import * as _ from 'lodash';

@Injectable({
  providedIn: 'root'
})
export class UserService extends AbstractHttpService {

  constructor(private http: HttpClient) {
    super();
  }

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.baseUrl + '/api/usuarios').pipe(
      map(res => _.map(res, function(item) {
        return new User(item);
      })));
  }

  updateUser(user: User): Observable<User> {
    return this.http.put<User>(this.baseUrl + '/api/usuario', user);
  }
}
