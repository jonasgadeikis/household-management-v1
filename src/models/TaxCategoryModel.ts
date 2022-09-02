import TaxCategoryRawType from "../types/TaxCategoryRawType";
import constants from "../constants";
import { generateUid } from "../utils";
import TaxCategoryType from "../types/TaxCategoryType";

class TaxCategoryModel implements TaxCategoryType {
    uid: string;
    id: number;
    name: string;
    identifier: string;
    unit: string;
    unitPrice: number;
    fixedPrice: number;

    constructor({
        id,
        name,
        identifier,
        unit_price_with_vat,
        fixed_price_with_vat,
    }: TaxCategoryRawType) {
        this.uid = generateUid();
        this.id = id;
        this.name = name;
        this.identifier = identifier;
        this.unit = this._getTaxCategoryUnit(identifier);
        this.unitPrice = unit_price_with_vat;
        this.fixedPrice = fixed_price_with_vat;
    }

    _getTaxCategoryUnit(identifier: string): string {
        switch (identifier) {
            case constants.TAX_CATEGORIES.GAS:
            case constants.TAX_CATEGORIES.WATER:
                return 'm<sup>3</sup>';
            case constants.TAX_CATEGORIES.ELECTRICITY:
                return 'kW/h';
            default:
                return '';
        }
    }
}

export default TaxCategoryModel;
