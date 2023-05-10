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

export interface IPriceRangeProps {
	priceRange: number[];
	setPriceRange: (arg0: number[]) => void;
	setIsPriceRangeChanged: (arg0: boolean) => void;
}

export interface ICatalogFilterDesktopProps extends IPriceRangeProps {
	resetFilterBtnDisabled: boolean;
	spinner: boolean;
	resetFilters: VoidFunction;
	applyFilters: VoidFunction;
}

export interface ICatalogFiltersProps extends IPriceRangeProps {
	resetFilterBtnDisabled: boolean;
	resetFilters: VoidFunction;
	isPriceRangeChanged: boolean;
	currentPage: number;
	setIsFilterInQuery: (arg0: boolean) => void;
}
