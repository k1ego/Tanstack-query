import { useQueryClient } from '@tanstack/react-query';
import { useAppDispath } from '../../shared/redux';
import { createTodoThunk, useCreateLoading } from './create-todo-thunk';
export function useCreateTodo() {
	const appDispatch = useAppDispath();
	const isLoading = useCreateLoading();

	const queryClient = useQueryClient();

	const handleCreate = async (e: React.FormEvent<HTMLFormElement>) => {
		// предотвращает дефолтную перезагрузку страницу при отправке формы
		e.preventDefault();

		// используется для сбора данных из формы
		const formData = new FormData(e.currentTarget);

		// извлекает значение поля с атрибутом name="text"
		const text = String(formData.get('text') ?? '');

		appDispatch(createTodoThunk(text));

		// очищает все поля формы после успешной отправки
		e.currentTarget.reset();
	};
	return {
		handleCreate,
		isLoading,
	};
}
