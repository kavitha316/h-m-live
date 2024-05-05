import { useQuery } from "@tanstack/react-query";
import { Category, Product,Banner } from "../types/Product";
import apiClient from "../apiClient";

//banner
export const useGetBannerQuery = () => 
    useQuery({
        queryKey: ['banner'],
        queryFn: async () => 
        (
            await (apiClient.get<Banner[]>(`/api/banner`))
        ).data,
    })
//category
export const useGetCategoryQuery = () => 
    useQuery({
        queryKey: ['category'],
        queryFn: async () => 
        (
            await (apiClient.get<Category[]>(`/api/category`))
        ).data,
    })
//product
export const useGetProductsQuery = () => 
    useQuery({
        queryKey: ['products'],
        queryFn: async () => 
        (
            await (apiClient.get<Product[]>(`/api/products`))
        ).data,
    })

export const useGetProductDetailsBySlugQuery = (slug:string) => 
    useQuery({
        queryKey: ['products',slug],
        queryFn: async () => 
        (
            await (apiClient.get<Product>(`api/products/slug/${slug}`))
        ).data,
    })

//filter category 
export const useGetCategoryFilterQuery = () => 
    useQuery({
        queryKey: ['products'],
        queryFn: async () => 
        (
            await (apiClient.post<Product[]>(`/api/products/product-listby-category`))
        ).data,
    })

//product details
// export const useGetProductsDetailsQuery = () => 
//     useQuery({
//         queryKey: ['products'],
//         queryFn: async () => 
//         (
//             await (apiClient.post<Product[]>(`/api/products/slug`))
//         ).data,
//     })

//     export const useGetCategoriesQuery = () =>
//   useQuery({
//     queryKey: ['categories'],
//     queryFn: async () =>
//       (await apiClient.get<[]>(`/api/products/categories`)).data,
//   })