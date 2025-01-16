// теперь Suspense это не только ленивая подгрузка компонентов, но и данных

import { Suspense } from 'react';

export function Loader({ children }: { children: React.ReactNode }) {
	return (
		<Suspense
			fallback={
				<div className='fixed inset-0 bg-white flex justify-center items-center'>
					<div className='text-teal-500 font-bold text-2xl'>Loading...</div>
				</div>
			}
		>
			{children}
		</Suspense>
	);
}
