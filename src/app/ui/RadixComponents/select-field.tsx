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

		<Select.Trigger className='w-full flex items-center justify-between p-3 border-[0.5px] rounded-sm border-black bg-white focus:outline-none'>
			<Select.Value>{value}</Select.Value>
			<ChevronDownIcon></ChevronDownIcon>
		</Select.Trigger>

		<Select.Portal>
			<Select.Content className='w-[var(--radix-select-trigger-width)] bg-white border-[0.5px] border-black rounded-b-md p-1 border-t-0'
				position='popper' side='bottom' align='start'>
				<Select.Viewport>
					<Select.Group>
						<Select.Item value='Daily' className='p-3 hover:bg-[#E8E8E8] flex items-center focus:outline-none select-none'>
							<Select.ItemText>Daily</Select.ItemText>
						</Select.Item>
						<Select.Item value='Monthly' className='p-3 hover:bg-[#E8E8E8] flex items-center focus:outline-none select-none'>
							<Select.ItemText>Monthly</Select.ItemText>
						</Select.Item>
						<Select.Item value='Annually' className='p-3 hover:bg-[#E8E8E8] rounded-b-md flex items-center focus:outline-none select-none'>
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
