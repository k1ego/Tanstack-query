import { useQuery, useSuspenseQuery } from '@tanstack/react-query';
import { useAppSelector } from '../../shared/redux';
import { authApi } from './api';
import { authSlice } from './auth.slice';

// хук для запроса user с сервера
export function useUser() {
	const userId = useAppSelector(authSlice.selectors.userId);
	return useQuery({
		...authApi.getUserById(userId!),
		enabled: Boolean(userId),
	});
}

export function useSuspenseUser() {
	const userId = useAppSelector(authSlice.selectors.userId);
	return useSuspenseQuery({
		...authApi.getUserById(userId!)
	});
}
