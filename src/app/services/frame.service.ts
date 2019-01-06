import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {AbstractHttpService} from './abstract-http-service';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FrameService extends AbstractHttpService {

  constructor(private http: HttpClient) {
    super();
  }

  getNodesPower(): Observable<Object> {
    return this.http.get(this.baseUrl + '/potenciasNodos');
  }

  getLastPowerMeasurementByNode(): Observable<Object> {
    return this.http.get(this.baseUrl + '/ultimasPotenciasPorNodos');
  }
}
