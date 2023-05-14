import { useStore } from 'effector-react';
import { useEffect, useState } from 'react';
//=========================================================
import { removeFromCartFx } from '@/app/api/shopping-cart';
import { removeItemFromCart, updateTotalPrice } from '@/utils/shopingCart';

export const usePrice = (
	count: number,
	partId: number,
	initialPrice: number
) => {
	const spinner = useStore(removeFromCartFx.pending);
	const [price, setPrice] = useState(initialPrice);

	useEffect(() => {
		setPrice(price * count);
	}, []);

	useEffect(() => {
		updateTotalPrice(price, partId);
	}, [price]);

	const increasePrice = () => {
		return setPrice(price + initialPrice);
	};
	const decreasePrice = () => {
		return setPrice(price - initialPrice);
	};

	const deleteCartItem = () => {
		return removeItemFromCart(partId);
	};

	return {
		price,
		spinner,
		increasePrice,
		decreasePrice,
		deleteCartItem,
	};
};
