/* eslint-disable max-len */
import { createEffect } from 'effector-next';
//=============================================
import api from '../axiosClient';
import { IGeoLocation } from '@/types/common';

export const getGeoLacationFx = createEffect(
	async ({ latitude, longitude }: IGeoLocation) => {
		const data = await api.get(
			`https://api.geoapify.com/v1/geocode/reverse?lat=${latitude}&lon=${longitude}&lang=ru&apiKey=${process.env.NEXT_PUBLIC_GEOAPI_KEY}`,
			{ withCredentials: false }
		);
		return data;
	}
);
