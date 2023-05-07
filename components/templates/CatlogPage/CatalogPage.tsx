import { AnimatePresence } from 'framer-motion';
import { useEffect, useState } from 'react';
import { useStore } from 'effector-react';
import { toast } from 'react-toastify';
//============================================
import ManufacturesBlock from '@/components/modules/CatalogPage/ManufacturesBlock';
import CatalogItem from '@/components/modules/CatalogPage/CatalogItem';
import FilterSelect from '@/components/modules/CatalogPage/FilterSelect';
import { getBoilerPartsFx } from '@/app/api/boilerParts';
import { $boilerParts, setBoilerParts } from '@/context/boilerParts';
import { $mode } from '@/context/mode';
import skeletonStyles from '@/styles/skeleton/index.module.scss';
import styles from '@/styles/catalog/index.module.scss';

const CatalogPage = () => {
	const boilerParts = useStore($boilerParts);
	const [spinner, setSpinner] = useState(false);
	const mode = useStore($mode);
	const darkModeClass = mode === 'dark' ? `${styles.dark_mode}` : '';

	useEffect(() => {
		loadBoilerParts();
	}, []);
	const loadBoilerParts = async () => {
		try {
			setSpinner(true);
			const data = await getBoilerPartsFx('/boiler-parts?limit=20&offset=0');
			setBoilerParts(data);
		} catch (error) {
			toast.error((error as Error).message);
		} finally {
			setSpinner(false);
		}
	};

	return (
		<section className={styles.catalog}>
			<div className={`container ${styles.catalog__container}`}>
				<h2 className={`${styles.catalog__title} ${darkModeClass}`}>
					Каталог товаров
				</h2>
				<div className={`${styles.catalog__top} ${darkModeClass}`}>
					<AnimatePresence>
						<ManufacturesBlock title={'Производитель типа товаров'} />
					</AnimatePresence>
					<AnimatePresence>
						<ManufacturesBlock title={'Производитель подтипа товаров'} />
					</AnimatePresence>
					<div className={styles.catalog__top__inner}>
						<button
							className={`${styles.catalog__top__reset} ${darkModeClass}`}
							disabled={true}
						>
							Сбросить фильтр
						</button>
						<FilterSelect />
					</div>
				</div>
				<div className={`${styles.catalog__bottom} ${darkModeClass}`}>
					<div className={styles.catalog__bottom__inner}>
						<div className="">Filters</div>
						{spinner ? (
							<ul className={skeletonStyles.skeleton}>
								{Array.from(new Array(8)).map((_, index) => {
									return (
										<li
											key={index}
											className={`${skeletonStyles.skeleton__item} ${
												mode === 'dark' ? `${skeletonStyles.dark_mode}` : ''
											}`}
										>
											<div className={skeletonStyles.skeleton__item__light} />
										</li>
									);
								})}
							</ul>
						) : (
							<ul className={styles.catalog__list}>
								{boilerParts.rows?.length ? (
									boilerParts.rows.map((item) => {
										return <CatalogItem item={item} key={item.id} />;
									})
								) : (
									<span>Список товаров пуст...</span>
								)}
							</ul>
						)}
					</div>
				</div>
			</div>
		</section>
	);
};

export default CatalogPage;
