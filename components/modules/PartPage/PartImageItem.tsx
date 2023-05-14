/* eslint-disable @next/next/no-img-element */
import { IPartImageItemProps } from '@/types/parts';
import styles from '@/styles/part/index.module.scss';

const PartImageItem = ({ src, callback, alt }: IPartImageItemProps) => {
	const changeMainImage = () => {
		return callback(src);
	};

	return (
		<li className={styles.part__images__list__item} onClick={changeMainImage}>
			<img src={src} alt={alt} />
		</li>
	);
};

export default PartImageItem;
