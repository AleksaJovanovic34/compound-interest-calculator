import { useState } from "react";
import SelectField from "./RadixComponents/select-field";
import Toggle from "./RadixComponents/toggle-group";
import { validateField } from "../utils/validation";


interface InputFormProps {
    inputValues : { initialInvestment: number, years: number, interestRate: number, compoundFrequency: 'Daily' | 'Monthly' | 'Annually', contributionAmount: number, contributionFrequency: 'Monthly' | 'Annually' };
    onValuesChange : ( values: { initialInvestment?: number, years?: number, interestRate?: number, compoundFrequency?: 'Daily' | 'Monthly' | 'Annually', contributionAmount?: number, contributionFrequency?: 'Monthly' | 'Annually' }) => void; 
}

const InputForm: React.FC<InputFormProps> = ({ inputValues, onValuesChange }) => {

    const [errors, setErrors] = useState<{[key: string]: string}>({});

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;

        const error = validateField(name, value);
        setErrors((prev) => ({ ...prev, [name]: error }))


        const rawValue = value.replace(/[^0-9]/g, "");
        const parsedValue = parseFloat(rawValue) || 0;
        onValuesChange({ ...inputValues, [name]: parsedValue });
    };

    const handleSelectChange = (value: 'Daily' | 'Monthly' | 'Annually') => {
        onValuesChange({ ...inputValues, compoundFrequency: value  });
        console.log(value);
    }

    const handleContributionFrequencyChange = (value: 'Monthly' | 'Annually') => {
        onValuesChange({ ...inputValues, contributionFrequency: value })
        console.log(value);
    }


    return (
        <div className="flex justify-center items-center min-h-screen">
            <form className="w-80">
                <div className="m-5 flex flex-col gap-3">
                    {/* Initial Investment */}
                    <div className="w-full flex flex-col">
                        <label htmlFor="initialInvestment" className="text-black mb-1">
                            Initial investment
                        </label>
                        <div className="relative w-full">
                            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-600">$</span>
                            <input
                                type="tel"
                                name="initialInvestment"
                                id="initialInvestment"
                                value={inputValues.initialInvestment.toLocaleString()}
                                onChange={handleInputChange}
                                maxLength={12}
                                className={`w-full border-[0.5px] rounded-sm pl-7 p-3 ${
                                    errors.initialInvestment ? "border-red-500 bg-red-100 focus:outline-red-500" : "border-black"
                                } focus:outline-purple-400`}
                            />
                        </div>
                        {errors.initialInvestment && (
                            <p className="text-red-500 text-sm mt-1">{errors.initialInvestment}</p>
                        )}
                    </div>

                    {/* Years */}
                    <div className="w-full flex flex-col">
                        <label htmlFor="years" className="text-black">
                            Years
                        </label>
                        <div className="relative w-full">
                        <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500">years</span>
                            <input
                                type="tel"
                                name="years"
                                id="years"
                                value={inputValues.years.toString()}
                                onChange={handleInputChange}
                                maxLength={2}
                                className={`w-full border-[0.5px] rounded-sm p-3 ${
                                    errors.years ? "border-red-500 bg-red-100 focus:outline-red-500" : "border-black"
                                } focus:outline-purple-400`}
                            />
                        </div>
                        {errors.years && (
                                <p className="text-red-500 text-sm mt-1">{errors.years}</p>
                            )}
                    </div>

                    {/* Interest Rate */}
                    <div className="w-full flex flex-col">
                        <label htmlFor="interestRate" className="text-black">
                            Interest rate
                        </label>
                        <div className="relative w-full">
                            <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500">%</span>
                            <input
                                type="tel"
                                name="interestRate"
                                id="interestRate"
                                value={inputValues.interestRate.toString()}
                                onChange={handleInputChange}
                                maxLength={2}
                                className={`w-full border-[0.5px] rounded-sm p-3 ${
                                    errors.interestRate ? "border-red-500 bg-red-100 focus:outline-red-500" : "border-black"
                                } focus:outline-purple-400`}
                            />
                        </div>
                        {errors.interestRate && (
                                <p className="text-red-500 text-sm mt-1">{errors.interestRate}</p>
                            )}
                    </div>

                    {/* Compound Frequency */}
                    <div>
                        <label htmlFor="compoundFrequency" className="text-black">
                            Compound frequency
                        </label>
                        <SelectField
                            value={inputValues.compoundFrequency}
                            onChange={(value) => handleSelectChange(value as 'Daily' | 'Monthly' | 'Annually')}
                        />
                    </div>

                    {/* Contribution Amount */}
                    <div className="w-full flex flex-col">
                        <label htmlFor="contributionAmount" className="text-black">
                            Contribution amount
                        </label>
                        <div className="relative w-full">
                            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-600">$</span>
                            <input
                                type="tel"
                                name="contributionAmount"
                                id="contributionAmount"
                                value={inputValues.contributionAmount.toLocaleString()}
                                onChange={handleInputChange}
                                maxLength={9}
                                className={`w-full border-[0.5px] rounded-sm pl-7 p-3 ${
                                    errors.contributionAmount ? "border-red-500 bg-red-100 focus:outline-red-500" : "border-black"
                                } focus:outline-purple-400`}
                            />
                        </div>
                        {errors.contributionAmount && (
                                <p className="text-red-500 text-sm mt-1">{errors.contributionAmount}</p>
                            )}
                    </div>

                    {/* Contribution Frequency */}
                    <div>
                        <label htmlFor="contributionFrequency" className="text-black">
                            Contribution frequency
                        </label>
                        <Toggle
                            value={inputValues.contributionFrequency}
                            onChange={(value) => handleContributionFrequencyChange(value as 'Monthly' | 'Annually')}
                        />
                    </div>
                </div>
            </form>
        </div>
    );
};

export default InputForm;

