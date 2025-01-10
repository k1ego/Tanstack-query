import { useMutation, useQueryClient } from '@tanstack/react-query';
import { todoListApi } from './api';
export function useToggleTodo() {
	const queryClient = useQueryClient();

	const updateTodoMutation = useMutation({
		mutationFn: todoListApi.updateTodo,
		onMutate: async newTodo => {
			// Отменяем текущие запросы, чтобы избежать конфликтов
			await queryClient.cancelQueries({
				queryKey: [todoListApi.baseKey],
			});

			// получаем данные из кеша и сохраняем текущий список задач для отката в случае ошибки
			const previousTodos = queryClient.getQueryData(
				todoListApi.getTodoListQueryOptions().queryKey
			);

			// получаем с этим новое значение в кеш - оптимистичное обновление
			queryClient.setQueryData(
				todoListApi.getTodoListQueryOptions().queryKey,
				old =>
					old?.map(todo =>
						todo.id === newTodo.id ? { ...todo, ...newTodo } : todo
					)
			);

			// возвращаем предыдущие значения в контексте для отката
			return { previousTodos };
		},

		// обратно возвращаем данные из контекста если ошибка
		onError: (_, __, context) => {
			if (context) {
				queryClient.setQueryData(
					todoListApi.getTodoListQueryOptions().queryKey,
					context.previousTodos
				);
			}
		},

		// инвалидируем запросы - перезапрашиваем в фоне
		onSettled: () => {
			queryClient.invalidateQueries({ queryKey: [todoListApi.baseKey] });
		},
	});

	const toggleTodo = (id: string, done: boolean) => {
		updateTodoMutation.mutate({
			id,
			done: !done,
		});
	};
	return {
		toggleTodo,
		isPending: updateTodoMutation.isPending,
	};
}
