import TaxType from "./TaxType";

interface MonthlyTaxesType {
    id?: number,
    date: string,
    taxes: TaxType[],
    otherTaxesAmount: number | null,
    totalTaxesPrice: number,
    totalTaxesPerPersonPrice: number,
}

export default MonthlyTaxesType;
