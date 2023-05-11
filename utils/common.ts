import { NextRouter } from 'next/router';

export const getWindowWidth = () => {
	const { innerWidth: windowWidth } =
		typeof window !== 'undefined' ? window : { innerWidth: 0 };
	return { windowWidth };
};

export const formatPrice = (x: number) => {
	return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
};

export const createSelectOption = (value: string | number) => {
	return {
		value,
		label: value,
	};
};

export const idGenerator = () => {
	const S4 = () => {
		return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
	};

	return (
		S4() +
		S4() +
		'-' +
		S4() +
		'-' +
		S4() +
		'-' +
		S4() +
		'-' +
		S4() +
		S4() +
		S4()
	);
};

export const getQueryParamOnFirstRender = (
	queryName: string,
	router: NextRouter
) => {
	return (
		router.query[queryName] ||
		router.asPath.match(new RegExp(`[&?]${queryName}=(.*)(&|$)`))
	);
};
