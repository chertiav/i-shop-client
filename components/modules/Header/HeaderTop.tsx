import { useStore } from 'effector-react';
import Link from 'next/link';
//=============================
import { useMediaQuery } from '@/hooks/useMediaQuery';
import ModeToggler from '@/components/elements/ModeToggler/ModeToggler';
import CityButton from '@/components/elements/CityButton/CityButton';
import ProfileDropdawn from '@/components/modules/Header/ProfileDropdawn';
import { $mode } from '@/context/mode';
import styles from '@/styles/header/index.module.scss';
import { usePopup } from '@/hooks/usePopup';

const HeaderTop = () => {
	const isMedia950 = useMediaQuery(950);
	const { open, toggleOpen, closePopup } = usePopup();
	const mode = useStore($mode);
	const darkModeClass = mode === 'dark' ? `${styles.dark_mode}` : '';

	return (
		<div className={styles.header__top}>
			<div className={`container ${styles.header__top__container}`}>
				{!isMedia950 && <CityButton />}
				{isMedia950 && (
					<button
						onClick={toggleOpen}
						className={`${styles.burger_menu}  ${
							open ? styles.open : ''
						} ${darkModeClass}`}
					>
						<span />
						<span />
						<span />
					</button>
				)}
				<nav
					className={`${styles.header__nav} ${
						open ? styles.open : ''
					} ${darkModeClass}`}
				>
					<ul className={styles.header__nav__list}>
						<li className={styles.header__nav__list__item}>
							<Link
								onClick={closePopup}
								href="/shoping-payment"
								passHref
								legacyBehavior
							>
								<a
									className={`${styles.header__nav__list__item__link} ${darkModeClass}`}
								>
									Доставка и оплата
								</a>
							</Link>
						</li>
						<li className={styles.header__nav__list__item}>
							<Link onClick={closePopup} href="/about" passHref legacyBehavior>
								<a
									className={`${styles.header__nav__list__item__link} ${darkModeClass}`}
								>
									О компании
								</a>
							</Link>
						</li>
						<li className={styles.header__nav__list__item}>
							<Link
								onClick={closePopup}
								href="/catalog"
								passHref
								legacyBehavior
							>
								<a
									className={`${styles.header__nav__list__item__link} ${darkModeClass}`}
								>
									Каталог
								</a>
							</Link>
						</li>
						<li className={styles.header__nav__list__item}>
							<Link
								onClick={closePopup}
								href="/contacts"
								passHref
								legacyBehavior
							>
								<a
									className={`${styles.header__nav__list__item__link} ${darkModeClass}`}
								>
									Контакты
								</a>
							</Link>
						</li>
						<li className={styles.header__nav__list__item}>
							<Link
								onClick={closePopup}
								href="/wholesale-byers"
								passHref
								legacyBehavior
							>
								<a
									className={`${styles.header__nav__list__item__link} ${darkModeClass}`}
								>
									Оптовым покупателям
								</a>
							</Link>
						</li>
						{isMedia950 && (
							<li className={styles.header__nav__list__item}>
								<CityButton />
							</li>
						)}
						{isMedia950 && (
							<li className={styles.header__nav__list__item}>
								<ModeToggler />
							</li>
						)}
					</ul>
				</nav>
				<ProfileDropdawn />
			</div>
		</div>
	);
};

export default HeaderTop;
