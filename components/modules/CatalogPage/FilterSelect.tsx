import { useState } from 'react';
import Select from 'react-select';
import { useStore } from 'effector-react';
//================================================
import { createSelectOption } from '@/utils/common';
import { categoriesOptions } from '@/utils/selectContents';
import { SelectOptionType } from '@/types/common';
import { $mode } from '@/context/mode';
import { optionStyles } from '@/styles/searchInput';
import {
	selectStyles,
	controlStyles,
	menuStyles,
} from '@/styles/catalog/select';

const FilterSelect = () => {
	const mode = useStore($mode);
	const [categoryOption, setCategoryOption] = useState<SelectOptionType>(null);

	const handleSearchOptionChange = (selectedOption: SelectOptionType) => {
		setCategoryOption(selectedOption);
	};

	return (
		<Select
			placeholder={'Я ищу...'}
			value={categoryOption || createSelectOption('Сначала дешевые')}
			onChange={handleSearchOptionChange}
			styles={{
				...selectStyles,
				control: (defaultStyles) => {
					return {
						...controlStyles(defaultStyles, mode),
					};
				},
				input: (defaultStyles) => {
					return {
						...defaultStyles,
						color: mode === 'dark' ? '#f2f2f2' : '#222222',
					};
				},
				menu: (defaultStyles) => {
					return {
						...menuStyles(defaultStyles, mode),
					};
				},
				option: (defaultStyles, state) => {
					return {
						...optionStyles(defaultStyles, state, mode),
					};
				},
			}}
			isSearchable={false}
			options={categoriesOptions}
		/>
	);
};
export default FilterSelect;
