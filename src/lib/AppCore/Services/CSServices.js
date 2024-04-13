import CS from '../../domain/Models/Equations/CS';
import CalculateCS from '../../infrastructure/CalculateCS';

class CSService {
    setValues(safetyStock, quantityOrdered, reviewCycle) {
        this.safetyStock = safetyStock;
        this.quantityOrdered = quantityOrdered;
        this.reviewCycle = reviewCycle;
    }

    calculateFixedCost(quantityOrdered, safetyStock) {
        const cs = new CS(quantityOrdered, safetyStock);
        const calculator = new CalculateCS(cs);
        return calculator.calculateFixedCost(quantityOrdered, safetyStock);
    }

    calculateAverageCost(demand, reviewCycle, safetyStock) {
        const cs = new CS(demand, reviewCycle, safetyStock);
        const calculator = new CalculateCS(cs);
        return calculator.calculateAverageCost(demand, reviewCycle, safetyStock)
    }

    calculateInventoryRotation(demand, averageInventory, frequency) {
        const cs = new CS(demand, averageInventory, frequency);
        const calculator = new CalculateCS(cs);
        return calculator.calculateInventoryRotation(demand, averageInventory, frequency);
    }

    getDemand(demand, frequency) {
        const cs = new CS();
        const calculator = new CalculateCS(cs);
        return calculator.convertToAnnualDemand(demand, frequency);
    }
}

export default CSService;