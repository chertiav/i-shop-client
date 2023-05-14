import { useEffect } from 'react';
import { useStore } from 'effector-react';
import { toast } from 'react-toastify';
//================================================
import { $mode } from '@/context/mode';
import { $user } from '@/context/users';
import {
	$boilerParts,
	setBoilerParts,
	setBoilerPartsPopularity,
} from '@/context/boilerParts';
import { $boilerPart } from '@/context/boilerPart';
import { $shoppingCart } from '@/context/shoping-cart';
import { getBoilerPartsFx } from '@/app/api/boilerParts';
import { removeFromCartFx } from '@/app/api/shopping-cart';
import PartAccordion from '@/components/modules/PartPage/PartAccordion';
import PartImageList from '@/components/modules/PartPage/PartImageList';
import CartHoverCheckedSvg from '@/components/elements/CartHoverCheckedSvg/CartHoverCheckedSvg';
import CartHoverSvg from '@/components/elements/CartHoverSvg/CartHoverSvg';
import PartTabs from '@/components/modules/PartPage/PartTabs';
import DashboardSlider from '@/components/modules/DashboardPage/DashboardSlider';
import { useMediaQuery } from '@/hooks/useMediaQuery';
import { toggleCartItem } from '@/utils/shopingCart';
import { formatPrice } from '@/utils/common';
import styles from '@/styles/part/index.module.scss';
import spinnerStyles from '@/styles/spinner/index.module.scss';

const PartPage = () => {
	const mode = useStore($mode);
	const user = useStore($user);
	const isMobile = useMediaQuery(850);
	const boilerPart = useStore($boilerPart);
	const boilerParts = useStore($boilerParts);
	const cartItems = useStore($shoppingCart);
	const darkModeClass = mode === 'dark' ? `${styles.dark_mode}` : '';
	const isinCart = cartItems.some((item) => {
		return item.partId === boilerPart.id;
	});
	const spinnerToggleCart = useStore(removeFromCartFx.pending);
	const spinnerSlider = useStore(getBoilerPartsFx.pending);

	const toggleToCart = () => {
		return toggleCartItem(user.userName, +user.userId, boilerPart.id, isinCart);
	};

	useEffect(() => {
		loadBoilerPart();
	}, []);

	const loadBoilerPart = async () => {
		try {
			const data = await getBoilerPartsFx('/boiler-parts?limit=20&offset=0');
			setBoilerParts(data);
			setBoilerPartsPopularity();
		} catch (e) {
			toast.error((e as Error).message);
		}
	};

	return (
		<section>
			<div className={'container'}>
				<div className={`${styles.part__top} ${darkModeClass}`}>
					<h2 className={`${styles.part__title} ${darkModeClass}`}>
						{boilerPart.name}
					</h2>
					<div className={styles.part__inner}>
						<PartImageList />{' '}
						<div className={styles.part__info}>
							<span className={`${styles.part__info__price} ${darkModeClass}`}>
								${formatPrice(boilerPart.price || 0)}
							</span>
							<span className={styles.part__info__stock}>
								{boilerPart.in_stock > 0 ? (
									<span className={styles.part__info__stock__success}>
										Есть на складе
									</span>
								) : (
									<span className={styles.part__info__stock__not}>
										Нет на складе
									</span>
								)}
							</span>
							<span className={styles.part__info__code}>
								Артикул: {boilerPart.vendor_code}
							</span>
							<button
								className={`${styles.part__info__btn} ${
									isinCart ? styles.in_cart : ''
								}`}
								onClick={toggleToCart}
							>
								{spinnerToggleCart ? (
									<span
										className={spinnerStyles.spinner}
										style={{ top: 10, left: '45%' }}
									/>
								) : (
									<>
										<span className={styles.part__info__btn__icon}>
											{isinCart ? <CartHoverCheckedSvg /> : <CartHoverSvg />}
										</span>
										{isinCart ? (
											<span>Добавлено в корзину</span>
										) : (
											<span>Положить в корзину</span>
										)}
									</>
								)}
							</button>
							{!isMobile && <PartTabs />}
						</div>
					</div>
				</div>
				{isMobile && (
					<div className={styles.part__accordion}>
						<div className={styles.part__accordion__inner}>
							<PartAccordion title={'Описание'}>
								<div
									className={`${styles.part__accordion__content} ${darkModeClass}`}
								>
									<h3
										className={`${styles.part__tabs__content__title} ${darkModeClass}`}
									>
										{boilerPart.name}
									</h3>
									<p
										className={`${styles.part__tabs__content__text} ${darkModeClass}`}
									>
										{boilerPart.description}
									</p>
								</div>
							</PartAccordion>
						</div>
						<PartAccordion title={'Совместимость'}>
							<div
								className={`${styles.part__accordion__content} ${darkModeClass}`}
							>
								<p
									className={`${styles.part__tabs__content__text} ${darkModeClass}`}
								>
									{boilerPart.compatibility}
								</p>
							</div>
						</PartAccordion>
					</div>
				)}
				<div className={styles.part__bottom}>
					<h2
						className={`${styles.part__tabs__content__title} ${darkModeClass}`}
					>
						Вам понравится
					</h2>

					<DashboardSlider
						goToPartPage
						spinner={spinnerSlider}
						items={boilerParts.rows || []}
					/>
				</div>
			</div>
		</section>
	);
};

export default PartPage;
