export interface IPollutionReadings {
  id?: number;
  air?: number;
  sound?: number;
  sensingNodeId?: number;
}

export class PollutionReadings implements IPollutionReadings {
  constructor(public id?: number, public air?: number, public sound?: number, public sensingNodeId?: number) {}
}
