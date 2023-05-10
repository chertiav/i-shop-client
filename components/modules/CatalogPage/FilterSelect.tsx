/* eslint-disable indent */
import { useEffect, useState } from 'react';
import Select from 'react-select';
import { useStore } from 'effector-react';
//================================================
import { createSelectOption } from '@/utils/common';
import { categoriesOptions } from '@/utils/selectContents';
import { IOption, SelectOptionType } from '@/types/common';
import { $mode } from '@/context/mode';
import { optionStyles } from '@/styles/searchInput';
import {
	selectStyles,
	controlStyles,
	menuStyles,
} from '@/styles/catalog/select';
import {
	$boilerParts,
	setBoilerPartsCheapFirst,
	setBoilerPartsExpensiveFirst,
	setBoilerPartsPopularity,
} from '@/context/boilerParts';
import { useRouter } from 'next/router';

const FilterSelect = ({
	setSpinner,
}: {
	setSpinner: (arg0: boolean) => void;
}) => {
	const mode = useStore($mode);
	const boilerParts = useStore($boilerParts);
	const [categoryOption, setCategoryOption] = useState<SelectOptionType>(null);
	const router = useRouter();

	useEffect(() => {
		if (boilerParts.rows) {
			switch (router.query.first) {
				case 'cheap': {
					updateCategoryOption('Сначала дешевые');
					setBoilerPartsCheapFirst();
					break;
				}
				case 'expensive': {
					updateCategoryOption('Сначала дорогие');
					setBoilerPartsExpensiveFirst();
					break;
				}
				case 'popular': {
					updateCategoryOption('По популярности');
					setBoilerPartsPopularity();
					break;
				}
				default:
					updateCategoryOption('Сначала дешевые');
					setBoilerPartsCheapFirst();
					break;
			}
		}
	}, [boilerParts.rows, router.query.first]);

	const updateCategoryOption = (value: string) => {
		return setCategoryOption({ value, label: value });
	};

	const updateRouteParam = (first: string) => {
		return router.push(
			{
				query: {
					...router.query,
					first,
				},
			},
			undefined,
			{ shallow: true }
		);
	};

	const handleSortOptionChange = (selectedOption: SelectOptionType) => {
		setSpinner(true);
		setCategoryOption(selectedOption);
		switch ((selectedOption as IOption).value) {
			case 'Сначала дешевые': {
				setBoilerPartsCheapFirst();
				updateRouteParam('cheap');
				break;
			}
			case 'Сначала дорогие': {
				setBoilerPartsExpensiveFirst();
				updateRouteParam('expensive');
				break;
			}
			case 'По популярности': {
				setBoilerPartsPopularity();
				updateRouteParam('popular');
				break;
			}
		}
		setTimeout(() => {
			return setSpinner(false);
		}, 1000);
	};

	return (
		<Select
			placeholder={'Я ищу...'}
			value={categoryOption || createSelectOption('Сначала дешевые')}
			onChange={handleSortOptionChange}
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
