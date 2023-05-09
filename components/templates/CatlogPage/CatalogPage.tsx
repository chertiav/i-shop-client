import { useEffect, useState } from 'react';
import { useStore } from 'effector-react';
import { toast } from 'react-toastify';
import { AnimatePresence } from 'framer-motion';
import ReactPaginate from 'react-paginate';
//============================================
import ManufacturersBlock from '@/components/modules/CatalogPage/ManufacturersBlock';
import CatalogItem from '@/components/modules/CatalogPage/CatalogItem';
import FilterSelect from '@/components/modules/CatalogPage/FilterSelect';
import { getBoilerPartsFx } from '@/app/api/boilerParts';
import {
	$boilerManufacturers,
	$boilerParts,
	$partsManufactures,
	setBoilerManufactures,
	setBoilerParts,
	setPartsManufactures,
	updateBoilerManufacturer,
	updatePartsManufacturer,
} from '@/context/boilerParts';
import { $mode } from '@/context/mode';
import skeletonStyles from '@/styles/skeleton/index.module.scss';
import styles from '@/styles/catalog/index.module.scss';
import { IQueryParams } from '@/types/catalog';
import { useRouter } from 'next/router';
import { IBoilerParts } from '@/types/boilerparts';
import CatalogFilters from '@/components/modules/CatalogPage/CatalogFilters';

const CatalogPage = ({ query }: { query: IQueryParams }) => {
	const router = useRouter();
	const mode = useStore($mode);
	const boilerParts = useStore($boilerParts);
	const boilerManufacturers = useStore($boilerManufacturers);
	const partsManufacturers = useStore($partsManufactures);
	const darkModeClass = mode === 'dark' ? `${styles.dark_mode}` : '';
	const [spinner, setSpinner] = useState(false);
	const [priceRange, setPriceRange] = useState([1000, 9000]);
	const [isPriceChanged, setIsPriceRangeChanged] = useState(false);

	const isValidOffset =
		query.offset && !isNaN(+query.offset) && +query.offset > 0;
	const [currentPage, setCurrentPage] = useState(
		isValidOffset ? +query.offset - 1 : 0
	);
	const pagesCount = Math.ceil(boilerParts.count / 20);
	const isAnyBoilerManufacturerChecked = boilerManufacturers.some((item) => {
		return item.checked;
	});
	const isAnyPartManufacturerChecked = partsManufacturers.some((item) => {
		return item.checked;
	});
	const resetFilterBtnDisabled = !(
		isPriceChanged ||
		isAnyBoilerManufacturerChecked ||
		isAnyPartManufacturerChecked
	);

	const resetPagination = (data: IBoilerParts) => {
		setCurrentPage(0);
		setBoilerParts(data);
	};

	useEffect(() => {
		loadBoilerParts();
	}, []);
	const loadBoilerParts = async () => {
		try {
			setSpinner(true);
			const data = await getBoilerPartsFx('/boiler-parts?limit=20&offset=0');
			if (!isValidOffset) {
				router.replace({
					query: {
						offset: 1,
					},
				});
				resetPagination(data);
				return;
			}
			if (isValidOffset) {
				if (+query.offset > Math.ceil(data.count / 20)) {
					router.push(
						{
							query: {
								...query,
								offset: 1,
							},
						},
						undefined,
						{ shallow: true }
					);
					setCurrentPage(0);
					setBoilerParts(data);
					return;
				}
				const offset = +query.offset - 1;
				const result = await getBoilerPartsFx(
					`/boiler-parts?limit=20&offset=${offset}`
				);
				setCurrentPage(offset);
				setBoilerParts(result);
				return;
			}
			setCurrentPage(0);
			setBoilerParts(data);
		} catch (error) {
			toast.error((error as Error).message);
		} finally {
			setSpinner(false);
		}
	};

	const handlePageChange = async ({ selected }: { selected: number }) => {
		try {
			const data = await getBoilerPartsFx('/boiler-parts?limit=20&offset=0');
			if (selected > pagesCount) {
				resetPagination(data);
				return;
			}
			if (isValidOffset && +query.offset > Math.ceil(data.count / 20)) {
				resetPagination(data);
				return;
			}
			const result = await getBoilerPartsFx(
				`/boiler-parts?limit=20&offset=${selected}`
			);
			router.push(
				{
					query: {
						...router.query,
						offset: selected + 1,
					},
				},
				undefined,
				{ shallow: true }
			);
			setCurrentPage(selected);
			setBoilerParts(result);
		} catch (e) {
			toast.error((e as Error).message);
		}
	};

	const resetFilters = async () => {
		try {
			const data = await getBoilerPartsFx('/boiler-parts?limit=20&offset=0');
			setBoilerManufactures(
				boilerManufacturers.map((item) => {
					return { ...item, checked: false };
				})
			);
			setPartsManufactures(
				boilerManufacturers.map((item) => {
					return { ...item, checked: false };
				})
			);
			setBoilerParts(data);
			setPriceRange([1000, 9000]);
			setIsPriceRangeChanged(false);
		} catch (e) {
			toast.error((e as Error).message);
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
						{isAnyBoilerManufacturerChecked && (
							<ManufacturersBlock
								event={updateBoilerManufacturer}
								manufacturersList={boilerManufacturers}
								title={'Производитель типа товаров'}
							/>
						)}
					</AnimatePresence>
					<AnimatePresence>
						{isAnyPartManufacturerChecked && (
							<ManufacturersBlock
								event={updatePartsManufacturer}
								manufacturersList={partsManufacturers}
								title={'Производитель подтипа товаров'}
							/>
						)}
					</AnimatePresence>
					<div className={styles.catalog__top__inner}>
						<button
							className={`${styles.catalog__top__reset} ${darkModeClass}`}
							disabled={resetFilterBtnDisabled}
							onClick={resetFilters}
						>
							Сбросить фильтр
						</button>
						<FilterSelect />
					</div>
				</div>
				<div className={`${styles.catalog__bottom} ${darkModeClass}`}>
					<div className={styles.catalog__bottom__inner}>
						<CatalogFilters
							priceRange={priceRange}
							setPriceRange={setPriceRange}
							setIsPriceRangeChanged={setIsPriceRangeChanged}
							resetFilterBtnDisabled={resetFilterBtnDisabled}
							resetFilters={resetFilters}
						/>
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
					<ReactPaginate
						containerClassName={styles.catalog__bottom__list}
						pageClassName={styles.catalog__bottom__list__item}
						pageLinkClassName={styles.catalog__bottom__list__item__link}
						previousClassName={styles.catalog__bottom__list__prev}
						nextClassName={styles.catalog__bottom__list__next}
						breakClassName={styles.catalog__bottom__list__break}
						breakLinkClassName={`${styles.catalog__bottom__list__break__link} ${darkModeClass}`}
						breakLabel={'...'}
						pageCount={pagesCount}
						forcePage={currentPage}
						onPageChange={handlePageChange}
					/>
				</div>
			</div>
		</section>
	);
};

export default CatalogPage;
