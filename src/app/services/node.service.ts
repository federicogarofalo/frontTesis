import { Injectable } from '@angular/core';
import {AbstractHttpService} from './abstract-http-service';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {Node} from '../models/node';
import * as _ from 'lodash';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class NodeService extends AbstractHttpService {

  constructor(private http: HttpClient) {
    super();
  }

  getNodes(): Observable<Node[]> {
    return this.http.get<Node[]>(this.baseUrl + '/nodos').pipe(
      map(res => _.map(res, function(item) {
        return new Node(item);
    })));
  }

  getActiveNodes(): Observable<Node[]> {
    return this.http.get<Node[]>(this.baseUrl + '/nodosActivos').pipe(
      map(res => _.map(res, function(item) {
        return new Node(item);
      })));
  }

  updateNode(node: Node): Observable<Node> {
    return this.http.put<Node>(this.baseUrl + '/nodo', node);
  }

  createNode(node: Node): Observable<Node> {
    return this.http.post<Node>(this.baseUrl + '/nodo', node);
  }
}
