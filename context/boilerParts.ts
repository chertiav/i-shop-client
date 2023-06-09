import { createDomain } from 'effector-next';
import { IBoilerParts } from '@/types/boilerparts';
import { IFilterCheckboxItem } from '@/types/catalog';
import { boilersManufactures, partsManufactures } from '@/utils/catalog';

const boilerParts = createDomain();

export const setBoilerParts = boilerParts.createEvent<IBoilerParts>();
export const setBoilerPartsCheapFirst = boilerParts.createEvent();
export const setBoilerPartsExpensiveFirst = boilerParts.createEvent();
export const setFilteredBoilerParts = boilerParts.createEvent<IBoilerParts>();
export const setBoilerPartsPopularity = boilerParts.createEvent();
export const setBoilerManufactures =
	boilerParts.createEvent<IFilterCheckboxItem[]>();
export const updateBoilerManufacturer =
	boilerParts.createEvent<IFilterCheckboxItem>();
export const setPartsManufactures =
	boilerParts.createEvent<IFilterCheckboxItem[]>();
export const updatePartsManufacturer =
	boilerParts.createEvent<IFilterCheckboxItem>();
export const setBoilerManufacturersFromQuery =
	boilerParts.createEvent<string[]>();
export const setPartsManufacturersFromQuery =
	boilerParts.createEvent<string[]>();

const updateManufacturer = (
	manufacturers: IFilterCheckboxItem[],
	id: string,
	payload: Partial<IFilterCheckboxItem>
) => {
	return manufacturers.map((item) => {
		if (item.id === id) {
			return {
				...item,
				...payload,
			};
		}
		return item;
	});
};

const updateManufacturerFromQuery = (
	manufacturers: IFilterCheckboxItem[],
	manufacturersFromQuery: string[]
) => {
	return manufacturers.map((item) => {
		if (
			manufacturersFromQuery.find((title) => {
				return title === item.title;
			})
		) {
			return {
				...item,
				checked: true,
			};
		}

		return item;
	});
};

export const $boilerParts = boilerParts
	.createStore<IBoilerParts>({} as IBoilerParts)
	.on(setBoilerParts, (_, parts) => {
		return parts;
	})
	.on(setBoilerPartsCheapFirst, (state) => {
		return {
			...state,
			rows: state.rows.sort((a, b) => {
				return a.price - b.price;
			}),
		};
	})
	.on(setBoilerPartsExpensiveFirst, (state) => {
		return {
			...state,
			rows: state.rows.sort((a, b) => {
				return b.price - a.price;
			}),
		};
	})
	.on(setBoilerPartsPopularity, (state) => {
		return {
			...state,
			rows: state.rows.sort((a, b) => {
				return b.popularity - a.popularity;
			}),
		};
	});

export const $boilerManufacturers = boilerParts
	.createStore<IFilterCheckboxItem[]>(
		boilersManufactures as IFilterCheckboxItem[]
	)
	.on(setBoilerManufactures, (_, parts) => {
		return parts;
	})
	.on(updateBoilerManufacturer, (state, payload) => {
		return [
			...updateManufacturer(state, payload.id as string, {
				checked: payload.checked,
			}),
		];
	})
	.on(setBoilerManufacturersFromQuery, (state, manufacturersFromQuery) => {
		return [...updateManufacturerFromQuery(state, manufacturersFromQuery)];
	});

export const $partsManufactures = boilerParts
	.createStore<IFilterCheckboxItem[]>(
		partsManufactures as IFilterCheckboxItem[]
	)
	.on(setPartsManufactures, (_, parts) => {
		return parts;
	})
	.on(updatePartsManufacturer, (state, payload) => {
		return [
			...updateManufacturer(state, payload.id as string, {
				checked: payload.checked,
			}),
		];
	})
	.on(setPartsManufacturersFromQuery, (state, partsManufacturersFromQuery) => {
		return [...updateManufacturerFromQuery(state, partsManufacturersFromQuery)];
	});

export const $filteredBoilerParts = boilerParts
	.createStore<IBoilerParts>({} as IBoilerParts)
	.on(setFilteredBoilerParts, (_, parts) => {
		return parts;
	});
