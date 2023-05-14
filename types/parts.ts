import * as React from 'react';

export interface IPartImageItemProps {
	src: string;
	callback: (arg0: string) => void;
	alt: string;
}

export interface IPartAccordionProps {
	children: React.ReactNode;
	title: string;
}
