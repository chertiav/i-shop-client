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
