import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
//=================================================
import { useMediaQuery } from '@/hooks/useMediaQuery';
import CatalogFiltersDesktop from '@/components/modules/CatalogPage/CatalogFiltersDesktop';
import { ICatalogFiltersProps, IFilterCheckboxItem } from '@/types/catalog';
import { useStore } from 'effector-react';
import {
	$boilerManufacturers,
	$partsManufactures,
	setBoilerManufacturersFromQuery,
	setFilteredBoilerParts,
	setPartsManufacturersFromQuery,
} from '@/context/boilerParts';
import { useRouter } from 'next/router';
import { getBoilerPartsFx } from '@/app/api/boilerParts';
import { getQueryParamOnFirstRender } from '@/utils/common';

const CatalogFilters = ({
	priceRange,
	setPriceRange,
	setIsPriceRangeChanged,
	resetFilterBtnDisabled,
	resetFilters,
	isPriceRangeChanged,
	currentPage,
	setIsFilterInQuery,
}: ICatalogFiltersProps) => {
	const isMobile820 = useMediaQuery(820);
	const [spinner, setSpinner] = useState(false);
	const boilerManufacturers = useStore($boilerManufacturers);
	const partsManufacturers = useStore($partsManufactures);
	const router = useRouter();

	const getItemManufacturers = (itemsManufacturers: IFilterCheckboxItem[]) => {
		return itemsManufacturers
			.filter((item) => {
				return item.checked;
			})
			.map((item) => {
				return item.title;
			});
	};

	useEffect(() => {
		applyFiltersFromQuery();
	}, []);

	const applyFiltersFromQuery = async () => {
		try {
			const priceFromQueryValue = getQueryParamOnFirstRender(
				'priceFrom',
				router
			);
			const priceToQueryValue = getQueryParamOnFirstRender('priceTo', router);
			const boilerQueryValue = JSON.parse(
				decodeURIComponent(
					getQueryParamOnFirstRender('boiler', router) as string
				)
			);
			const partsQueryValue = JSON.parse(
				decodeURIComponent(
					getQueryParamOnFirstRender('parts', router) as string
				)
			);
			const isValidBoilerQuery =
				Array.isArray(boilerQueryValue) && !!boilerQueryValue?.length;
			const isValidPartsQuery =
				Array.isArray(partsQueryValue) && !!partsQueryValue?.length;

			const boilerQuery = `&boiler=${getQueryParamOnFirstRender(
				'boiler',
				router
			)}`;
			const partsQuery = `&parts=${getQueryParamOnFirstRender(
				'parts',
				router
			)}`;
			const priceQuery = `&priceFrom=${priceFromQueryValue}&priceTo=${priceToQueryValue}`;
			if (
				isValidBoilerQuery &&
				isValidPartsQuery &&
				priceFromQueryValue &&
				priceToQueryValue
			) {
				updateParamsAndFiltersFromQuery(() => {
					updatePriceFromQuery(+priceFromQueryValue, +priceToQueryValue);
					setBoilerManufacturersFromQuery(boilerQueryValue);
					setPartsManufacturersFromQuery(partsQueryValue);
				}, `${currentPage}${priceQuery}${boilerQuery}${partsQuery}`);
				return;
			}
			if (priceFromQueryValue && priceToQueryValue) {
				updateParamsAndFiltersFromQuery(() => {
					updatePriceFromQuery(+priceFromQueryValue, +priceToQueryValue);
				}, `${currentPage}${priceQuery}`);
			}
			if (isValidBoilerQuery && isValidPartsQuery) {
				updateParamsAndFiltersFromQuery(() => {
					setIsFilterInQuery(true);
					setBoilerManufacturersFromQuery(boilerQueryValue);
					setPartsManufacturersFromQuery(partsQueryValue);
				}, `${currentPage}${boilerQuery}${partsQuery}`);
				return;
			}
			if (isValidBoilerQuery) {
				updateParamsAndFiltersFromQuery(() => {
					setIsFilterInQuery(true);
					setBoilerManufacturersFromQuery(boilerQueryValue);
				}, `${currentPage}${boilerQuery}`);
			}
			if (isValidPartsQuery) {
				updateParamsAndFiltersFromQuery(() => {
					setIsFilterInQuery(true);
					setPartsManufacturersFromQuery(partsQueryValue);
				}, `${currentPage}${partsQuery}`);
			}
			if (isValidPartsQuery && priceFromQueryValue && priceToQueryValue) {
				updateParamsAndFiltersFromQuery(() => {
					updatePriceFromQuery(+priceFromQueryValue, +priceToQueryValue);
					setPartsManufacturersFromQuery(partsQueryValue);
				}, `${currentPage}${priceQuery}${partsQuery}`);
			}
			if (isValidBoilerQuery && priceFromQueryValue && priceToQueryValue) {
				updateParamsAndFiltersFromQuery(() => {
					updatePriceFromQuery(+priceFromQueryValue, +priceToQueryValue);
					setBoilerManufacturersFromQuery(boilerQueryValue);
				}, `${currentPage}${priceQuery}${boilerQuery}`);
			}
		} catch (e) {
			toast.error((e as Error).message);
		}
	};

	const updatePriceFromQuery = (priceFrom: number, priceTo: number) => {
		setIsFilterInQuery(true);
		setPriceRange([+priceFrom, +priceTo]);
		setIsPriceRangeChanged(true);
	};

	const updateParamsAndFiltersFromQuery = async (
		callback: VoidFunction,
		path: string
	) => {
		callback();
		const data = await getBoilerPartsFx(
			`/boiler-parts?limit=20&offset=${path}`
		);
		setFilteredBoilerParts(data);
	};

	async function updateParamsAndFilters<T>(updatedParams: T, path: string) {
		const params = router.query;

		delete params.boiler;
		delete params.parts;
		delete params.priceFrom;
		delete params.priceTo;

		router.push(
			{
				query: {
					...params,
					...updatedParams,
				},
			},
			undefined,
			{ shallow: true }
		);
		const data = await getBoilerPartsFx(
			`/boiler-parts?limit=20&offset=${path}`
		);
		setFilteredBoilerParts(data);
	}
	const applyFilters = async () => {
		setIsFilterInQuery(true);
		try {
			setSpinner(true);
			const priceFrom = Math.ceil(priceRange[0]);
			const priceTo = Math.ceil(priceRange[1]);
			const priceQuery = isPriceRangeChanged
				? `&priceFrom=${priceFrom}&priceTo=${priceTo}`
				: '';
			const boilers = getItemManufacturers(boilerManufacturers);
			const parts = getItemManufacturers(partsManufacturers);
			const encodeBoilersQuery = encodeURIComponent(JSON.stringify(boilers));
			const encodePartsQuery = encodeURIComponent(JSON.stringify(parts));
			const boilerQuery = `&boiler=${encodeBoilersQuery}`;
			const partsQuery = `&parts=${encodePartsQuery}`;
			const initialPage = currentPage > 0 ? 0 : currentPage;

			if (boilers.length && parts.length && isPriceRangeChanged) {
				updateParamsAndFilters(
					{
						boiler: encodeBoilersQuery,
						parts: encodePartsQuery,
						priceFrom,
						priceTo,
						offset: initialPage + 1,
					},
					`${initialPage}${priceQuery}${boilerQuery}${partsQuery}`
				);
				return;
			}

			if (isPriceRangeChanged) {
				updateParamsAndFilters(
					{
						priceFrom,
						priceTo,
						offset: initialPage + 1,
					},
					`${initialPage}${priceQuery}`
				);
			}

			if (boilers.length && parts.length) {
				updateParamsAndFilters(
					{
						boiler: encodeBoilersQuery,
						parts: encodePartsQuery,
						offset: initialPage + 1,
					},
					`${initialPage}${boilerQuery}${partsQuery}`
				);
				return;
			}
			if (boilers.length) {
				updateParamsAndFilters(
					{
						boiler: encodeBoilersQuery,
						offset: initialPage + 1,
					},
					`${initialPage}${boilerQuery}`
				);
			}
			if (parts.length) {
				updateParamsAndFilters(
					{
						parts: encodePartsQuery,
						offset: initialPage + 1,
					},
					`${initialPage}${partsQuery}`
				);
			}

			if (boilers.length && isPriceRangeChanged) {
				updateParamsAndFilters(
					{
						boiler: encodeBoilersQuery,
						priceFrom,
						priceTo,
						offset: initialPage + 1,
					},
					`${initialPage}${boilerQuery}${priceQuery}`
				);
			}

			if (parts.length && isPriceRangeChanged) {
				updateParamsAndFilters(
					{
						parts: encodePartsQuery,
						priceFrom,
						priceTo,
						offset: initialPage + 1,
					},
					`${initialPage}${partsQuery}${priceQuery}`
				);
			}
		} catch (e) {
			toast.error((e as Error).message);
		} finally {
			setSpinner(false);
		}
	};

	return isMobile820 ? (
		<div />
	) : (
		<CatalogFiltersDesktop
			priceRange={priceRange}
			setPriceRange={setPriceRange}
			setIsPriceRangeChanged={setIsPriceRangeChanged}
			resetFilterBtnDisabled={resetFilterBtnDisabled}
			spinner={spinner}
			resetFilters={resetFilters}
			applyFilters={applyFilters}
		/>
	);
};

export default CatalogFilters;
