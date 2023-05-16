import Head from 'next/head';
//============================================================
import Layout from '@/components/layout/Layout';
import ShippingPaymentPage from '@/components/templates/ShippingPaymentPage/ShippingPaymentPage';
import { useCallback } from 'react';
import Breadcrumbs from '@/components/templates/BreadCrumbs/BreadCrumbs';

const ShippingPayment = () => {
	const getDefaultTextGenerator = useCallback(() => {
		return 'Доставка и оплата';
	}, []);
	const getTextGenerator = useCallback((param: string) => {
		return {}[param];
	}, []);
	return (
		<>
			<Head>
				<title>Наименование магазина | Доставка и оплата</title>
				<meta charSet="UTF-8" />
				<meta httpEquiv="X-UA-Compatible" content="IE-edge" />
				<meta name="viewport" content="width=device-width, initial-scale=1.0" />
				<link rel="icon" type="image/svg" sizes="32x32" href="/img/logo.svg" />
			</Head>
			<Layout>
				<main>
					<Breadcrumbs
						getDefaultTextGenerator={getDefaultTextGenerator}
						getTextGenerator={getTextGenerator}
					/>
					<ShippingPaymentPage />
					<div className={'overlay'} />
				</main>
			</Layout>
		</>
	);
};

export default ShippingPayment;
