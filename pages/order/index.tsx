import Head from 'next/head';
//=========================================================
import Layout from '@/components/layout/Layout';
import OrderPage from '@/components/templates/OrderPage/OrderPage';
import useRedirectByUserCheck from '@/hooks/useRedirectByUserCheck';
import Breadcrumbs from '@/components/modules/BreadCrumbs/BreadCrumbs';
import { useCallback } from 'react';

const Order = () => {
	const { shouldLoadContent } = useRedirectByUserCheck();
	const getDefaultTextGenerator = useCallback(() => {
		return 'Оформление заказа';
	}, []);
	const getTextGenerator = useCallback((param: string) => {
		return {}[param];
	}, []);
	return (
		<>
			<Head>
				<title>
					Наименование магазина | {shouldLoadContent ? 'Оплата заказа' : ''}
				</title>
				<meta charSet="UTF-8" />
				<meta httpEquiv="X-UA-Compatible" content="IE-edge" />
				<meta name="viewport" content="width=device-width, initial-scale=1.0" />
				<link rel="icon" type="image/svg" sizes="32x32" href="/img/logo.svg" />
			</Head>
			{shouldLoadContent && (
				<Layout>
					<main>
						<Breadcrumbs
							getDefaultTextGenerator={getDefaultTextGenerator}
							getTextGenerator={getTextGenerator}
						/>
						<OrderPage />
						<div className={'overlay'} />
					</main>
				</Layout>
			)}
		</>
	);
};

export default Order;
