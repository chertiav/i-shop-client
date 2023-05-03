import { AxiosError } from 'axios';
import { toast } from 'react-toastify';
//==============================================
import { HTTPStatus } from '@/constance';

export const showAuthError = (error: unknown) => {
	const axiosError = error as AxiosError;

	if (axiosError.response) {
		if (axiosError.response.data === HTTPStatus.UNAUTHORIZED) {
			toast.error('Неверное имя пользователя или пароль');
			return;
		}
	}
	toast.error((error as Error).message);
};
