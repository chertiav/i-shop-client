import { useState } from 'react';
import { useStore } from 'effector-react';
import Select from 'react-select';
//==========================================================
import {
	controlStyles,
	inputStyles,
	menuStyles,
	optionStyles,
} from '@/styles/searchInput';
import { SelectOptionType } from '@/types/common';
import { $mode } from '@/context/mode';

const SearchInput = () => {
	const mode = useStore($mode);
	const [searchOption, setSearchOption] = useState<SelectOptionType>(null);

	const handleSearchOptionChange = (selectedOption: SelectOptionType) => {
		setSearchOption(selectedOption);
	};

	return (
		<Select
			placeholder={'Я ищу...'}
			value={searchOption}
			onChange={handleSearchOptionChange}
			styles={{
				...inputStyles,
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
			isClearable={true}
			openMenuOnClick={false}
			options={[1, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15].map((item) => {
				return {
					value: item,
					label: item,
				};
			})}
		/>
	);
};

export default SearchInput;
