import { Injectable } from '@angular/core';
import {AbstractHttpService} from './abstract-http-service';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {Threshold} from '../models/threshold';
import * as _ from 'lodash';

@Injectable({
  providedIn: 'root'
})
export class ThresholdService extends AbstractHttpService {

  constructor(private http: HttpClient) {
    super();
  }

  getThresholds(): Observable<Threshold[]> {
    return this.http.get<Threshold[]>(this.baseUrl + '/umbrales').pipe(
      map(res => _.map(res, function(item) {
        return new Threshold(item);
      })));
  }

  updateThreshold(threshold: Threshold): Observable<Threshold> {
    return this.http.put<Threshold>(this.baseUrl + '/umbral', threshold);
  }
}
