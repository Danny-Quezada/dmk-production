class CS{
    constructor(demand, safetyStock, quantityOrdered, reviewCycle){
        this.demand = demand;
        this.safetyStock = safetyStock;
        this.quantityOrdered = quantityOrdered;
        this.reviewCycle = reviewCycle;
    }

    calculateFixedCost(){
        return (this.quantityOrdered / 2) + Number(this.safetyStock);
    }

    calculateAverageCost(){
        return ((this.reviewCycle * this.demand) / 2) + Number(this.safetyStock);
    }
}

export default CS;  