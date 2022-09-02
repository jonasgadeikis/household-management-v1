const constants = {
    API_URL: 'http://localhost:3000',
    TAX_CATEGORIES: {
        WATER: 'water',
        GAS: 'gas',
        ELECTRICITY: 'electricity',
        TRASH: 'trash',
        INTERNET: 'internet',
        BANK_SERVICES: 'bank_services',
        OTHER: 'other',
    },
    STATIC_TAX_CATEGORIES: [] as string[],
};

constants.STATIC_TAX_CATEGORIES = [
    constants.TAX_CATEGORIES.TRASH,
    constants.TAX_CATEGORIES.INTERNET,
    constants.TAX_CATEGORIES.BANK_SERVICES,
    constants.TAX_CATEGORIES.OTHER,
];

export default constants;
