import { toast } from 'react-toastify';
import { createEffect } from 'effector-next';
//=======================================
import api from '../axiosClient';

export const getBestsellersOrNewPartsFx = createEffect(async (url: string) => {
	const { data } = await api.get(url);
	return data;
});

export const getBoilerPartsFx = createEffect(async (url: string) => {
	const { data } = await api.get(url);
	return data;
});

export const getBoilerPartFx = createEffect(async (url: string) => {
	const { data } = await api.get(url);
	return data;
});

export const searchPartFx = createEffect(
	async ({ url, search }: { url: string; search: string }) => {
		const { data } = await api.post(url, { search });
		return data.rows;
	}
);

export const getPartByNameFx = createEffect(
	async ({ url, name }: { url: string; name: string }) => {
		try {
			const { data } = await api.post(url, { name });
			return data;
		} catch (e) {
			toast.error((e as Error).message);
		}
	}
);
