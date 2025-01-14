import { useQuery } from "@tanstack/react-query";
import { authApi } from "./api";
import { useAppSelector } from "../../shared/redux";
import { authSlice } from "./auth.slice";

// хук для запроса user с сервера
export function useUser(){
	const userId = useAppSelector(authSlice.selectors.userId)
	return useQuery({
		...authApi.getUserById(userId!),
		enabled: Boolean(userId)
	})
}