import { infiniteQueryOptions, queryOptions } from '@tanstack/react-query';
import { jsonApiInstance } from '../../shared/api/api-instance';

const BASE_URL = 'http://localhost:3000';

export type PaginatedResult<T> = {
	data: T[];
	first: number;
	items: number;
	last: number;
	next: number | null;
	pages: number;
	prev: number | null;
};

export type TodoDto = {
	id: string;
	text: string;
	done: boolean;
};

export const todoListApi = {
	getTodoList: (
		{ page }: { page: number },
		{ signal }: { signal: AbortSignal }
	) => {
		return fetch(`${BASE_URL}/tasks?_page=${page}&_per_page=10`, {
			signal,
		}).then(res => res.json() as Promise<PaginatedResult<TodoDto>>);
	},

	// вот так бы выглядел обычный queryOptionns
	getTodoListQueryOptions: ({ page }: { page: number }) => {
		return queryOptions({
			queryKey: ['tasks', 'list'],
			queryFn: meta =>
				jsonApiInstance<PaginatedResult<TodoDto>>(`/tasks?_page=${page}&_per_page=10`, {
					signal: meta.signal,
				}),
		});
	},

	// ================

	getTodoListInfinityQueryOptions: () => {
		return infiniteQueryOptions({
			queryKey: ['tasks', 'list'],
			queryFn: meta =>
				jsonApiInstance<PaginatedResult<TodoDto>>(`/tasks?_page=${meta.pageParam}&_per_page=10`, {
					signal: meta.signal,
				}),
			initialPageParam: 1,
			getNextPageParam: result => result.next,
			select: result => result.pages.flatMap(page => page.data),
		});
	},
};
