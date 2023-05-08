import { useStore } from 'effector-react';
import {
	$boilerManufacturers,
	$partsManufactures,
	setBoilerManufactures,
	setPartsManufactures,
	updateBoilerManufacturer,
	updatePartsManufacturer,
} from '@/context/boilerParts';
import FilterManufacturerAccordion from '@/components/modules/CatalogPage/FilterManufacturerAccordion';
import { $mode } from '@/context/mode';
import styles from '@/styles/catalog/index.module.scss';

const CatalogFiltersDesktop = () => {
	const boilerManufacturer = useStore($boilerManufacturers);
	const partsManufactures = useStore($partsManufactures);
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
					manufacturersList={boilerManufacturer}
					title={'Производитель товара'}
					setManufacturer={setBoilerManufactures}
					updateManufacturer={updateBoilerManufacturer}
				/>
			</div>
			<div className={styles.filters__boiler_manufacturers}>
				<FilterManufacturerAccordion
					manufacturersList={partsManufactures}
					title={'Производитель подкатегории товара'}
					setManufacturer={setPartsManufactures}
					updateManufacturer={updatePartsManufacturer}
				/>
			</div>
		</div>
	);
};

export default CatalogFiltersDesktop;
