import Header from '@/components/modules/Header/Header';
import Footer from '@/components/modules/Footer/Footer';
import { ILayoutProps } from '@/types/common';

const Layout = ({ children }: ILayoutProps) => {
	return (
		<>
			<Header />
			{children}
			<Footer />
		</>
	);
};

export default Layout;
