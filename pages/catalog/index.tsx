import Head from 'next/head';
import { useCallback } from 'react';
//============================================================
import CatalogPage from '@/components/templates/CatlogPage/CatalogPage';
import Layout from '@/components/layout/Layout';
import Breadcrumbs from '@/components/modules/BreadCrumbs/BreadCrumbs';
import useRedirectByUserCheck from '@/hooks/useRedirectByUserCheck';
import { IQueryParams } from '@/types/catalog';

const Catalog = ({ query }: { query: IQueryParams }) => {
	const { shouldLoadContent } = useRedirectByUserCheck();
	const getDefaultTextGenerator = useCallback(() => {
		return 'Каталог';
	}, []);
	const getTextGenerator = useCallback((param: string) => {
		return {}[param];
	}, []);

	return (
		<>
			<Head>
				<title>Магазина | {shouldLoadContent ? 'Каталог' : ''}</title>
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
						<CatalogPage query={query} />
						<div className={'overlay'} />
					</main>
				</Layout>
			)}
		</>
	);
};

export async function getServerSideProps(context: { query: IQueryParams }) {
	return {
		props: {
			query: { ...context.query },
		},
	};
}

export default Catalog;
