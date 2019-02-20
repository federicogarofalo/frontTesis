import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {AbstractHttpService} from './abstract-http-service';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {Frame} from '../models/frame';
import * as _ from 'lodash';
import {FilteredFrame} from '../models/filtered-frame';
import {Node} from '../models/node';

@Injectable({
  providedIn: 'root'
})
export class FrameService extends AbstractHttpService {

  constructor(private http: HttpClient) {
    super();
  }

  getNodesPower(): Observable<Frame[]> {
    return this.http.get<Frame[]>(this.baseUrl + '/potenciasNodos').pipe(
      map(res => _.map(res, function(item) {
        return new Frame(item);
    })));
  }

  getLastPowerMeasurementByNode(): Observable<Frame[]> {
    return this.http.get<Frame[]>(this.baseUrl + '/ultimasPotenciasPorNodos').pipe(
      map(res => _.map(res, function(item) {
        return new Frame(item);
    })));
  }

  getFilteredData(variableName: string, dateFrom: string, dateTo: string, node: Node, hourFrom?: string, hourTo?: string) {
    let params = new HttpParams();
    params = params.set('nombreVariable', String(variableName));
    params = params.set('fechaDesde', String(dateFrom));
    params = params.set('fechaHasta', String(dateTo));
    params = params.set('idNodo', String(node.id));
    if (hourFrom) {
      params = params.set('horaDesde', String(hourFrom));
    }
    if (hourTo) {
      params = params.set('horaHasta', String(hourTo));
    }
    return this.http.get(this.baseUrl + '/getTramaFiltrada', { params: params }).pipe(
      map(res => _.map(res, function(item) {
        return new FilteredFrame(item);
      })));
  }

  getLastFramesByNode(node: Node) {
    return this.http.get(this.baseUrl + '/ultimasNTramasPorNodos/' + node.id).pipe(
      map(res => _.map(res, function(item) {
        return new Frame(item);
      })));
  }
}
