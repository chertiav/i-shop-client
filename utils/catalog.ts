import { idGenerator } from '@/utils/common';

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
