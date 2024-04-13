
class CMC{
    constructor(Hours, MTBF, DurationTask, CostHourWork, Spares, OperatingCosts, LogisticDelay, UnitCosts, CostFailure){
        this.Hours = Hours;
        this.MTBF = MTBF;
        this.DurationTask = DurationTask;
        this.CostHourWork = CostHourWork;
        this.Spares = Spares;
        this.OperatingCosts = OperatingCosts
        this.LogisticDelay = LogisticDelay;
        this.UnitCosts = UnitCosts;
        this.CostFailure = CostFailure;
    }

    calculateCMC(){
        const numberFailures = Math.round(this.Hours / this.MTBF);
        return Math.round(numberFailures * ( (Number(this.DurationTask) * Number(this.CostHourWork) + Number(this.Spares) + Number(this.OperatingCosts) + Number(this.LogisticDelay)) + (Number(this.DurationTask) * Number(this.UnitCosts) + Number(this.CostFailure)))); 
    }
}

export default CMC;