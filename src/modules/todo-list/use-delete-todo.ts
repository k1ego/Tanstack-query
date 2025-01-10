import { useMutation, useQueryClient } from '@tanstack/react-query';
import { todoListApi } from './api';
export function useDeleteTodo() {
	const queryClient = useQueryClient();

	const deleteTodoMutation = useMutation({
		mutationFn: todoListApi.deleteTodo,
		async onSettled() {
			// изменил инвалидацию на базовой ключ для того, чтобы инвалидировались все запросы, которые с одинаковым базовым ключом
			queryClient.invalidateQueries({ queryKey: [todoListApi.baseKey] });
		},

		// внесем вручную изменения в кеш
		async onSuccess(_, deletedId) {
			queryClient.setQueryData(
				todoListApi.getTodoListQueryOptions().queryKey,
				todos => todos?.filter(item => item.id !== deletedId)
			);
		},
	});

	return {
		handleDelete: deleteTodoMutation.mutate,
		getIsPending: (id: string) =>
			deleteTodoMutation.isPending && deleteTodoMutation.variables === id,
	};
}
