import { useStore } from 'effector-react';
import { AnimatePresence, motion } from 'framer-motion';
//======================================================
import { IManufacturesBlockProps } from '@/types/catalog';
import { $mode } from '@/context/mode';
import styles from '@/styles/catalog/index.module.scss';
import ManufacturersBlockItem from '@/components/modules/CatalogPage/ManufacturersBlockItem';

const ManufacturersBlock = ({
	title,
	event,
	manufacturersList,
}: IManufacturesBlockProps) => {
	const mode = useStore($mode);
	const darkModeClass = mode === 'dark' ? `${styles.dark_mode}` : '';
	const checkedItem = manufacturersList.filter((item) => {
		return item.checked;
	});

	return (
		<motion.div
			initial={{ opacity: 0 }}
			animate={{ opacity: 1 }}
			exit={{ opacity: 0 }}
			className={`${styles.dashboard__alert} ${darkModeClass}`}
		>
			<h3 className={`${styles.manufacturers__title} ${darkModeClass}`}>
				{title}:
			</h3>
			<ul className={styles.manufacturers__list}>
				<AnimatePresence>
					{checkedItem.map((item) => {
						return (
							<ManufacturersBlockItem item={item} event={event} key={item.id} />
						);
					})}
				</AnimatePresence>
			</ul>
		</motion.div>
	);
};

export default ManufacturersBlock;
