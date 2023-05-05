import { createDomain } from 'effector-next';
import { IShoppingCartItem } from '@/types/shoping-cart';

const shoppingCart = createDomain();

export const setShoppingCart = shoppingCart.createEvent<IShoppingCartItem[]>();
export const $shoppingCart = shoppingCart
	.createStore<IShoppingCartItem[]>([])
	.on(setShoppingCart, (_, shoppingCart) => {
		return shoppingCart;
	});
