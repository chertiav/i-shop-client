import { ICartAlertProps } from '@/types/dashboard';
import { useStore } from 'effector-react';
import { $mode } from '@/context/mode';
import styles from '@/styles/dashboard/index.module.scss';
import { formatPrice } from '@/utils/common';
import Link from 'next/link';

const CartAlert = ({ count, closeAlert }: ICartAlertProps) => {
	const mode = useStore($mode);
	const darkModeClass = mode === 'dark' ? `${styles.dark_mode}` : '';

	const ShowCountMessage = (count: string) => {
		if (count.endsWith('1')) {
			return 'товар';
		}
		if (count.endsWith('1') || count.endsWith('3') || count.endsWith('4')) {
			return 'товара';
		}
		return 'товаров';
	};

	return (
		<>
			<div className={`${styles.dashboard__alert__left} ${darkModeClass}`}>
				<span>
					В корзине {count} {ShowCountMessage(`${count}`)}
				</span>
				<span>На сумму ${formatPrice(0)}</span>
			</div>
			<div className={styles.dashboard__alert__right}>
				<Link href={'/order'} passHref legacyBehavior>
					<a className={styles.dashboard__alert__btn_cart}>Перейти в корзину</a>
				</Link>
				<Link href={'/order'} passHref legacyBehavior>
					<a className={styles.dashboard__alert__btn_order}>Оформить заказ</a>
				</Link>
			</div>
			<button
				className={styles.dashboard__alert__btn_close}
				onClick={closeAlert}
			/>
		</>
	);
};

export default CartAlert;
