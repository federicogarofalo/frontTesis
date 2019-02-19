import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {AbstractHttpService} from './abstract-http-service';
import {HttpClient} from '@angular/common/http';
import {Role} from '../models/role';
import * as _ from 'lodash';

@Injectable({
  providedIn: 'root'
})
export class RoleService extends AbstractHttpService{

  constructor(private http: HttpClient) {
    super();
  }

  getRoles(): Observable<Role[]> {
    return this.http.get<Role[]>(this.baseUrl + '/roles').pipe(
      map(res => _.map(res, function(item) {
        return new Role(item);
      })));
  }
}
