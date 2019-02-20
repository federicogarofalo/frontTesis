import {VariableData} from './variable-data';

export class FilteredFrame {
  variableName: string;
  data: VariableData[];

  constructor(params) {
    this.variableName = params.variable;
    this.data = params.valores;
  }
}
