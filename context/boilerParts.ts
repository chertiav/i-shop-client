import { createDomain } from 'effector-next';
import { IBoilerParts } from '@/types/boilerparts';

const boilerParts = createDomain();

export const setBoilerParts = boilerParts.createEvent<IBoilerParts>();

export const $boilerParts = boilerParts
	.createStore<IBoilerParts>({} as IBoilerParts)
	.on(setBoilerParts, (_, parts) => {
		return parts;
	});
