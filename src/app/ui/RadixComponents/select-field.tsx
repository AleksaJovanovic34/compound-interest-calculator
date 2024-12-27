'use client'

import * as Select from '@radix-ui/react-select';
import { ChevronDownIcon } from '@radix-ui/react-icons';
import React from 'react';

interface SelectfieldProps {
    value: string,
    onChange: (value: string) => void;
}

const SelectField: React.FC <SelectfieldProps> = ({ value, onChange }) => {
    return (
        <Select.Root value={value} onValueChange={onChange}>

		<Select.Trigger className='w-full flex items-center justify-between p-3 border-[0.5px] border-black rounded-sm bg-white focus:border-[#9A5CD0] focus:border'>
			<Select.Value>{value}</Select.Value>
			<ChevronDownIcon className='text-[#9A5CD0]'></ChevronDownIcon>
		</Select.Trigger>

		<Select.Portal>
			<Select.Content className='bg-white border-[0.5px] border-black' 
			side='bottom' avoidCollisions={true}>

				<Select.Viewport>
					<Select.Group>
						<Select.Item value='Daily' className='p-3 hover:bg-purple-100 flex items-center focus:outline-none'>
							<Select.ItemText>Daily</Select.ItemText>
						</Select.Item>
						<Select.Item value='Monthly' className='p-3 hover:bg-purple-100 flex items-center focus:outline-none'>
							<Select.ItemText>Monthly</Select.ItemText>
						</Select.Item>
						<Select.Item value='Annually' className='p-3 hover:bg-purple-100 flex items-center focus:outline-none'>
							<Select.ItemText>Annually</Select.ItemText>
						</Select.Item>
					</Select.Group>


				</Select.Viewport>
			</Select.Content>
		</Select.Portal>
	</Select.Root>
    );
};

export default SelectField;
