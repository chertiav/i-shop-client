/* eslint-disable max-len */
import { IBrandsSliderArrow } from '@/types/elements';
import BrandSliderArrowSvg from '@/components/elements/BrandsSliderArrowSvg/BrandSliderArrowSvg';
import styles from '@/styles/dashboard/index.module.scss';

const BrandsSliderPrevArrow = (props: IBrandsSliderArrow) => {
	return (
		<button
			className={`${styles.dashboard__brands__slider__arrow} ${styles.dashboard__brands__slider__arrow_prev} ${props.modeClass}`}
			onClick={props.onClick}
		>
			<span>
				<BrandSliderArrowSvg />
			</span>
		</button>
	);
};

export default BrandsSliderPrevArrow;