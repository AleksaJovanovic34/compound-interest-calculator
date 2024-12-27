const validationRules = {
    initialInvestment : {
        required: true,
        min: 1,
        max: 1000000000,
        message: 'Amount must be between 1 and 1,000,000,000'
    },

    years: {
        required: true,
        min: 1,
        max: 50,
        message: 'Number must be between 1 and 50'
    },

    interestRate: {
        required: false,
        min: 0,
        max: 20,
        message: 'Percentage must be between 0 and 20'
    },
    contributionAmount: {
        required: false,
        min: 0, 
        max: 1000000,
        message: 'Amount must be between 0 and 1,000,000'
    }
}

export const validateField = (name: string, value: string): string => {
    const rules = validationRules[name as keyof typeof validationRules];
    if (!rules) return '';

    const rawValue = value.replace(/[^0-9]/g, "");
    const parsedValue = parseFloat(rawValue) || 0;

    if (rules.required && rawValue.length === 0) return rules.message;
    if (parsedValue < rules.min || parsedValue > rules.max) return rules.message

    return '';
}
