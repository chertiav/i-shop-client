import { useState } from 'react';
import { useStore } from 'effector-react';
import Link from 'next/link';
//==========================================
import { formatPrice } from '@/utils/common';
import { IBoilerPart } from '@/types/boilerparts';
import CartHoverCheckedSvg from '@/components/elements/CartHoverCheckedSvg/CartHoverCheckedSvg';
import CartHoverSvg from '@/components/elements/CartHoverSvg/CartHoverSvg';
import { $mode } from '@/context/mode';
import { $shoppingCart } from '@/context/shoping-cart';
import spinnerStyles from '@/styles/spinner/index.module.scss';
import styles from '@/styles/catalog/index.module.scss';

const CatalogItem = ({ item }: { item: IBoilerPart }) => {
	const [spinner, setSpinner] = useState(false);
	const shoppingCart = useStore($shoppingCart);
	const isInCart = shoppingCart.some((cartItem) => {
		return cartItem.partId === item.id;
	});
	const mode = useStore($mode);
	const darkModeClass = mode === 'dark' ? `${styles.dark_mode}` : '';

	return (
		<li className={`${styles.catalog__list__item} ${darkModeClass}`}>
			<img src={item.images[0]} alt={item.name} />
			<div className={styles.catalog__list__item__inner}>
				<Link href={`/catalog/${item.id}`} passHref legacyBehavior>
					<h3 className={styles.catalog__list__item__title}>{item.name}</h3>
				</Link>
				<span className={styles.catalog__list__item__code}>
					Артикул: {item.vendor_code}
				</span>
				<span className={styles.catalog__list__item__price}>
					$ {formatPrice(item.price)}
				</span>
			</div>
			<button
				className={`${styles.catalog__list__item__cart} ${
					isInCart ? styles.added : ''
				}`}
				disabled={spinner}
			>
				{spinner ? (
					<div className={spinnerStyles.spinner} style={{ top: 6, left: 6 }} />
				) : (
					<span>{isInCart ? <CartHoverCheckedSvg /> : <CartHoverSvg />}</span>
				)}
			</button>
		</li>
	);
};

export default CatalogItem;
