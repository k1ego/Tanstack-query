import { useMutation, useQueryClient } from '@tanstack/react-query';
import { todoListApi } from './api';
export function useDeleteTodo() {
	const queryClient = useQueryClient();

	const deleteTodoMutation = useMutation({
		mutationFn: todoListApi.deleteTodo,
		async onSettled() {
			queryClient.invalidateQueries(todoListApi.getTodoListQueryOptions());
		},

		// внесем вручную изменения в кеш
		async onSuccess(_, deletedId) {
			const todos = queryClient.getQueryData(
				todoListApi.getTodoListQueryOptions().queryKey
			);
			if (todos) {
				queryClient.setQueryData(
					todoListApi.getTodoListQueryOptions().queryKey,
					todos.filter(item => item.id !== deletedId)
				);
			}
		},
	});

	// Паттерн Pissimistic update

	return {
		handleDelete: deleteTodoMutation.mutate,
		isPending: deleteTodoMutation.isPending,
	};
}
