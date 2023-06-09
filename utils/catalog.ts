import { NextRouter } from 'next/router';
//=======================================================
import { getBoilerPartsFx } from '@/app/api/boilerParts';
import { updateCartItemFx } from '@/app/api/shopping-cart';
import { updateCartItemTotalPrice } from '@/context/shoping-cart';
import { setFilteredBoilerParts } from '@/context/boilerParts';
import { getQueryParamOnFirstRender, idGenerator } from '@/utils/common';
import { IFilterCheckboxItem } from '@/types/catalog';

const createManufacturerCheckboxObj = (title: string) => {
	return {
		title,
		checked: false,
		id: idGenerator(),
	};
};

export const boilersManufactures = [
	'Ariston',
	'Chaffoteaux&Maury',
	'Baxi',
	'Bongioanni',
	'Buderus',
	'Strategist',
	'Henry',
	'Nortwest',
].map(createManufacturerCheckboxObj);
export const partsManufactures = [
	'Azure',
	'Gloves',
	'Cambridge-shire',
	'Salmon',
	'Montana',
	'Sensor',
	'Lesly',
	'Radian',
	'Gasoline',
	'Croatia',
].map(createManufacturerCheckboxObj);

const checkPriceFromQuery = (price: number) => {
	return price && !isNaN(price) && price >= 0 && price <= 10000;
};

export const checkQueryParams = (router: NextRouter) => {
	const priceFromQueryValue = getQueryParamOnFirstRender(
		'priceFrom',
		router
	) as string;
	const priceToQueryValue = getQueryParamOnFirstRender(
		'priceTo',
		router
	) as string;
	const boilerQueryValue = JSON.parse(
		decodeURIComponent(getQueryParamOnFirstRender('boiler', router) as string)
	);
	const partsQueryValue = JSON.parse(
		decodeURIComponent(getQueryParamOnFirstRender('parts', router) as string)
	);
	const isValidBoilerQuery =
		Array.isArray(boilerQueryValue) && !!boilerQueryValue?.length;
	const isValidPartsQuery =
		Array.isArray(partsQueryValue) && !!partsQueryValue?.length;
	const isValidPriceQuery =
		checkPriceFromQuery(+priceFromQueryValue) &&
		checkPriceFromQuery(+priceToQueryValue);

	return {
		isValidBoilerQuery,
		isValidPartsQuery,
		isValidPriceQuery,
		priceFromQueryValue,
		priceToQueryValue,
		boilerQueryValue,
		partsQueryValue,
	};
};

export const updateParamsAndFiltersFromQuery = async (
	callback: VoidFunction,
	path: string
) => {
	callback();
	const data = await getBoilerPartsFx(`/boiler-parts?limit=20&offset=${path}`);
	setFilteredBoilerParts(data);
};

export const updateParamsAndFilters = async <T>(
	updatedParams: T,
	path: string,
	router: NextRouter
) => {
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
	const data = await getBoilerPartsFx(`/boiler-parts?limit=20&offset=${path}`);
	setFilteredBoilerParts(data);
};

export const getItemManufacturers = (
	itemsManufacturers: IFilterCheckboxItem[]
) => {
	return itemsManufacturers
		.filter((item) => {
			return item.checked;
		})
		.map((item) => {
			return item.title;
		});
};
