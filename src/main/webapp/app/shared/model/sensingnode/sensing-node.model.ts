import { IMagnetometerReadings } from 'app/shared/model/sensingnode/magnetometer-readings.model';
import { IPollutionReadings } from 'app/shared/model/sensingnode/pollution-readings.model';
import { SensingNodeType } from 'app/shared/model/enumerations/sensing-node-type.model';
import { SensingNodeStatus } from 'app/shared/model/enumerations/sensing-node-status.model';

export interface ISensingNode {
  id?: number;
  sensingNodeType?: SensingNodeType;
  status?: SensingNodeStatus;
  longitude?: number;
  latitude?: number;
  battery?: number;
  magnetometerReadings?: IMagnetometerReadings[];
  pollutionReadings?: IPollutionReadings[];
  needsCalibration?: boolean;
}

export class SensingNode implements ISensingNode {
  constructor(
    public id?: number,
    public sensingNodeType?: SensingNodeType,
    public status?: SensingNodeStatus,
    public longitude?: number,
    public latitude?: number,
    public battery?: number,
    public magnetometerReadings?: IMagnetometerReadings[],
    public pollutionReadings?: IPollutionReadings[],
    public needsCalibration?: boolean
  ) {}
}
