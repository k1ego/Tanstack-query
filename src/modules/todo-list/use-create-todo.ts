import { useMutation, useQueryClient } from '@tanstack/react-query';
import { nanoid } from 'nanoid';
import { todoListApi } from './api';
export function useCreateTodo() {
	const queryClient = useQueryClient();

	const createTodoMutation = useMutation({
		mutationFn: todoListApi.createTodo,
		async onSettled() {
			await queryClient.invalidateQueries({ queryKey: [todoListApi.baseKey] });
		},
	});

	const handleCreate = (e: React.FormEvent<HTMLFormElement>) => {
		// предотвращает дефолтную перезагрузку страницу при отправке формы
		e.preventDefault();

		// используется для сбора данных из формы
		const formData = new FormData(e.currentTarget);

		// извлекает значение поля с атрибутом name="text"
		const text = String(formData.get('text') ?? '');

		// метод для запуска мутаций
		createTodoMutation.mutate({
			id: nanoid(),
			done: false,
			text: text,
			userId: '1',
		});

		// очищает все поля формы после успешной отправки
		e.currentTarget.reset();
	};
	return {
		handleCreate,
		isPending: createTodoMutation.isPending,
	};
}
