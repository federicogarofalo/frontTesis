import { Injectable } from '@angular/core';
import {AbstractHttpService} from './abstract-http-service';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {AccountState} from '../models/account-state';
import * as _ from 'lodash';

@Injectable({
  providedIn: 'root'
})
export class AccountStateService extends AbstractHttpService{

  constructor(private http: HttpClient) {
    super();
  }

  getAccountStates(): Observable<AccountState[]> {
    return this.http.get<AccountState[]>(this.baseUrl + '/estados').pipe(
      map(res => _.map(res, function(item) {
        return new AccountState(item);
      })));
  }
}
