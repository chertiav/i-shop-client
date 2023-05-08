import { useStore } from 'effector-react';
//===============================================================
import { $mode } from '@/context/mode';
import { useMediaQuery } from '@/hooks/useMediaQuery';
import { IFilterManufacturesAccordionProps } from '@/types/catalog';
import Accordion from '@/components/elements/Accordion/Accordion';
import FilterCheckBoxItem from '@/components/modules/CatalogPage/FilterCheckBoxItem';
import styles from '@/styles/catalog/index.module.scss';

const FilterManufacturerAccordion = ({
	manufacturersList,
	title,
	setManufacturer,
	updateManufacturer,
}: IFilterManufacturesAccordionProps) => {
	const isMobile820 = useMediaQuery(820);
	const mode = useStore($mode);
	const darkModeClass = mode === 'dark' ? `${styles.dark_mode}` : '';

	const chooseAllManufacrurers = () => {
		return setManufacturer(
			manufacturersList.map((item) => {
				return {
					...item,
					checked: true,
				};
			})
		);
	};

	return (
		<Accordion
			title={title}
			titleClass={`${styles.filters__manufacturer__btn} ${darkModeClass}`}
			arrowOpenClass={styles.open}
			isMobileForFilters={isMobile820}
			hideArrowClass={isMobile820 ? styles.hide_arrow : ''}
		>
			<div
				className={`${styles.filters__manufacturer__inner} ${darkModeClass}`}
			>
				<button
					className={`${styles.filters__manufacturer__select_all} ${darkModeClass}`}
					onClick={chooseAllManufacrurers}
				>
					Выбрать все
				</button>
				<ul className={styles.filters__manufacturer__list}>
					{manufacturersList.map((item) => {
						return (
							<FilterCheckBoxItem
								key={item.id}
								title={item.title}
								checked={item.checked}
								event={updateManufacturer}
							/>
						);
					})}
				</ul>
				<div style={{ height: 24 }} />
			</div>
		</Accordion>
	);
};

export default FilterManufacturerAccordion;
