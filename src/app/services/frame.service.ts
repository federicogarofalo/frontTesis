import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {AbstractHttpService} from './abstract-http-service';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {Frame} from '../models/frame';
import * as _ from 'lodash';

@Injectable({
  providedIn: 'root'
})
export class FrameService extends AbstractHttpService {

  constructor(private http: HttpClient) {
    super();
  }

  getNodesPower(): Observable<Object> {
    return this.http.get(this.baseUrl + '/potenciasNodos').pipe(map(res => _.map(res, function(item) {
      return new Frame(item);
    })));
  }

  getLastPowerMeasurementByNode(): Observable<Object> {
    return this.http.get(this.baseUrl + '/ultimasPotenciasPorNodos').pipe(map(res => _.map(res, function(item) {
      return new Frame(item);
    })));
  }
}
