import { Injectable } from '@angular/core';
import { ToastrManager } from 'ng6-toastr-notifications';
import {Notification} from '../models/notification';
import {VariableService} from './variable.service';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class ToastrService {

  constructor(private toastr: ToastrManager, private variable: VariableService, private authService: AuthService) { }

  showMessage(notification: Notification) {
    const toastrOptions = {
      toastTimeout: 5000,
      dismiss: 'auto'      
    };
    if (this.authService.isAdvanced() ||this.authService.isAdmin()) {
      switch (notification.severity.priority) {
        case 'Critica':
          this.toastr.errorToastr(this.getMessage(notification), 'Error: variable fuera de umbral', toastrOptions);
          break;
        case 'Alta':
          this.toastr.warningToastr(this.getMessage(notification), 'Error: variable fuera de umbral', toastrOptions);
          break;
        case 'Media':
          this.toastr.warningToastr(this.getMessage(notification), 'Error: variable fuera de umbral', toastrOptions);
          break;
        case 'Baja':
          this.toastr.infoToastr(this.getMessage(notification), 'Error: variable fuera de umbral', toastrOptions);
          break;
      }
    } else {
      return;
    }
    
  }

  private getMessage(notification: Notification): string {
    return 'Variable afectada: ' + this.variable.getHumanRedableName(notification.affectedVariable) + ' Nodo: ' +
      notification.node.module + ' ' + notification.node.number + ' Criticidad: ' + notification.severity.priority;
  }
}
