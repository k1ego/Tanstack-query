// теперь Suspense это не только ленивая подгрузка компонентов, но и данных

import { QueryErrorResetBoundary } from '@tanstack/react-query';
import { Suspense } from 'react';
import { ErrorBoundary } from 'react-error-boundary';

export function Loader({ children }: { children: React.ReactNode }) {
	return (
		<QueryErrorResetBoundary>
			{({ reset }) => (
				<ErrorBoundary
					onReset={reset}
					fallbackRender={({ resetErrorBoundary }) => (
						<div>
							There was an error!
							<button onClick={() => resetErrorBoundary()}>Try again</button>
						</div>
					)}
				>
					<Suspense
						fallback={
							<div className='fixed inset-0 bg-white flex justify-center items-center'>
								<div className='text-teal-500 font-bold text-2xl'>
									Loading...
								</div>
							</div>
						}
					>
						{children}
					</Suspense>
				</ErrorBoundary>
			)}
		</QueryErrorResetBoundary>
	);
}

/* Как это работает?
Suspense:

1) Приостанавливает рендеринг компонента до тех пор, пока данные не будут загружены.

2) Если данные загружаются успешно, компонент продолжает рендеринг.

3) Если возникает ошибка (например, запрос данных завершился неудачно), Suspense передаёт эту ошибку в ближайший Error Boundary.

Error Boundary:

1) Перехватывает ошибки, которые возникают в компонентах, находящихся внутри него.

2) Отображает запасной интерфейс (fallback UI) вместо сломанного компонента. */