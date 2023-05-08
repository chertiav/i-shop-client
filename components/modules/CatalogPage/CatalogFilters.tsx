import { useMediaQuery } from '@/hooks/useMediaQuery';
import CatalogFiltersDesktop from '@/components/modules/CatalogPage/CatalogFiltersDesktop';

const CatalogFilters = () => {
	const isMobile820 = useMediaQuery(820);
	return isMobile820 ? <div /> : <CatalogFiltersDesktop />;
};

export default CatalogFilters;
