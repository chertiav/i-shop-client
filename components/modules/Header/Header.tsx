import HeaderTop from '@/components/modules/Header/HeaderTop';
import styles from '@/styles/header/index.module.scss';

const Header = () => {
	return (
		<header className={styles.header}>
			<HeaderTop />
		</header>
	);
};

export default Header;
