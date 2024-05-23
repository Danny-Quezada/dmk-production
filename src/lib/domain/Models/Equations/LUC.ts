export default class LUC {
  Period: number;
  Units: number;
  S: number;
  K: number;
  TotalCost: number;
  UnitCost: number;
  Delete: boolean=false;
  PlannedReception:number=0;
  constructor(
    Period: number,
    Units: number,
    S: number,
    K: number,
    TotalCost: number,
    UnitCost: number,
    
  ) {
    this.Period = Period;
    this.Units = Units;
    this.S = S;
    this.K = K;
    this.TotalCost = TotalCost;
    this.UnitCost = UnitCost;
  }
}
