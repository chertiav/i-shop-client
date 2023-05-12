import { useStore } from 'effector-react';
import { forwardRef, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { toast } from 'react-toastify';
import Link from 'next/link';
//===========================================================
import { $user } from '@/context/users';
import { $mode } from '@/context/mode';
import {
	$shoppingCart,
	$totalPrice,
	setShoppingCart,
	setTotalPrice,
} from '@/context/shoping-cart';
import { getCartItemsFx } from '@/app/api/shopping-cart';
import ShoppingCartSvg from '@/components/elements/ShoppingCartSvg/ShoppingCartSvg';
import CartPopupItem from '@/components/modules/Header/CartPopup/CartPopupItem';
import { withClickOutside } from '@/utils/withClickOutside';
import { formatPrice } from '@/utils/common';
import { IWrappedComponentProps } from '@/types/common';
import styles from '@/styles/cartPopup/index.module.scss';

const CartPopup = forwardRef<HTMLDivElement, IWrappedComponentProps>(
	({ open, setOpen }, ref) => {
		const shoppingCart = useStore($shoppingCart);
		const mode = useStore($mode);
		const user = useStore($user);
		const totalPrice = useStore($totalPrice);
		const darkModeClass = mode === 'dark' ? `${styles.dark_mode}` : '';

		const toggleCartDropDawn = () => {
			return setOpen(!open);
		};

		useEffect(() => {
			loadCartItems();
		}, []);

		useEffect(() => {
			setTotalPrice(
				shoppingCart.reduce((defaultCount, item) => {
					return defaultCount + item.total_price;
				}, 0)
			);
		}, [shoppingCart]);

		const loadCartItems = async () => {
			try {
				const cartItems = await getCartItemsFx(`/shopping-cart/${user.userId}`);
				setShoppingCart(cartItems);
			} catch (e) {
				toast.error((e as Error).message);
			}
		};

		return (
			<div className={styles.cart} ref={ref}>
				<button
					className={`${styles.cart__btn} ${darkModeClass}`}
					onClick={toggleCartDropDawn}
				>
					{!!shoppingCart.length && (
						<span className={styles.cart__btn__count}>
							{shoppingCart.length}
						</span>
					)}
					<span className={styles.cart__svg}>
						<ShoppingCartSvg />
					</span>
					<span className={styles.cart__text}>Корзина</span>
				</button>
				<AnimatePresence>
					{open && (
						<motion.ul
							initial={{ opacity: 0, scale: 0 }}
							animate={{ opacity: 1, scale: 1 }}
							exit={{ opacity: 0, scale: 0 }}
							className={`${styles.cart__popup} ${darkModeClass}`}
							style={{ transformOrigin: 'right-top' }}
						>
							<h3 className={styles.cart__popup__title}>Корзина</h3>
							<ul className={styles.cart__popup__list}>
								{shoppingCart.length ? (
									shoppingCart.map((item) => {
										return <CartPopupItem item={item} key={item.id} />;
									})
								) : (
									<li className={styles.cart__popup__empty}>
										<span
											className={`${styles.cart__popup__empty__text} ${darkModeClass}`}
										>
											Корзина пуста
										</span>
									</li>
								)}
							</ul>
							<div className={styles.cart__popup__footer}>
								<div className={styles.cart__popup__footer__total}>
									<span
										className={`${styles.cart__popup__footer__text} ${darkModeClass}`}
									>
										Общая сумма заказа:
									</span>
									<span className={styles.cart__popup__footer__price}>
										$ {formatPrice(totalPrice)}
									</span>
								</div>
								<Link href={'/order'} passHref legacyBehavior>
									<button
										className={styles.cart__popup__footer__btn}
										disabled={!shoppingCart.length}
									>
										Оформить заказ
									</button>
								</Link>
							</div>
						</motion.ul>
					)}
				</AnimatePresence>
			</div>
		);
	}
);

CartPopup.displayName = 'CartPopup';

export default withClickOutside(CartPopup);
