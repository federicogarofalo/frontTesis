import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {AbstractHttpService} from './abstract-http-service';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {NodeHistory} from '../models/node-history';
import * as _ from 'lodash';

@Injectable({
  providedIn: 'root'
})
export class NodeHistoryService extends AbstractHttpService {

  constructor(private http: HttpClient) {
    super();
  }

  getNodesHistory(): Observable<NodeHistory[]> {
    return this.http.get<NodeHistory[]>(this.baseUrl + '/nodos').pipe(
      map(res => _.map(res, function(item) {
        return new NodeHistory(item);
      })));
  }
}
