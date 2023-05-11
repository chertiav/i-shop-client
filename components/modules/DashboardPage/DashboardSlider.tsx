/* eslint-disable indent */
import { useEffect } from 'react';
import { useStore } from 'effector-react';
import Link from 'next/link';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
//=============================================
import { IDashboardSlider } from '@/types/dashboard';
import { useMediaQuery } from '@/hooks/useMediaQuery';
import { formatPrice } from '@/utils/common';
import { $mode } from '@/context/mode';
import stylesSkeleton from '@/styles/skeleton/index.module.scss';
import styles from '@/styles/dashboard/index.module.scss';

const DashboardSlider = ({
	items,
	spinner,
	goToPartPage,
}: IDashboardSlider) => {
	const isMedia560 = useMediaQuery(560);
	const isMedia768 = useMediaQuery(768);
	const isMedia800 = useMediaQuery(800);
	const isMedia1366 = useMediaQuery(1366);
	const mode = useStore($mode);
	const darkModeClass = mode === 'dark' ? `${styles.dark_mode}` : '';

	useEffect(() => {
		const slider = document.querySelectorAll(`.${styles.dashboard__slider}`);
		slider.forEach((item) => {
			const list = item.querySelector('.slick-list') as HTMLDivElement;
			list.style.height = isMedia560 ? '276px' : '390px';
			list.style.padding = '0 5px';
			list.style.margin = isMedia560 ? '-8px' : isMedia800 ? '-15px' : '0';
		});
	}, [isMedia560, isMedia800]);

	const settings = {
		dots: false,
		infinite: true,
		variableWidth: true,
		autoplay: true,
		speed: 5000,
		arrows: false,
		slidesToScroll: isMedia768 ? 1 : 2,
	};

	const width = {
		width: isMedia1366 ? (isMedia800 ? (isMedia560 ? 160 : 252) : 317) : 344,
	};

	return (
		<Slider {...settings} className={styles.dashboard__slider}>
			{spinner ? (
				[...Array(8)].map((_, index) => {
					return (
						<div
							className={`${stylesSkeleton.skeleton__item} ${
								mode === 'dark' ? `${stylesSkeleton.dark_mode}` : ''
							}`}
							key={index}
							style={width}
						>
							<div className={stylesSkeleton.skeleton__item__light} />
						</div>
					);
				})
			) : items.length ? (
				items.map((item) => {
					return (
						<div
							className={`${styles.dashboard__slide} ${darkModeClass}`}
							key={item.id}
							style={width}
						>
							<img src={item.images[0]} alt={item.name} />
							<div className={styles.dashboard__slide__inner}>
								<Link
									href={goToPartPage ? `/catalog/${item.id}` : `/catalog`}
									passHref
									legacyBehavior
								>
									<a>
										<h3 className={styles.dashboard__slide__title}>
											{item.name}
										</h3>
									</a>
								</Link>
								<span className={styles.dashboard__slide__code}>
									Артикул: {item.vendor_code}
								</span>
								<span className={styles.dashboard__slide__price}>
									$ {formatPrice(item.price)}
								</span>
							</div>
						</div>
					);
				})
			) : (
				<span>Список товаров пуст...</span>
			)}
		</Slider>
	);
};

export default DashboardSlider;
