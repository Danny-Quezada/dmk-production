export default class LTC {
  Period: number;
  Units: number;
  MaintainedPeriod: number;
  MaintenanceCost: number;
  CumulativeMaintenanceCost: number;
  Delete: boolean=false;
  PlannedReception:number=0;
  constructor(
    Period: number,
    Units: number,
    MaintainedPeriod: number,
    MaintenanceCost: number,
    CumulativeMaintenanceCost: number
  ) {
    this.Period = Period;
    this.Units = Units;
    this.MaintainedPeriod = MaintainedPeriod;
    this.MaintenanceCost = MaintenanceCost;
    this.CumulativeMaintenanceCost = CumulativeMaintenanceCost;
  }
}
