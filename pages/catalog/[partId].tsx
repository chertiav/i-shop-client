import Head from 'next/head';
import { useStore } from 'effector-react';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
//============================================================
import { getBoilerPartFx } from '@/app/api/boilerParts';
import { $boilerPart, setBoilerPart } from '@/context/boilerPart';
import Layout from '@/components/layout/Layout';
import PartPage from '@/components/templates/PartPage/PartPage';
import Custom404 from '@/pages/404';
import useRedirectByUserCheck from '@/hooks/useRedirectByUserCheck';
import { IQueryParams } from '@/types/catalog';
import { toast } from 'react-toastify';

const CatalogPartPage = ({ query }: { query: IQueryParams }) => {
	const { shouldLoadContent } = useRedirectByUserCheck();
	const boilerPart = useStore($boilerPart);
	const [error, setError] = useState(false);
	const router = useRouter();

	const loadBoilerPart = async () => {
		try {
			const data = await getBoilerPartFx(`/boiler-parts/find/${query.partId}`);
			if (!data) {
				setError(true);
				return;
			}
			setBoilerPart(data);
		} catch (e) {
			if (isNaN(Number(router.query.partId))) {
				setError(true);
				return;
			}
			toast.error((e as Error).message);
		}
	};

	useEffect(() => {
		loadBoilerPart();
	}, [router.push]);

	return (
		<>
			<Head>
				<title>Магазин | {shouldLoadContent ? boilerPart.name : ''}</title>
				<meta charSet="UTF-8" />
				<meta httpEquiv="X-UA-Compatible" content="IE-edge" />
				<meta name="viewport" content="width=device-width, initial-scale=1.0" />
				<link rel="icon" type="image/svg" sizes="32x32" href="/img/logo.svg" />
			</Head>
			{error ? (
				<Custom404 />
			) : (
				shouldLoadContent && (
					<Layout>
						<main>
							<PartPage />
							<div className={'overlay'} />
						</main>
					</Layout>
				)
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

export default CatalogPartPage;
