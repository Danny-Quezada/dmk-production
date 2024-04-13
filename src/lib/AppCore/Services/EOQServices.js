import EOQ from '../../domain/Models/Equations/EOQ';
import CalculateEOQ from '../../infrastructure/CalculateEOQ';

class EOQService {
    setCosts(setupCost, holdingCost) {
        this.setupCost = setupCost;
        this.holdingCost = holdingCost;
    }

    calculateEOQ(demand, frequency) {
        const eoq = new EOQ(demand, this.setupCost, this.holdingCost);
        const calculator = new CalculateEOQ(eoq);
        return calculator.calculate(demand, frequency);
    }

    getDemand(demand, frequency) {
        const eoq = new EOQ();
        const calculator = new CalculateEOQ(eoq);
        return calculator.convertToAnnualDemand(demand, frequency);
    }
}

export default EOQService;


