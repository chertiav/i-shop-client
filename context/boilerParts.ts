import { createDomain } from 'effector-next';
import { IBoilerParts } from '@/types/boilerparts';

const boilerParts = createDomain();

export const setBoilerParts = boilerParts.createEvent<IBoilerParts>();
export const setBoilerPartsCheapFirst = boilerParts.createEvent();
export const setBoilerPartsExpensiveFirst = boilerParts.createEvent();
export const setBoilerPartsPopularity = boilerParts.createEvent();

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
