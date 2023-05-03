import { IAuthPageInput } from '@/types/auth';
import styles from '@/styles/auth/index.module.scss';

const NameInput = ({ register, errors }: IAuthPageInput) => {
	return (
		<label className={styles.form__label}>
			<input
				{...register('name', {
					required: 'Введите Имя',
					minLength: 4,
					maxLength: 15,
					pattern: {
						value: /^[а-яА-Яa-zA-ZёЁ]*$/,
						message: 'Недопустимое значение',
					},
				})}
				className={styles.form__input}
				type="text"
				placeholder="Name"
			/>
			{errors.name && (
				<span className={styles.error_alert}>{errors.name?.message}</span>
			)}
			{errors.name && errors.name.type === 'minLength' && (
				<span className={styles.error_alert}>Минимум 4 символа!</span>
			)}
			{errors.name && errors.name.type === 'maxLength' && (
				<span className={styles.error_alert}>Не более 15 символов!</span>
			)}
		</label>
	);
};

export default NameInput;
