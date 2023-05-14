import Head from 'next/head';
//=========================================================
import Layout from '@/components/layout/Layout';
import OrderPage from '@/components/templates/OrderPage/OrderPage';
import useRedirectByUserCheck from '@/hooks/useRedirectByUserCheck';

const Order = () => {
	const { shouldLoadContent } = useRedirectByUserCheck();
	return (
		<>
			<Head>
				<title>
					Наименование магазина | {shouldLoadContent ? 'Главная' : ''}
				</title>
				<meta charSet="UTF-8" />
				<meta httpEquiv="X-UA-Compatible" content="IE-edge" />
				<meta name="viewport" content="width=device-width, initial-scale=1.0" />
				<link rel="icon" type="image/svg" sizes="32x32" href="/img/logo.svg" />
			</Head>
			{shouldLoadContent && (
				<Layout>
					<main>
						<OrderPage />
						<div className={'overlay'} />
					</main>
				</Layout>
			)}
		</>
	);
};

export default Order;
