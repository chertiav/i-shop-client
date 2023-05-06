import styles from '@/styles/dashboard/index.module.scss';
import BrandSlider from '@/components/modules/DashboardPage/BrandSlider';
const DashboardPage = () => {
	return (
		<section className={styles.dashboard}>
			<div className={`container ${styles.dashboard__container}`}>
				<div className={styles.dashboard__brands}>
					<BrandSlider />
				</div>
			</div>
		</section>
	);
};

export default DashboardPage;
