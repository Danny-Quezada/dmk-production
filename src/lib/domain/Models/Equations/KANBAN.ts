export default class KANBAN {

  constructor(
    Nombre: string,
    Demanda: number,
    TiempoEntrega: number,
    StockSeguridad: number,
    AlmacenajePorcentual: number
  ) {
    this.Nombre = Nombre;
    this.Demanda = Demanda;
    this.TiempoEntrega = TiempoEntrega;
    this.StockSeguridad = StockSeguridad;
    this.AlmacenajePorcentual = AlmacenajePorcentual;

    let AU: number=Number((AlmacenajePorcentual*Demanda));
 
  
      AU=Math.round(AU);

  
    this.AlmacenajeUnidad=AU;

    this.UnidadKanban=Number(Math.round((Demanda*TiempoEntrega)*(1+StockSeguridad)/this.AlmacenajeUnidad))
  }
  Nombre: string;
  Demanda: number;
  TiempoEntrega: number;
  StockSeguridad: number;
  AlmacenajePorcentual: number;
  AlmacenajeUnidad: number = 0;
  UnidadKanban: number = 0;
}
