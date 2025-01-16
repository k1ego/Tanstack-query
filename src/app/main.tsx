import { createSyncStoragePersister } from '@tanstack/query-sync-storage-persister';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { PersistQueryClientProvider } from '@tanstack/react-query-persist-client';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { queryClient } from '../shared/api/query-client';
import { store } from '../shared/redux';
import { App } from './app';
import './index.css';
import { onlineManager } from '@tanstack/react-query';

// позволяет React Query автоматически реагировать на изменения сетевого статуса (онлайн/оффлайн) и соответствующим образом управлять запросами
onlineManager.setOnline(navigator.onLine)

const persister = createSyncStoragePersister({
	storage: window.localStorage,
});

createRoot(document.getElementById('root')!).render(
	<StrictMode>
		<PersistQueryClientProvider
			client={queryClient}
			persistOptions={{ persister }}
			// вызывается когда наступает окончание доставания данных из персистера
			onSuccess={() => {
				queryClient.resumePausedMutations().then(() => {
					queryClient.invalidateQueries();
				});
			}}
		>
			<Provider store={store}>
				<App />
			</Provider>
			<ReactQueryDevtools initialIsOpen={false} />
		</PersistQueryClientProvider>
	</StrictMode>
);
