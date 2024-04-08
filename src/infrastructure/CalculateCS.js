
class CalculateCS{
    constructor(cs){
        this.cs = cs;
    }

    calculateInventoryRotation(demand, averageInventory, frequency){
        const annualDemand = this.convertToAnnualDemand(demand, frequency);
        return Math.round(annualDemand / Number(averageInventory));
    }

    calculateFixedCost(quantityOrdered, safetyStock){
        this.cs.quantityOrdered = quantityOrdered;
        this.cs.safetyStock = safetyStock;
        return this.cs.calculateFixedCost();
    }

    calculateAverageCost(demand, reviewCycle, safetyStock){
        this.cs.demand = demand;
        this.cs.reviewCycle = reviewCycle;
        this.cs.safetyStock = safetyStock;
        return this.cs.calculateAverageCost()
    }

    convertToAnnualDemand(demand, frequency) {
        switch (frequency) {
            case 'Diaria':
                return demand * 365;
            case 'Semanal':
                return demand * 52;
            case 'Anual':
                return demand;
            default:
                throw new Error('Frecuencia invalida');
        }
    }
}

export default CalculateCS;