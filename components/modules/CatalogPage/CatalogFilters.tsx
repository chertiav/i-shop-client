import { useMediaQuery } from '@/hooks/useMediaQuery';
import CatalogFiltersDesktop from '@/components/modules/CatalogPage/CatalogFiltersDesktop';
import { ICatalogFiltersProps } from '@/types/catalog';
import { useState } from 'react';

const CatalogFilters = ({
	priceRange,
	setPriceRange,
	setIsPriceRangeChanged,
	resetFilterBtnDisabled,
	resetFilters,
}: ICatalogFiltersProps) => {
	const isMobile820 = useMediaQuery(820);
	const [spinner, setSpinner] = useState(false);

	return isMobile820 ? (
		<div />
	) : (
		<CatalogFiltersDesktop
			priceRange={priceRange}
			setPriceRange={setPriceRange}
			setIsPriceRangeChanged={setIsPriceRangeChanged}
			resetFilterBtnDisabled={resetFilterBtnDisabled}
			spinner={spinner}
			resetFilters={resetFilters}
		/>
	);
};

export default CatalogFilters;
