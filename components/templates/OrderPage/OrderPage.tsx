import { useState } from 'react';
import { useStore } from 'effector-react';
//==============================================
import { $mode } from '@/context/mode';
import { $shoppingCart, $totalPrice } from '@/context/shoping-cart';
import OrderAccordion from '@/components/modules/OrderPage/OrderAccordion';
import { formatPrice } from '@/utils/common';
import styles from '@/styles/order/index.module.scss';

const OrderPage = () => {
	const mode = useStore($mode);
	const shoppingCart = useStore($shoppingCart);
	const totalPrice = useStore($totalPrice);
	const darkModeClass = mode === 'dark' ? `${styles.dark_mode}` : '';
	const [orderIsReady, setOrderIsReady] = useState(false);
	const [agreement, setAgreement] = useState(false);

	const handleAgreementChange = () => {
		return setAgreement(!agreement);
	};

	return (
		<section className={styles.order}>
			<div className={'container'}>
				<h2 className={`${styles.order__title} ${darkModeClass}`}>
					Оформление заказа
				</h2>
				<div className={styles.order__inner}>
					<div className={styles.order__cart}>
						<OrderAccordion
							setOrderIsReady={setOrderIsReady}
							showDoneIcon={orderIsReady}
						/>
					</div>
					<div className={styles.order__pay}>
						<h3 className={`${styles.order__pay__title} ${darkModeClass}`}>
							Итого
						</h3>
						<div className={`${styles.order__pay__inner} ${darkModeClass}`}>
							<div className={styles.order__pay__goods}>
								<span>
									Товары (
									{shoppingCart.reduce((defaultCount, item) => {
										return defaultCount + item.count;
									}, 0)}
									)
								</span>
								<span>$ {formatPrice(totalPrice)}</span>
							</div>
							<div className={styles.order__pay__total}>
								<span>На сумму</span>
								<span className={darkModeClass}>
									$ {formatPrice(totalPrice)}
								</span>
							</div>
							<button
								disabled={!(orderIsReady && agreement)}
								className={styles.order__pay__btn}
							>
								Подтвердить заказ
							</button>
							<label
								className={`${styles.order__pay__rights} ${darkModeClass}`}
							>
								<input
									type="checkbox"
									className={styles.order__pay__rights__input}
									onClick={handleAgreementChange}
									checked={agreement}
								/>
								<span className={styles.order__pay__rights__text}>
									<strong>Согласен с условиями</strong> Правил пользования
									торговой площадкой и правилами возврата
								</span>
							</label>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
};

export default OrderPage;
