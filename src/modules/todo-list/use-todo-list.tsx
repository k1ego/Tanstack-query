import { useSuspenseQuery } from '@tanstack/react-query';
import { useSuspenseUser } from '../auth/use-user';
import { todoListApi } from './api';

export function useTodoList() {
	const user = useSuspenseUser();
	const { data: todoItems, refetch } = useSuspenseQuery({
		...todoListApi.getTodoListQueryOptions({ userId: user.data.id }),
		select: data => data.toReversed(),
	});

	return { todoItems, refetch };
}
