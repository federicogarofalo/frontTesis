import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {AbstractHttpService} from './abstract-http-service';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {Severity} from '../models/severity';
import * as _ from 'lodash';

@Injectable({
  providedIn: 'root'
})
export class SeverityService extends AbstractHttpService {

  constructor(private http: HttpClient) {
    super();
  }

  getSeverities(): Observable<Severity[]> {
    return this.http.get<Severity[]>(this.baseUrl + '/criticidades').pipe(
      map(res => _.map(res, function(item) {
        return new Severity(item);
      })));
  }

  updateSeverity(severity: Severity): Observable<Severity> {
    return this.http.put<Severity>(this.baseUrl + '/criticidad', severity);
  }
}
