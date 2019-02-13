import {Injectable} from '@angular/core';
import {AbstractHttpService} from './abstract-http-service';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Node} from '../models/node';
import {Severity} from '../models/severity';

@Injectable({
  providedIn: 'root'
})
export class NotificationService extends AbstractHttpService {

  constructor(private http: HttpClient) {
    super();
  }

  getNotificationsByDate(dateFrom, dateTo, node?: Node, severity?: Severity) {
    let params = new HttpParams();
    params = params.set('fechaDesde', String(dateFrom));
    params = params.set('fechaHasta', String(dateTo));
    if (node) {
      params = params.set('idNodo', String(node.id));
    }
    if (severity) {
      params = params.set('criticidad', String(severity.priority));
    }
    return this.http.get(this.baseUrl, { params: params });
  }

  getNotificationsByPeriod(from, to, severity?: Severity) {
    let params = new HttpParams();
    params = params.set('horaDesde', String(from));
    params = params.set('horaHasta', String(to));
    if (severity) {
      params = params.set('prioridadCriticidad', String(severity.priority));
    }
    return this.http.get(this.baseUrl, { params: params });
  }
}
