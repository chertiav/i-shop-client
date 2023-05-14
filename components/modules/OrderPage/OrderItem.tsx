import { useStore } from 'effector-react';
import Link from 'next/link';
//=============================================
import { $mode } from '@/context/mode';
import CartItemCounter from '@/components/elements/CartItemCounter/CartItemCounter';
import { usePrice } from '@/hooks/usePrice';
import { useMediaQuery } from '@/hooks/useMediaQuery';
import { formatPrice } from '@/utils/common';
import { IShoppingCartItem } from '@/types/shoping-cart';
import styles from '@/styles/order/index.module.scss';
import spinnerStyles from '@/styles/spinner/index.module.scss';

const OrderItem = ({ item }: { item: IShoppingCartItem }) => {
	const mode = useStore($mode);
	const isMobile1160 = useMediaQuery(1160);
	const darkModeClass = mode === 'dark' ? `${styles.dark_mode}` : '';
	const { spinner, price, deleteCartItem, increasePrice, decreasePrice } =
		usePrice(item.count, item.partId, item.price);
	const spinnerDarkModeClass =
		mode === 'dark' ? '' : `${spinnerStyles.dark_mode}`;

	return (
		<li className={styles.order__cart__list__item}>
			<div className={styles.order__cart__list__item__left}>
				<div className={styles.order__cart__list__item__left__inner}>
					<div className={styles.order__cart__list__item__img}>
						<img src={item.image} alt={item.name} />
					</div>
					<Link href={`/catalog/${item.partId}`} passHref legacyBehavior>
						<a
							className={`${styles.order__cart__list__item__text} ${darkModeClass}`}
						>
							<span>
								{item.name.replace('.', '')}, {item.parts_manufacturer},{' '}
								{item.boiler_manufacturer}
							</span>
						</a>
					</Link>
				</div>
				{isMobile1160 &&
					(item.in_stock === 0 ? (
						<span className={styles.cart__popup__list__item__empty}>
							Нет на складе
						</span>
					) : (
						<CartItemCounter
							totalCount={item.in_stock}
							partId={item.partId}
							initialCount={item.count}
							increasePrice={increasePrice}
							decreasePrice={decreasePrice}
						/>
					))}
			</div>
			<div className={styles.order__cart__list__item__right}>
				{!isMobile1160 &&
					(item.in_stock === 0 ? (
						<span className={styles.order__cart__list__item__empty}>
							Нет на складе
						</span>
					) : (
						<CartItemCounter
							totalCount={item.in_stock}
							partId={item.partId}
							initialCount={item.count}
							increasePrice={increasePrice}
							decreasePrice={decreasePrice}
						/>
					))}
				<span
					className={`${styles.order__cart__list__item__price}  ${darkModeClass}`}
				>
					${formatPrice(price)}
				</span>
				<button
					className={styles.order__cart__list__item__delete}
					onClick={deleteCartItem}
				>
					{spinner ? (
						<span
							className={`${spinnerStyles.spinner} ${spinnerDarkModeClass}`}
							style={{ top: '-13px', left: '-30px', width: 25, height: 25 }}
						/>
					) : (
						'Удалить'
					)}
				</button>
			</div>
		</li>
	);
};

export default OrderItem;
