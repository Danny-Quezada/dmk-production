export default class ZEROINVENTORY {
  constructor(
    DiasLaborados: number,
    Demanda: number,
    UnidadesOperario: number,
    OperariosRequeridos: number,
    OperariosActuales: number,
    OperariosContratados: number,
    OperariosDespedidos: number,
    OperariosUtilizados: number,
    UnidadesProducidas: number,
    CostoPorContratar: number,
    CostoPorDespedir: number,
    CostoManoObra: number,

  ) {
    this.DiasLaborados = DiasLaborados;
    this.Demanda = Demanda;
    this.UnidadesOperario = UnidadesOperario;
    this.OperariosRequeridos = OperariosRequeridos;
    this.OperariosActuales = OperariosActuales;
    this.OperariosContratados = OperariosContratados;
    this.OperariosDespedidos = OperariosDespedidos;
    this.OperariosUtilizados = OperariosUtilizados;
    this.UnidadesProducidas = UnidadesProducidas;
    this.CostoPorContratar = CostoPorContratar;
    this.CostoPorDespedir = CostoPorDespedir;
    this.CostoManoObra = CostoManoObra;
    this.CostoTotal = CostoPorContratar+CostoManoObra+CostoPorDespedir;
  }
  DiasLaborados: number;
  Demanda: number;
  UnidadesOperario: number;
  OperariosRequeridos: number;
  OperariosActuales: number;
  OperariosContratados: number;
  OperariosDespedidos: number;
  OperariosUtilizados: number;
  UnidadesProducidas: number;

  CostoPorContratar: number=0;
  CostoPorDespedir: number=0;
  CostoManoObra: number;
  CostoTotal: number=0;
}
