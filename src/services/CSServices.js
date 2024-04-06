import CS from '../domain/CS';
import CalculateCS from '../infrastructure/CalculateCS';

class CSService { 
    setValues(safetyStock, quantityOrdered, reviewCycle) {
        this.safetyStock = safetyStock;
        this.quantityOrdered = quantityOrdered;
        this.reviewCycle = reviewCycle;
    }

    calculateFixedCost(quantityOrdered, safetyStock){
        const cs = new CS(quantityOrdered, safetyStock);
        const calculator = new CalculateCS(cs);
        return calculator.calculateFixedCost(quantityOrdered, safetyStock);
    }

    calculateAverageCost(demand, reviewCycle, safetyStock){
        const cs = new CS(demand, reviewCycle, safetyStock);
        const calculator = new CalculateCS(cs);
        return calculator.calculateAverageCost(demand, reviewCycle, safetyStock)
    }

    calculateInventoryRotation(demand, averageInventory, frequency){
        const cs = new CS(demand, averageInventory, frequency);
        const calculator = new CalculateCS(cs);
        return calculator.calculateInventoryRotation(demand, averageInventory, frequency);
    }
}

export default CSService;