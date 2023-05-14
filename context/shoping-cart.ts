import { createDomain } from 'effector-next';
import { IShoppingCartItem } from '@/types/shoping-cart';

const shoppingCart = createDomain();

export const setShoppingCart = shoppingCart.createEvent<IShoppingCartItem[]>();
export const updateShoppingCart = shoppingCart.createEvent<IShoppingCartItem>();
export const removeShoppingCart = shoppingCart.createEvent<number>();
export const setTotalPrice = shoppingCart.createEvent<number>();
export const setDisableCart = shoppingCart.createEvent<boolean>();
export const updateCartItemTotalPrice = shoppingCart.createEvent<{
	partId: number;
	total_price: number;
}>();
export const updateCartItemCount = shoppingCart.createEvent<{
	partId: number;
	count: number;
}>();

const remove = (cartItems: IShoppingCartItem[], partId: number) => {
	return cartItems.filter((item) => {
		return item.partId !== partId;
	});
};

const updateCartItem = <T>(
	cartItems: IShoppingCartItem[],
	partId: number,
	payload: T
) => {
	return cartItems.map((item) => {
		if (item.partId === partId) {
			return {
				...item,
				...payload,
			};
		}
		return item;
	});
};

export const $shoppingCart = shoppingCart
	.createStore<IShoppingCartItem[]>([])
	.on(setShoppingCart, (_, shoppingCart) => {
		return shoppingCart;
	})
	.on(updateShoppingCart, (state, cartItem) => {
		return [...state, cartItem];
	})
	.on(removeShoppingCart, (state, partId) => {
		return [...remove(state, partId)];
	})
	.on(updateCartItemTotalPrice, (state, { partId, total_price }) => {
		return [...updateCartItem(state, partId, { total_price })];
	})
	.on(updateCartItemCount, (state, { partId, count }) => {
		return [...updateCartItem(state, partId, { count })];
	});

export const $totalPrice = shoppingCart
	.createStore<number>(0)
	.on(setTotalPrice, (_, value) => {
		return value;
	});

export const $disableCart = shoppingCart
	.createStore<boolean>(false)
	.on(setDisableCart, (_, value) => {
		return value;
	});
