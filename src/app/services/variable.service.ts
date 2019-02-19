import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class VariableService {

  constructor() { }

  getHumanRedableName(name: string) {
    name = name.replace('_', ' ');
    return name.charAt(0).toUpperCase() + name.slice(1);
  }
}
