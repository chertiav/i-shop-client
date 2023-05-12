export interface IShoppingCartItem {
	id: number;
	name: string;
	price: number;
	image: string;
	in_stock: number;
	parts_manufacturer: string;
	boiler_manufacturer: string;
	count: number;
	total_price: number;
	userId: number;
	partId: number;
}

export interface IAddToCartFx {
	url: string;
	userName: string;
	userId: number;
	partId: number;
}

export interface IUpdateCartItemFX {
	url: string;
	payload: {
		total_price?: number;
		count?: number;
	};
}

export interface ICartItemCounterProps {
	totalCount: number;
	partId: number;
	initialCount: number;
	increasePrice: VoidFunction;
	decreasePrice: VoidFunction;
}
