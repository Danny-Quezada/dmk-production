class CalculateCMC{

    


    constructor(cmc){
        this.cmc = cmc;
    }

    calculateMTBF(percentage, value){
        return (percentage / 100) * value;
    }

    calculateCorrectiveMaintenance(Hours, MTBF, DurationTask, CostHourWork, Spares, OperatingCosts, LogisticDelay, UnitCosts, CostFailure){
        this.cmc.Hours = Hours;
        this.cmc.MTBF = MTBF;
        this.cmc.DurationTask = DurationTask;
        this.cmc.CostHourWork = CostHourWork;
        this.cmc.Spares = Spares;
        this.cmc.OperatingCosts = OperatingCosts;
        this.cmc.LogisticDelay = LogisticDelay;
        this.cmc.UnitCosts = UnitCosts;
        this.cmc.CostFailure = CostFailure; 
        return this.cmc.calculateCMC();
    }

    calculateNF(Hours, MTBF){
        return Number(Hours) / Number(MTBF);
    }

    calculateCT(DurationTask, CostHourWork, Spares, OperatingCosts, LogisticDelay){
        return (Number(DurationTask) * Number(CostHourWork) + Number(Spares) + Number(OperatingCosts) + Number(LogisticDelay));
    }

    calculateCF(DurationTask, UnitCosts, CostFailure){
        return (Number(DurationTask) * Number(UnitCosts) + Number(CostFailure));
    }
}

export default CalculateCMC;