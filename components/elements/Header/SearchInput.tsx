import { MutableRefObject, useRef, useState } from 'react';
import { useStore } from 'effector-react';
import Select from 'react-select';
import { useRouter } from 'next/router';
import { toast } from 'react-toastify';
//==========================================================
import { $mode } from '@/context/mode';
import { $searchInputZIndex, setSearchInputZIndex } from '@/context/header';
import { getPartByNameFx, searchPartFx } from '@/app/api/boilerParts';
import SearchSvg from '@/components/elements/SearchSvg/SearchSvg';
import {
	NoOptionsMessage,
	NoOptionsSpinner,
} from '@/components/elements/SelectOptionsMessage';
import {
	createSelectOption,
	removeClassNamesForOverlayAndBody,
	toggleClassNamesForOverlayAndBody,
} from '@/utils/common';
import { useDebounceCallback } from '@/hooks/useDebounceCallback';
import { IOption, SelectOptionType } from '@/types/common';
import { IBoilerPart } from '@/types/boilerparts';
import {
	controlStyles,
	inputStyles,
	menuStyles,
	optionStyles,
} from '@/styles/searchInput';
import styles from '@/styles/header/index.module.scss';

const SearchInput = () => {
	const mode = useStore($mode);
	const zIndex = useStore($searchInputZIndex);
	const darkModeClass = mode === 'dark' ? `${styles.dark_mode}` : '';
	const [searchOption, setSearchOption] = useState<SelectOptionType>(null);
	const [onMenuOpenControlStyles, setOnMenuOpenControlStyles] = useState({});
	const [onMenuOpenContainerStyles, setOnMenuOpenContainerStyles] = useState(
		{}
	);
	const [options, setOptions] = useState([]);
	const [inputValue, setInputValue] = useState('');
	const btnRef = useRef() as MutableRefObject<HTMLButtonElement>;
	const borderRef = useRef() as MutableRefObject<HTMLSpanElement>;
	const delayCallback = useDebounceCallback(1000);
	const spinner = useStore(searchPartFx.pending);
	const router = useRouter();

	const handleSearchOptionChange = (selectedOption: SelectOptionType) => {
		if (!selectedOption) {
			setSearchOption(null);
			return;
		}

		const name = (selectedOption as IOption)?.value as string;
		getPartAndRedirect(name);

		setSearchOption(selectedOption);
		removeClassNamesForOverlayAndBody();
	};

	const onFocusSearch = () => {
		toggleClassNamesForOverlayAndBody('open-search');
		setSearchInputZIndex(100);
	};

	const handleSearchClick = async () => {
		if (!inputValue) {
			return;
		}
		getPartAndRedirect(inputValue);
	};

	const searchPart = async (search: string) => {
		try {
			setInputValue(search);
			const data = await searchPartFx({
				url: '/boiler-parts/search',
				search,
			});
			const names = data
				.map((item: IBoilerPart) => {
					return item.name;
				})
				.map(createSelectOption);
			setOptions(names);
		} catch (e) {
			toast.error((e as Error).message);
		}
	};

	const getPartAndRedirect = async (name: string) => {
		const part = await getPartByNameFx({
			url: '/boiler-parts/name',
			name,
		});

		if (!part.id) {
			toast.warning('Товар не найден');
			return;
		}

		router.push(`catalog/${part.id}`);
	};

	const onSearchInputChange = (text: string) => {
		document.querySelector('.overlay')?.classList.add('open-search');
		document.querySelector('.body')?.classList.add('overflow-hidden');

		delayCallback(() => {
			return searchPart(text);
		});
	};

	const onSearchMenuOpen = () => {
		setOnMenuOpenControlStyles({
			borderBottomLeftRadius: 0,
			border: 'none',
		});
		setOnMenuOpenContainerStyles({
			boxShadow: '0px 2px 8px rgba(0, 0, 0, 0.1)',
		});
		btnRef.current.style.border = 'none';
		btnRef.current.style.borderBottomRightRadius = '0';
		borderRef.current.style.display = 'block';
	};

	const onSearchMenuClose = () => {
		setOnMenuOpenControlStyles({
			borderBottomLeftRadius: 4,
			boxShadow: 'none',
			border: '1px solid #9e9e9e',
		});
		setOnMenuOpenContainerStyles({
			boxShadow: 'none',
		});
		btnRef.current.style.border = '1px solid #9e9e9e';
		btnRef.current.style.borderLeft = 'none';
		btnRef.current.style.borderBottomRightRadius = '4px';
		borderRef.current.style.display = 'none';
	};

	return (
		<>
			<div className={styles.header__search__inner}>
				<Select
					components={{
						NoOptionsMessage: spinner ? NoOptionsSpinner : NoOptionsMessage,
					}}
					placeholder={'Я ищу...'}
					value={searchOption}
					onChange={handleSearchOptionChange}
					styles={{
						...inputStyles,
						container: (defaultStyles) => {
							return {
								...defaultStyles,
								...onMenuOpenContainerStyles,
							};
						},
						control: (defaultStyles) => {
							return {
								...controlStyles(defaultStyles, mode),
								backgroundColor: mode === 'dark' ? '#2d2d2d' : '#ffffff',
								zIndex,
								transition: 'none',
								...onMenuOpenControlStyles,
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
								zIndex,
								marginTop: '-1px',
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
					onFocus={onFocusSearch}
					onMenuOpen={onSearchMenuOpen}
					onMenuClose={onSearchMenuClose}
					onInputChange={onSearchInputChange}
					options={options}
				/>
				<span ref={borderRef} className={styles.header__search__border} />
			</div>
			<button
				className={`${styles.header__search__btn} ${darkModeClass}`}
				ref={btnRef}
				style={{ zIndex }}
				onClick={handleSearchClick}
			>
				<span className={styles.header__search__btn__span}>
					<SearchSvg />
				</span>
			</button>
		</>
	);
};

export default SearchInput;
