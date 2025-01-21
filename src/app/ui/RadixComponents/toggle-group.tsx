import * as ToggleGroup from '@radix-ui/react-toggle-group';
import React from 'react';

interface ToggleGroupProps {
    value: string,
    onChange: (value: string) => void;
}

const Toggle: React.FC <ToggleGroupProps> = ({ value, onChange }) => {
    return (
        <ToggleGroup.Root defaultValue={value} onValueChange={onChange} type='single' className='w-full bg-white border-[0.5px] border-black rounded-sm text-center inline-flex'>
		    <ToggleGroup.Item value='Monthly' 
                className={`flex-1 p-3 ${value === 'Monthly' ? 'bg-[#E8E8E8] rounded-r-md rounded-l-sm': ''}`}
                >Monthly
                </ToggleGroup.Item>
            <ToggleGroup.Item value='Annually' 
                className={`flex-1 p-3 ${value === 'Annually' ? 'bg-[#E8E8E8] rounded-l-md rounded-r-sm': ''}`}
                >Annually
            </ToggleGroup.Item>
	    </ToggleGroup.Root>
    )
};

export default Toggle;