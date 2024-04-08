import CMC from '../domain/CMC';
import CalculateCMC from '../infrastructure/CalculateCMC';

class CMCService {
    setvalues(Hours, MTBF, DurationTask, CostHourWork, Spares, OperatingCosts, LogisticDelay, UnitCosts, CostFailure){
        this.cmc.Hours = Hours;
        this.cmc.MTBF = MTBF;
        this.cmc.DurationTask = DurationTask;
        this.cmc.CostHourWork = CostHourWork;
        this.cmc.Spares = Spares;
        this.cmc.OperatingCosts = OperatingCosts;
        this.cmc.LogisticDelay = LogisticDelay;
        this.cmc.UnitCosts = UnitCosts;
        this.cmc.CostFailure = CostFailure;
    }

    calculateCMC(Hours, MTBF, DurationTask, CostHourWork, Spares, OperatingCosts, LogisticDelay, UnitCosts, CostFailure){
        const cmc = new CMC(Hours, MTBF, DurationTask, CostHourWork, Spares, OperatingCosts, LogisticDelay, UnitCosts, CostFailure);
        const calculator = new CalculateCMC(cmc);
        return calculator.calculateCorrectiveMaintenance(Hours, MTBF, DurationTask, CostHourWork, Spares, OperatingCosts, LogisticDelay, UnitCosts, CostFailure);
    }

    calculateMTBF(percentage, value){
        const cmc = new CMC(percentage, value);
        const calculator = new CalculateCMC(cmc);
        return calculator.calculateMTBF(percentage, value);
    }

    calculateNF(Hours, MTBF){
        const cmc = new CMC(Hours, MTBF);
        const calculator = new CalculateCMC(cmc);
        return calculator.calculateNF(Hours, MTBF);
    }

    calculateCT(DurationTask, CostHourWork, Spares, OperatingCosts, LogisticDelay){
        const cmc = new CMC(DurationTask, CostHourWork, Spares, OperatingCosts, LogisticDelay);
        const calculator = new CalculateCMC(cmc);
        return calculator.calculateCT(DurationTask, CostHourWork, Spares, OperatingCosts, LogisticDelay);
    }

    calculateCF(DurationTask, UnitCosts, CostFailure){
        const cmc = new CMC(DurationTask, UnitCosts, CostFailure);
        const calculator = new CalculateCMC(cmc);
        return calculator.calculateCF(DurationTask, UnitCosts, CostFailure);
    }

}

export default CMCService;