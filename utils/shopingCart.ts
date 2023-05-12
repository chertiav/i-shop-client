import { toast } from 'react-toastify';
import { addToCartFx, removeFromCartFx } from '@/app/api/shopping-cart';
import { removeShoppingCart, updateShoppingCart } from '@/context/shoping-cart';

export const toggleCartItem = async (
	userName: string,
	userId: number,
	partId: number,
	isInCart: boolean,
	setSpinner: (arg0: boolean) => void
) => {
	try {
		setSpinner(true);
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
	} finally {
		setSpinner(false);
	}
};

export const removeItemFromCart = async (
	partId: number,
	setSpinner: (arg0: boolean) => void
) => {
	try {
		setSpinner(true);
		await removeFromCartFx(`/shopping-cart/one/${partId}`);
		removeShoppingCart(partId);
	} catch (e) {
		toast.error((e as Error).message);
	} finally {
		setSpinner(false);
	}
};
