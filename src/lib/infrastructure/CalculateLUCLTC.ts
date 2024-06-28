import LTC from "../domain/Models/Equations/LTC";
import LUC from "../domain/Models/Equations/LUC";

export default class CalculateLUCLTC {
  CalculateLUC(S: number, K: number, LT: number, Values: number[]): LUC[] {
    let LUCs: LUC[] = [];
    let PeriodString: string = '1';
    let unitString: string = Values[0].toString();
    let units: number = 0;
    let k: number = 0;
    let totalCost:number=S;
    let period:number=0;
    for (let i = 0; i < Values.length; i++) {
     
      units += Values[i];
      k= period===0 ? 0: Values[i]*(period)*K;
 
    
      totalCost=period===0 ? S : totalCost+k;
      period++;
      LUCs.push(new LUC(PeriodString, unitString, units, S, k,totalCost,totalCost/units));
      
      if ((i+1) % 5 === 0 || (i+1)===Values.length) {
        console.log("prueba",i)
        k = 0;
        LUCs[i].Delete=true;
        PeriodString="";
        period=0;
        unitString="";
        units=0;
      }
      
  
      PeriodString += PeriodString==="" ? `${period+1}`: `+${(period)+1}`;
      unitString += unitString===''? `${Values[i+1]}` : `+${Values[i+1]}`;
      
      
    }

    return LUCs;
  }

  CalculateLTC(S: number, K: number, Values: number[]): LTC[] {
    let LTCs: LTC[] = [];

    let period: number = 0;
    for (let i = 0; i < Values.length; i++) {
      let cm: number = Values[i] * period * K;

      let ltc = new LTC(
        period + 1,
        Values[i],
        period,
        cm,
        LTCs.length == 0
          ? 0
          : LTCs[i - 1].Delete == true
          ? 0
          : Number((LTCs[i - 1].CumulativeMaintenanceCost + cm).toFixed(3))
      );
      LTCs.push(ltc);
      period++;
      if (LTCs[i].CumulativeMaintenanceCost > S) {
        period = 0;
        LTCs[i].Delete = true;
      }
    }

    return LTCs;
  }
}
