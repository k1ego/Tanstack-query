import { useSuspenseQuery } from '@tanstack/react-query';
import { todoListApi } from './api';

export function useTodoList() {
	const {
		data: todoItems,
		refetch,
	} = useSuspenseQuery({
		...todoListApi.getTodoListQueryOptions(),
		select: data => data.toReversed(),
	});

	return { todoItems, refetch };
}
