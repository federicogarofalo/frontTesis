import {Injectable} from '@angular/core';
import {AbstractHttpService} from './abstract-http-service';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class NotificationService extends AbstractHttpService {

  constructor(private http: HttpClient) {
    super();
  }
}
