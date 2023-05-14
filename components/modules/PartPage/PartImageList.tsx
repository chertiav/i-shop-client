/* eslint-disable @next/next/no-img-element */
import { useState } from 'react';
import { useStore } from 'effector-react';
//================================================
import { $boilerPart } from '@/context/boilerPart';
import { useMediaQuery } from '@/hooks/useMediaQuery';
import styles from '@/styles/part/index.module.scss';
import PartImageItem from '@/components/modules/PartPage/PartImageItem';
import PartSlider from '@/components/modules/PartPage/PartSlider';

const PartImageList = () => {
	const isMobile820 = useMediaQuery(850);
	const boilerPart = useStore($boilerPart);
	const images = boilerPart.images ? boilerPart.images : [];
	const [currentImgSrc, setCurrentImgSrc] = useState('');

	return (
		<div className={styles.part__images}>
			{isMobile820 ? (
				<PartSlider images={images} />
			) : (
				<>
					<div className={styles.part__images__main}>
						<img src={currentImgSrc || images[0]} alt={boilerPart.name} />
					</div>
					<ul className={styles.part__images__list}>
						{images.map((item, index) => {
							return (
								<PartImageItem
									key={index}
									src={item}
									alt={`image - ${index + 1}`}
									callback={setCurrentImgSrc}
								/>
							);
						})}
					</ul>
				</>
			)}
		</div>
	);
};

export default PartImageList;
