import { useStore } from 'effector-react';
import {
	$boilerManufacturers,
	$partsManufactures,
	setBoilerManufactures,
	setPartsManufactures,
	updateBoilerManufacturer,
	updatePartsManufacturer,
} from '@/context/boilerParts';
import PriceRange from '@/components/modules/CatalogPage/PriceRange';
import Accordion from '@/components/elements/Accordion/Accordion';
import FilterManufacturerAccordion from '@/components/modules/CatalogPage/FilterManufacturerAccordion';
import { ICatalogFilterDesktopProps } from '@/types/catalog';
import { $mode } from '@/context/mode';
import styles from '@/styles/catalog/index.module.scss';
import spinnerStyles from '@/styles/spinner/index.module.scss';

const CatalogFiltersDesktop = ({
	priceRange,
	setPriceRange,
	setIsPriceRangeChanged,
	resetFilterBtnDisabled,
	spinner,
	resetFilters,
}: ICatalogFilterDesktopProps) => {
	const boilerManufacturers = useStore($boilerManufacturers);
	const partsManufacturers = useStore($partsManufactures);
	const mode = useStore($mode);
	const darkModeClass = mode === 'dark' ? `${styles.dark_mode}` : '';

	return (
		<div className={`${styles.catalog__bottom__filters} ${darkModeClass}`}>
			<h3
				className={`${styles.catalog__bottom__filters__title} ${darkModeClass}`}
			>
				Фильтры
			</h3>
			<div className={styles.filters__boiler_manufacturers}>
				<FilterManufacturerAccordion
					manufacturersList={boilerManufacturers}
					title={'Производитель товара'}
					setManufacturer={setBoilerManufactures}
					updateManufacturer={updateBoilerManufacturer}
				/>
			</div>
			<div className={styles.filters__price}>
				<Accordion
					title={'Цена'}
					titleClass={`${styles.filters__manufacturer__btn} ${darkModeClass}`}
					arrowOpenClass={styles.open}
				>
					<div className={styles.filters__manufacturer__inner}>
						<PriceRange
							priceRange={priceRange}
							setPriceRange={setPriceRange}
							setIsPriceRangeChanged={setIsPriceRangeChanged}
						/>
						<div style={{ height: 24 }} />
					</div>
				</Accordion>
			</div>
			<div className={styles.filters__boiler_manufacturers}>
				<FilterManufacturerAccordion
					manufacturersList={partsManufacturers}
					title={'Производитель подкатегории товара'}
					setManufacturer={setPartsManufactures}
					updateManufacturer={updatePartsManufacturer}
				/>
			</div>
			<div className={styles.filters__actions}>
				<button
					className={styles.filters__actions__show}
					disabled={spinner || resetFilterBtnDisabled}
				>
					{spinner ? (
						<span
							className={spinnerStyles.spinner}
							style={{ top: 6, left: '47%' }}
						/>
					) : (
						'Показать'
					)}
				</button>
				<button
					className={styles.filters__actions__reset}
					disabled={resetFilterBtnDisabled}
					onClick={resetFilters}
				>
					Сбросить
				</button>
			</div>
		</div>
	);
};

export default CatalogFiltersDesktop;
