import TaxType from "../types/TaxType";
import TaxCategoryType from "../types/TaxCategoryType";

class TaxModel implements TaxType {
    uid: string;
    category: TaxCategoryType;
    previousMonthReading: number | null;
    currentMonthReading: number | null;
    finalPrice: number;

    constructor({
        uid,
        category,
        previousMonthReading,
        currentMonthReading,
        finalPrice,
    }: TaxType) {
        this.uid = uid;
        this.category = category;
        this.previousMonthReading = previousMonthReading;
        this.currentMonthReading = currentMonthReading;
        this.finalPrice = finalPrice;
    }
}

export default TaxModel;
