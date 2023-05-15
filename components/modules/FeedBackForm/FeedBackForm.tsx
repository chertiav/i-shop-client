import { MutableRefObject, useRef, useState } from 'react';
import { useStore } from 'effector-react';
import { useForm } from 'react-hook-form';
import emailjs from '@emailjs/browser';
import { toast } from 'react-toastify';
//=============================================
import { $mode } from '@/context/mode';
import NameInput from '@/components/modules/FeedBackForm/NameInput';
import MessageInput from '@/components/modules/FeedBackForm/MessageInput';
import PhoneInput from '@/components/modules/FeedBackForm/PhoneInput';
import EmailInput from '@/components/modules/FeedBackForm/EmailInput';
import { FeedbackInputs } from '@/types/types/feedbackForm';
import styles from '@/styles/feedbackForm/index.module.scss';
import spinnerStyles from '@/styles/spinner/index.module.scss';

const FeedBackForm = () => {
	const mode = useStore($mode);
	const darkModeClass = mode === 'dark' ? `${styles.dark_mode}` : '';
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<FeedbackInputs>();
	const [spinner, setSpinner] = useState(false);
	const formRef = useRef() as MutableRefObject<HTMLFormElement>;

	const submitForm = () => {
		setSpinner(true);
		emailjs
			.sendForm(
				'service_l8g280o',
				'template_b07dbab',
				formRef.current,
				'WGzMJhGp9AlRXRTnz'
			)
			.then((result) => {
				setSpinner(false);
				toast.success(`Сообщение отправлено! ${result.text}`);
			})
			.catch((error) => {
				setSpinner(false);
				toast.error(`Что-то пошло не так! ${error.text}`);
			});
		formRef.current.reset();
	};

	return (
		<div className={`${styles.feedback_form} ${darkModeClass}`}>
			<h3 className={`${styles.feedback_form__title} ${darkModeClass}`}>
				Форма обратной связи
			</h3>
			<form
				className={styles.feedback_form__form}
				onSubmit={handleSubmit(submitForm)}
				ref={formRef}
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
					<button>
						{spinner ? (
							<span
								className={spinnerStyles.spinner}
								style={{ top: '6px', left: '47%' }}
							/>
						) : (
							'Отправить сообщение'
						)}
					</button>
				</div>
			</form>
		</div>
	);
};

export default FeedBackForm;
