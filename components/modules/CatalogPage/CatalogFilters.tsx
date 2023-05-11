import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
//=================================================
import { useMediaQuery } from '@/hooks/useMediaQuery';
import CatalogFiltersDesktop from '@/components/modules/CatalogPage/CatalogFiltersDesktop';
import { ICatalogFiltersProps } from '@/types/catalog';
import { useStore } from 'effector-react';
import {
	$boilerManufacturers,
	$partsManufactures,
	setBoilerManufacturersFromQuery,
	setPartsManufacturersFromQuery,
} from '@/context/boilerParts';
import { useRouter } from 'next/router';
import { getQueryParamOnFirstRender } from '@/utils/common';
import CatalogFiltersMobile from '@/components/modules/CatalogPage/CatalogFiltersMobile';
import {
	checkQueryParams,
	getItemManufacturers,
	updateParamsAndFilters,
	updateParamsAndFiltersFromQuery,
} from '@/utils/catalog';

const CatalogFilters = ({
	priceRange,
	setPriceRange,
	setIsPriceRangeChanged,
	resetFilterBtnDisabled,
	resetFilters,
	isPriceRangeChanged,
	currentPage,
	setIsFilterInQuery,
	closePopup,
	filterMobileOpen,
}: ICatalogFiltersProps) => {
	const isMobile820 = useMediaQuery(820);
	const [spinner, setSpinner] = useState(false);
	const boilerManufacturers = useStore($boilerManufacturers);
	const partsManufacturers = useStore($partsManufactures);
	const router = useRouter();

	useEffect(() => {
		applyFiltersFromQuery();
	}, []);

	const updatePriceFromQuery = (priceFrom: number, priceTo: number) => {
		setIsFilterInQuery(true);
		setPriceRange([+priceFrom, +priceTo]);
		setIsPriceRangeChanged(true);
	};

	const applyFiltersFromQuery = async () => {
		try {
			const {
				isValidBoilerQuery,
				isValidPartsQuery,
				isValidPriceQuery,
				priceFromQueryValue,
				priceToQueryValue,
				boilerQueryValue,
				partsQueryValue,
			} = checkQueryParams(router);

			const boilerQuery = `&boiler=${getQueryParamOnFirstRender(
				'boiler',
				router
			)}`;
			const partsQuery = `&parts=${getQueryParamOnFirstRender(
				'parts',
				router
			)}`;
			const priceQuery = `&priceFrom=${priceFromQueryValue}&priceTo=${priceToQueryValue}`;
			if (isValidBoilerQuery && isValidPartsQuery && isValidPriceQuery) {
				updateParamsAndFiltersFromQuery(() => {
					updatePriceFromQuery(+priceFromQueryValue, +priceToQueryValue);
					setBoilerManufacturersFromQuery(boilerQueryValue);
					setPartsManufacturersFromQuery(partsQueryValue);
				}, `${currentPage}${priceQuery}${boilerQuery}${partsQuery}`);
				return;
			}
			if (isValidPriceQuery) {
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
			if (isValidPartsQuery && isValidPriceQuery) {
				updateParamsAndFiltersFromQuery(() => {
					updatePriceFromQuery(+priceFromQueryValue, +priceToQueryValue);
					setPartsManufacturersFromQuery(partsQueryValue);
				}, `${currentPage}${priceQuery}${partsQuery}`);
			}
			if (isValidBoilerQuery && isValidPriceQuery) {
				updateParamsAndFiltersFromQuery(() => {
					updatePriceFromQuery(+priceFromQueryValue, +priceToQueryValue);
					setBoilerManufacturersFromQuery(boilerQueryValue);
				}, `${currentPage}${priceQuery}${boilerQuery}`);
			}
		} catch (e) {
			const err = e as Error;
			if (err.message !== 'URI malformed') {
				toast.warning('Неправильный URL для фильтров');
				return;
			}
			toast.warning(err.message);
		}
	};

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
					`${initialPage}${priceQuery}${boilerQuery}${partsQuery}`,
					router
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
					`${initialPage}${priceQuery}`,
					router
				);
			}

			if (boilers.length && parts.length) {
				updateParamsAndFilters(
					{
						boiler: encodeBoilersQuery,
						parts: encodePartsQuery,
						offset: initialPage + 1,
					},
					`${initialPage}${boilerQuery}${partsQuery}`,
					router
				);
				return;
			}
			if (boilers.length) {
				updateParamsAndFilters(
					{
						boiler: encodeBoilersQuery,
						offset: initialPage + 1,
					},
					`${initialPage}${boilerQuery}`,
					router
				);
			}
			if (parts.length) {
				updateParamsAndFilters(
					{
						parts: encodePartsQuery,
						offset: initialPage + 1,
					},
					`${initialPage}${partsQuery}`,
					router
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
					`${initialPage}${boilerQuery}${priceQuery}`,
					router
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
					`${initialPage}${partsQuery}${priceQuery}`,
					router
				);
			}
		} catch (e) {
			toast.error((e as Error).message);
		} finally {
			setSpinner(false);
		}
	};

	return isMobile820 ? (
		<CatalogFiltersMobile
			closePopup={closePopup}
			spinner={spinner}
			applyFilters={applyFilters}
			priceRange={priceRange}
			setIsPriceRangeChanged={setIsPriceRangeChanged}
			setPriceRange={setPriceRange}
			resetFilters={resetFilters}
			resetFilterBtnDisabled={resetFilterBtnDisabled}
			filterMobileOpen={filterMobileOpen}
		/>
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
