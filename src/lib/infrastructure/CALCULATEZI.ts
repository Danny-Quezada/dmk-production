import ZEROINVENTORY from "../domain/Models/Equations/ZEROINVENTORY";

export default class CALCULATEZI {

    CalculateZI(PPT: number, // Producción promedio por trabajador
    CDTH:number,
        OAI: number, // Operarios actuales iniciales
        CDT: number, // Costo de despedir un trabajador
        CCT: number, // Costo de contratar un trabajador
        DL: number[],
        D: number[]
    ) : ZEROINVENTORY[]{
        let OU:number = 0;
        let zeros: ZEROINVENTORY[]=[];
        for (let i = 0; i < DL.length; i++) {
         
            let UO:number = DL[i] * PPT; //Unidades por operario
            let OR:number = Math.ceil(D[i] / UO); //Operarios requeridos

            console.log(D[i],UO,OR);
            let OA:number = i == 0 ? Number(OAI) : OU //Operarios actuales
            let OC:number = OR > OA ? OR - OA : 0;  //Operarios contratados
            let OD:number = OA > OR ? OA - OR : 0; // Operarios despedidos
            OU =  OA + OC - OD;  // Operarios utilizados

            zeros.push(new ZEROINVENTORY(DL[i],D[i],UO,OR,OA,OC,OD,OU,D[i],OC*CCT,CDT*OD,DL[i]*OU*CDTH))

            
        }

        return zeros;


    }






}