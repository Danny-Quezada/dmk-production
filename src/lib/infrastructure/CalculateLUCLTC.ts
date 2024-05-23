import LTC from "../domain/Models/Equations/LTC";
import LUC from "../domain/Models/Equations/LUC";

export default class CalculateLUCLTC {
  CalculateLUC(S: number, K: number, LT: number, Values: number[]): LUC[] {
    let LUCs: LUC[] = [];

    LUCs.push(new LUC(1, Values[0], S, 0, S, Values[0] / S));
    // for(let i=1; i<Values.length; i++){
    //     if()
    // }

    return LUCs;
  }

  CalculateLTC(S: number, K: number, Values: number[]): LTC[] {
    let LTCs: LTC[] = [];
  
   
    let period: number = 0;
    for (let i = 0; i < Values.length; i++) {
      
     
      let cm: number =Number( (Values[i] * (period) * K).toFixed(3));
    
      
      let ltc = new LTC(period+1, Values[i], period, cm,LTCs.length==0 ? 0:LTCs[i-1].Delete==true ? 0 : (LTCs[i - 1].CumulativeMaintenanceCost + cm));
      LTCs.push(ltc)
      period++;
      if (LTCs[i].CumulativeMaintenanceCost > S) {
        period = 0;
        LTCs[i].Delete = true;
      }
    }
  
    return LTCs;
  }
}
