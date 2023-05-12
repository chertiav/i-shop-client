import { createDomain } from 'effector-next';
import { IShoppingCartItem } from '@/types/shoping-cart';

const shoppingCart = createDomain();

export const setShoppingCart = shoppingCart.createEvent<IShoppingCartItem[]>();
export const updateShoppingCart = shoppingCart.createEvent<IShoppingCartItem>();
export const removeShoppingCart = shoppingCart.createEvent<number>();

const remove = (cartItems: IShoppingCartItem[], partId: number) => {
	return cartItems.filter((item) => {
		return item.partId !== partId;
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
	});
