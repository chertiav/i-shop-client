/* eslint-disable max-len */
import BrandSliderArrowSvg from '@/components/elements/BrandsSliderArrowSvg/BrandSliderArrowSvg';
import styles from '@/styles/dashboard/index.module.scss';
import { IBrandsSliderArrow } from '@/types/elements';

const BrandsSliderNextArrow = (props: IBrandsSliderArrow) => {
	return (
		<button
			className={`${styles.dashboard__brands__slider__arrow} ${styles.dashboard__brands__slider__arrow_next} ${props.modeClass}`}
			onClick={props.onClick}
		>
			<span>
				<BrandSliderArrowSvg />
			</span>
		</button>
	);
};

export default BrandsSliderNextArrow;
