import { MutationObserver, useMutation } from '@tanstack/react-query';
import { queryClient } from '../../shared/api/query-client';
import { AppThunk } from '../../shared/redux';
import { authApi } from './api';
import { authSlice } from './auth.slice';

export const loginThunk =
	(login: string, password: string): AppThunk =>
	async dispatch => {
		const mutationResult = await new MutationObserver(queryClient, {
			mutationKey: ['login'],
			mutationFn: authApi.loginUser,
		}).mutate({
			login,
			password,
		});

		if (mutationResult) {
			dispatch(
				authSlice.actions.addUser({
					userId: mutationResult.id,
				})
			);

			// setQueryData - ручное обновление данных в кеше запроса, полезно, когда нужно обновить данные в кэше без выполнения нового запроса к серверу
			queryClient.setQueryData(
				authApi.getUserById(mutationResult.id).queryKey,
				mutationResult
			);

			localStorage.setItem('userId', mutationResult.id);
		}
		dispatch(authSlice.actions.setError('Неверный логин или пароль'));
	};

// useMutation - используется для выполнения мутаций
export const useLoginLoading = () =>
	useMutation({
		mutationKey: ['login'],
	}).isPending;
