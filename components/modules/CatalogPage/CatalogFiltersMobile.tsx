import { useState } from 'react';
import { useStore } from 'effector-react';
//=========================================
import { ICatalogFilterMobileProps } from '@/types/catalog';
import { $mode } from '@/context/mode';
import FiltersPopupTop from '@/components/modules/CatalogPage/FiltersPopupTop';
import FiltersPopup from '@/components/modules/CatalogPage/FiltersPopup';
import {
	$boilerManufacturers,
	$partsManufactures,
	setBoilerManufactures,
	setPartsManufactures,
	updateBoilerManufacturer,
	updatePartsManufacturer,
} from '@/context/boilerParts';
import Accordion from '@/components/elements/Accordion/Accordion';
import PriceRange from '@/components/modules/CatalogPage/PriceRange';
import { useMediaQuery } from '@/hooks/useMediaQuery';
import styles from '@/styles/catalog/index.module.scss';
import spinnerStyles from '@/styles/spinner/index.module.scss';

const CatalogFiltersMobile = ({
	spinner,
	resetFilterBtnDisabled,
	resetFilters,
	closePopup,
	applyFilters,
	setIsPriceRangeChanged,
	setPriceRange,
	priceRange,
	filterMobileOpen,
}: ICatalogFilterMobileProps) => {
	const boilerManufacturers = useStore($boilerManufacturers);
	const partsManufacturers = useStore($partsManufactures);
	const mode = useStore($mode);
	const darkModeClass = mode === 'dark' ? `${styles.dark_mode}` : '';
	const [openBoilers, setOpenBoilers] = useState(false);
	const [openParts, setOpenParts] = useState(false);
	const isMobile820 = useMediaQuery(820);
	const handleOpenBoilers = () => {
		return setOpenBoilers(true);
	};
	const handleCloseBoilers = () => {
		return setOpenBoilers(false);
	};
	const handleOpenParts = () => {
		return setOpenParts(true);
	};
	const handleCloseParts = () => {
		return setOpenParts(false);
	};
	const isAnyBoilerManufacturerChecked = boilerManufacturers.some((item) => {
		return item.checked;
	});
	const isAnyPartManufacturerChecked = partsManufacturers.some((item) => {
		return item.checked;
	});

	const resetAllBoilerManufacturers = () => {
		return setBoilerManufactures(
			boilerManufacturers.map((item) => {
				return { ...item, checked: false };
			})
		);
	};

	const resetAllPartsManufacturers = () => {
		return setPartsManufactures(
			partsManufacturers.map((item) => {
				return { ...item, checked: false };
			})
		);
	};

	const applyFiltersAndClosePopup = () => {
		applyFilters();
		closePopup();
	};
	return (
		<div
			className={`${styles.catalog__bottom__filters} ${darkModeClass} ${
				filterMobileOpen ? styles.open : ''
			}`}
		>
			<div className={styles.catalog__bottom__filters__inner}>
				<FiltersPopupTop
					resetBtnText={'Сбросить все'}
					title={'Фильтры'}
					resetFilters={resetFilters}
					resetFilterBtnDisabled={resetFilterBtnDisabled}
					closePopup={closePopup}
				/>
				<div className={styles.filters__boiler_manufacturers}>
					<button
						className={`${styles.filters__manufacturer__btn} ${darkModeClass}`}
						onClick={handleOpenBoilers}
					>
						Производитель товаров
					</button>
					<FiltersPopup
						title={'Производитель товаров'}
						resetFilterBtnDisabled={!isAnyBoilerManufacturerChecked}
						updateManufacturer={updateBoilerManufacturer}
						setManufacturer={setBoilerManufactures}
						applyFilters={applyFiltersAndClosePopup}
						manufacturersList={boilerManufacturers}
						resetAllManufacturers={resetAllBoilerManufacturers}
						handleClosePopup={handleCloseBoilers}
						openPopup={openBoilers}
					/>
				</div>
				<div className={styles.filters__boiler_manufacturers}>
					<button
						className={`${styles.filters__manufacturer__btn} ${darkModeClass}`}
						onClick={handleOpenParts}
					>
						Производитель подкатегории
					</button>
					<FiltersPopup
						title={'Производитель подкатегории'}
						resetFilterBtnDisabled={!isAnyPartManufacturerChecked}
						updateManufacturer={updatePartsManufacturer}
						setManufacturer={setPartsManufactures}
						applyFilters={applyFiltersAndClosePopup}
						manufacturersList={partsManufacturers}
						resetAllManufacturers={resetAllPartsManufacturers}
						handleClosePopup={handleCloseParts}
						openPopup={openParts}
					/>
				</div>
				<div className={styles.filters__price}>
					<Accordion
						title={'Цена'}
						titleClass={`${styles.filters__manufacturer__btn} ${darkModeClass}`}
						hideArrowClass={styles.hide_arrow}
						isMobileForFilters={isMobile820}
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
			</div>
			<div className={styles.filters__actions}>
				<button
					className={styles.filters__actions__show}
					onClick={applyFiltersAndClosePopup}
					disabled={resetFilterBtnDisabled}
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
			</div>
		</div>
	);
};

export default CatalogFiltersMobile;
