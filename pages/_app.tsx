import React, { useEffect, useState } from 'react';
import { withHydrate } from 'effector-next';
import { ToastContainer } from 'react-toastify';
import NextNProgress from 'nextjs-progressbar';
import type { AppProps } from 'next/app';
import 'react-toastify/dist/ReactToastify.css';
//===============================================
import '@/styles/globals.css';

const enhance = withHydrate();

function App({ Component, pageProps }: AppProps) {
	const [mounted, setMounted] = useState(false);

	useEffect(() => {
		setMounted(true);
	}, []);
	return (
		mounted && (
			<>
				<NextNProgress />
				<Component {...pageProps} />
				<ToastContainer
					position={'bottom-right'}
					hideProgressBar={false}
					closeOnClick
					rtl={false}
					limit={1}
					theme={'light'}
				/>
			</>
		)
	);
}

export default enhance(App as React.FC<AppProps>);
