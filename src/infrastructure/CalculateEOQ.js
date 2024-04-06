// import EOQ from '../../domain/entities/EOQ';

class CalculateEOQ {
    constructor(eoq) {
        this.eoq = eoq;
    }

    calculate(demand, frequency) {
        const annualDemand = this.convertToAnnualDemand(demand, frequency);
        this.eoq.demand = annualDemand;
        return this.eoq.calculateEOQ(); 
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

export default CalculateEOQ;