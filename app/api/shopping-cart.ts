import { createEffect } from 'effector-next';
//===========================================
import api from '../axiosClient';
import { IAddToCartFx, IUpdateCartItemFX } from '@/types/shoping-cart';

export const getCartItemsFx = createEffect(async (url: string) => {
	const { data } = await api.get(url);
	return data;
});

export const addToCartFx = createEffect(
	async ({ url, userName, userId, partId }: IAddToCartFx) => {
		const { data } = await api.post(url, { userName, partId, userId });
		return data;
	}
);

export const removeFromCartFx = createEffect(async (url: string) => {
	await api.delete(url);
});

export const updateCartItemFx = createEffect(
	async ({ url, payload }: IUpdateCartItemFX) => {
		const { data } = await api.patch(url, payload);
		return data;
	}
);
