import {CanActivate} from '@angular/router';

export class AuthGuard implements CanActivate {

  constructor() {
  }

  canActivate() {
    return true;
  }
}
