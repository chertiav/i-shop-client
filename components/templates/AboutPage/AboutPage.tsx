import { useStore } from 'effector-react';
import { $mode } from '@/context/mode';
import styles from '@/styles/about/index.module.scss';

const AboutPage = () => {
	const mode = useStore($mode);
	const darkModeClass = mode === 'dark' ? `${styles.dark_mode}` : '';

	return (
		<section className={styles.about}>
			<div className={'container'}>
				<h2 className={`${styles.about__title} ${darkModeClass}`}>
					О компании
				</h2>
				<div className={styles.about__inner}>
					<div className={`${styles.about__info} ${darkModeClass}`}>
						<p>
							Компания &quot;Название компании&quot; предлагает Вам продукцию
							для Ваших потребностей. 99% наименований продукции на сайте
							постоянно поддерживаются в наличии на нашем складе.
						</p>
						<p>
							Ассортимент интернет-магазина &quot;Название компании&quot;
							включает в себя товыры разных производителей Arderia, Ariston,
							Baxi, Beretta, Bosch, Buderus, Chaffoteaux, De Dietrich, Demrad,
							Electrolux, Ferroli, Fondital, Immergas, Junkers, Koreastar, Nova
							Florida, Saunier Duval, Sime, Tiberis, Vaillant, Viessmann,
							Westen.
						</p>
					</div>
					<div className={`${styles.about__img} ${styles.about__img__top}`}>
						<img src="/img/about-img.png" alt="image-1" />
					</div>
					<div className={`${styles.about__img} ${styles.about__img__bottom}`}>
						<img src="/img/about-img-2.png" alt="image-2" />
					</div>
				</div>
			</div>
		</section>
	);
};

export default AboutPage;
