export default class LUC {
  
  Units: number;
  S: number;
  K: number;
  TotalCost: number;
  UnitCost: number;
  Delete: boolean=false;
  PlannedReception:number=0;

  PeriodString: string=''
  UnitString: string=''

  constructor(
    PeriodString: string,
    UnitString: string,
    Units: number,
    S: number,
    K: number,
    UnitCost: number,
    TotalCost: number,
    
  ) {
   
    this.Units = Units;
    this.S = S;
    this.K = K;
    this.TotalCost = TotalCost;
    this.UnitCost = UnitCost;
    this.PeriodString=PeriodString;
    this.UnitString=UnitString;
  }
}
