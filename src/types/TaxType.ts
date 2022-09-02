import TaxCategoryType from "./TaxCategoryType";

interface TaxType {
    uid: string,
    category: TaxCategoryType,
    previousMonthReading: number | null,
    currentMonthReading: number | null,
    finalPrice: number,
}

export default TaxType;
