import { useMutation } from "@tanstack/react-query";
import apiClient from "../apiClient";
import { UserInfo } from "../types/UserInfo";

export const useSigninMutation = () => useMutation({
    mutationFn:async ({
        email,
        password,
    } : {
        email: string
        password: string
    }) => 
    (
        await apiClient.post<UserInfo>(`api/users/signin`, {
            email,
            password,
        })
    ).data
})

export const useSignupMutation = () => useMutation({
    mutationFn:async ({
        name,
        phone,
        email,
        password,
    } : {
        name:string
        phone:number
        email: string
        password: string
    }) => 
    (
        await apiClient.post<UserInfo>(`api/users/signup`, {
            name,
            phone,
            email,
            password,
        })
    ).data
})
export const useUpdateProfileMutation = () =>
  useMutation({
    mutationFn: async ({
      name,
      email,
      password,
      phone,
    }: {
      name: string
      email: string
      password: string
      phone:number
    }) =>
      (
        await apiClient.put<UserInfo>(`api/users/profile`, {
          name,
          email,
          phone,
          password,
        })
      ).data,
  })