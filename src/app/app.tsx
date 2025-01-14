import { QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { Provider } from 'react-redux';
import { TodoList } from '../modules/todo-list/todo-list';
import { queryClient } from '../shared/api/query-client';
import { store } from '../shared/redux';

export function App() {
	return (
		<QueryClientProvider client={queryClient}>
			<Provider store={store}>
				<TodoList />
			</Provider>
			<ReactQueryDevtools initialIsOpen={false} />
		</QueryClientProvider>
	);
}
