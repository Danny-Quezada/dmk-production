
class EOQ{
    constructor(demand, setupCost, holdingCost){
        this.demand = demand;
        this.setupCost = setupCost;
        this.holdingCost = holdingCost;
    }

    calculateEOQ(){
        return Math.round(Math.sqrt((2 * this.demand * this.setupCost) / this.holdingCost));
    }
}

export default EOQ;