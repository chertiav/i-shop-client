import { Event } from 'effector-next';

export interface IManufacturesBlockProps {
	title: string;
	event: Event<IFilterCheckboxItem>;
	manufacturersList: IFilterCheckboxItem[];
}

export interface IManufacturesBlockItemProps {
	item: IFilterCheckboxItem;
	event: Event<IFilterCheckboxItem>;
}

export interface IQueryParams {
	offset: string;
	firs: string;
	boiler: string;
	parts: string;
	priceFrom: string;
	priceTo: string;
}

export interface IFilterCheckboxItem {
	title: string;
	checked: boolean;
	id?: string;
	event: Event<IFilterCheckboxItem>;
}

export interface IFilterManufacturesAccordionProps {
	manufacturersList: IFilterCheckboxItem[];
	title: string | false;
	setManufacturer: Event<IFilterCheckboxItem[]>;
	updateManufacturer: Event<IFilterCheckboxItem>;
}

export interface ICatalogBaseTypes {
	priceRange: number[];
	setPriceRange: (arg0: number[]) => void;
	setIsPriceRangeChanged: (arg0: boolean) => void;
}

export interface ICatalogFiltersBaseTypes {
	resetFilterBtnDisabled: boolean;
	resetFilters: VoidFunction;
}

export type IPriceRangeProps = ICatalogBaseTypes;

export interface ICatalogFiltersProps
	extends ICatalogBaseTypes,
		ICatalogFiltersBaseTypes {
	isPriceRangeChanged: boolean;
	currentPage: number;
	setIsFilterInQuery: (arg0: boolean) => void;
	closePopup: VoidFunction;
	filterMobileOpen: boolean;
}

export interface ICatalogFilterDesktopProps
	extends ICatalogBaseTypes,
		ICatalogFiltersBaseTypes {
	spinner: boolean;
	applyFilters: VoidFunction;
}

export interface ICatalogFilterMobileProps
	extends ICatalogBaseTypes,
		ICatalogFiltersBaseTypes {
	spinner: boolean;
	applyFilters: VoidFunction;
	closePopup: VoidFunction;
	filterMobileOpen: boolean;
}

export interface IFiltersPopupTop {
	resetBtnText: string;
	title: string;
	resetFilters: VoidFunction;
	resetFilterBtnDisabled: boolean;
	closePopup: VoidFunction;
}

export interface IFilterPopupProp extends IFilterManufacturesAccordionProps {
	resetFilterBtnDisabled: boolean;
	resetAllManufacturers: VoidFunction;
	handleClosePopup: VoidFunction;
	applyFilters: VoidFunction;
	openPopup: boolean;
}
