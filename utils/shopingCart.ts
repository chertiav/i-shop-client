import { toast } from 'react-toastify';
import {
	addToCartFx,
	removeFromCartFx,
	updateCartItemFx,
} from '@/app/api/shopping-cart';
import {
	removeShoppingCart,
	updateCartItemTotalPrice,
	updateShoppingCart,
} from '@/context/shoping-cart';

export const toggleCartItem = async (
	userName: string,
	userId: number,
	partId: number,
	isInCart: boolean
) => {
	try {
		if (isInCart) {
			await removeFromCartFx(`/shopping-cart/one/${partId}`);
			removeShoppingCart(partId);
			return;
		}

		const data = await addToCartFx({
			url: '/shopping-cart/add',
			userId,
			userName,
			partId,
		});

		updateShoppingCart(data);
	} catch (e) {
		toast.error((e as Error).message);
	}
};

export const removeItemFromCart = async (partId: number) => {
	try {
		await removeFromCartFx(`/shopping-cart/one/${partId}`);
		removeShoppingCart(partId);
	} catch (e) {
		toast.error((e as Error).message);
	}
};

export const updateTotalPrice = async (total_price: number, partId: number) => {
	const data = await updateCartItemFx({
		url: `/shopping-cart/total-price/${partId}`,
		payload: { total_price },
	});
	updateCartItemTotalPrice({ partId, total_price: data.total_price });
};
