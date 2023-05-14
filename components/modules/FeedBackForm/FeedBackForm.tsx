import { useStore } from 'effector-react';
import { useForm } from 'react-hook-form';
//=============================================
import { $mode } from '@/context/mode';
import NameInput from '@/components/modules/FeedBackForm/NameInput';
import styles from '@/styles/feedbackForm/index.module.scss';
import { FeedbackInputs } from '@/types/types/feedbackForm';
import PhoneInput from '@/components/modules/FeedBackForm/PhoneInput';
import EmailInput from '@/components/modules/FeedBackForm/EmailInput';
import MessageInput from '@/components/modules/FeedBackForm/MessageInput';

const FeedBackForm = () => {
	const mode = useStore($mode);
	const darkModeClass = mode === 'dark' ? `${styles.dark_mode}` : '';
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<FeedbackInputs>();

	const submitForm = (data: FeedbackInputs) => {
		console.log(data);
	};

	return (
		<div className={`${styles.feedback_form} ${darkModeClass}`}>
			<h3 className={`${styles.feedback_form__title} ${darkModeClass}`}>
				Форма обратной связи
			</h3>
			<form
				className={styles.feedback_form__form}
				onSubmit={handleSubmit(submitForm)}
			>
				<NameInput
					register={register}
					errors={errors}
					darkModeClass={darkModeClass}
				/>
				<PhoneInput
					register={register}
					errors={errors}
					darkModeClass={darkModeClass}
				/>
				<EmailInput
					register={register}
					errors={errors}
					darkModeClass={darkModeClass}
				/>
				<MessageInput
					register={register}
					errors={errors}
					darkModeClass={darkModeClass}
				/>
				<div className={styles.feedback_form__form__btn}>
					<button>Отправить сообщение</button>
				</div>
			</form>
		</div>
	);
};

export default FeedBackForm;
