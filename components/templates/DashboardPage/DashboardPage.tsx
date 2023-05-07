import { useEffect, useState } from 'react';
import { useStore } from 'effector-react';
import { toast } from 'react-toastify';
import { AnimatePresence, motion } from 'framer-motion';
//================================================
import DashboardSlider from '@/components/modules/DashboardPage/DashboardSlider';
import BrandSlider from '@/components/modules/DashboardPage/BrandSlider';
import CartAlert from '@/components/modules/DashboardPage/CartAlert';
import { getBestsellersOrNewPartsFx } from '@/app/api/boilerParts';
import { IBoilerParts } from '@/types/boilerparts';
import { $shoppingCart } from '@/context/shoping-cart';
import { $mode } from '@/context/mode';
import styles from '@/styles/dashboard/index.module.scss';

const DashboardPage = () => {
	const [newParts, setNewParts] = useState<IBoilerParts>({} as IBoilerParts);
	const [bestsellers, setBestsellers] = useState<IBoilerParts>(
		{} as IBoilerParts
	);
	const [spinner, setSpinner] = useState(false);
	const shoppingCart = useStore($shoppingCart);
	const [showAlert, setShowAlert] = useState(!!shoppingCart.length);
	const mode = useStore($mode);
	const darkModeClass = mode === 'dark' ? `${styles.dark_mode}` : '';

	useEffect(() => {
		loadBoilerParts();
	}, []);

	const closeAlert = () => {
		return setShowAlert(false);
	};

	const loadBoilerParts = async () => {
		try {
			setSpinner(true);
			const bestsellers = await getBestsellersOrNewPartsFx(
				'/boiler-parts/bestsellers'
			);
			const newParts = await getBestsellersOrNewPartsFx('/boiler-parts/new');
			setBestsellers(bestsellers);
			setNewParts(newParts);
		} catch (error) {
			toast.error((error as Error).message);
		} finally {
			setSpinner(false);
		}
	};

	return (
		<section className={styles.dashboard}>
			<div className={`container ${styles.dashboard__container}`}>
				<AnimatePresence>
					{showAlert && (
						<motion.div
							initial={{ opacity: 0 }}
							animate={{ opacity: 1 }}
							exit={{ opacity: 0 }}
							className={`${styles.dashboard__alert} ${darkModeClass}`}
						>
							<CartAlert closeAlert={closeAlert} count={shoppingCart.length} />
						</motion.div>
					)}
				</AnimatePresence>
				<div className={styles.dashboard__brands}>
					<BrandSlider />
				</div>
				<h2 className={`${styles.dashboard__title} ${darkModeClass}`}>
					Детали для газовых котлов
				</h2>
				<div className={styles.dashboard__parts}>
					<h3 className={`${styles.dashboard__parts__title} ${darkModeClass}`}>
						Хиты продаж
					</h3>
					<DashboardSlider items={bestsellers.rows || []} spinner={spinner} />
				</div>
				<div className={styles.dashboard__parts}>
					<h3 className={`${styles.dashboard__parts__title} ${darkModeClass}`}>
						Новинки
					</h3>
					<DashboardSlider items={newParts.rows || []} spinner={spinner} />
				</div>
				<div className={styles.dashboard__about}></div>
				<h3
					className={`${styles.dashboard__parts__title} ${styles.dashboard__about__title} ${darkModeClass}`}
				>
					О компании
				</h3>
				<p className={`${styles.dashboard__about__text} ${darkModeClass}`}>
					Инструкции и схемы помогут разобраться в эксплуатации, определить
					неисправность и правильно выбрать запчасть для ремонта Вашего газового
					оборудования. Купить запчасть, деталь для ремонта газового котла
					возможно в любом населенном пункте Страны: Осуществляем доставку
					запчасти к газовым котлам в следующие города: ...
				</p>
			</div>
		</section>
	);
};

export default DashboardPage;
