import { Injectable } from '@angular/core';
import { ToastrManager } from 'ng6-toastr-notifications';
import {Notification} from '../models/notification';

@Injectable({
  providedIn: 'root'
})
export class ToastrService {

  constructor(private toastr: ToastrManager) { }

  showMessage(notification: Notification) {
    switch (notification.severity.priority) {
      case 'Critica':
        this.toastr.errorToastr(this.getMessage(notification), 'Error');
        break;
      case 'Alta':
        this.toastr.warningToastr(this.getMessage(notification), 'Error');
        break;
      case 'Media':
        this.toastr.warningToastr(this.getMessage(notification), 'Error');
        break;
      case 'Baja':
        this.toastr.infoToastr(this.getMessage(notification), 'Error');
        break;
    }
  }

  private getMessage(notification: Notification): string {
    return notification.description + ' ' + notification.affectedVariable + ' Affected Node: ' +
      notification.node.module + ' ' + notification.node.number + ' Severity: ' + notification.severity.priority +
      ' Hour: ' + notification.hour;
  }
}
