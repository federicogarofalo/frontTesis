import {Injectable} from '@angular/core';
import {AbstractHttpService} from './abstract-http-service';

@Injectable({
  providedIn: 'root'
})
export class NotificationService extends AbstractHttpService {

  constructor() {
    super();
  }
}
