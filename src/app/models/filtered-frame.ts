import {VariableData} from './variable-data';

export class FilteredFrame {
  variableName: string;
  data: VariableData[];

  constructor(params) {
    this.variableName = params.variableName;
    this.data = params.data;
  }
}
