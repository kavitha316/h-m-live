import { useMutation, useQuery } from "@tanstack/react-query";
import { CartItem, ShippingAddress } from "../types/Cart";
import apiClient from "../apiClient";
import { Order, createRazorpay } from "../types/Order";

export const useGetOrderDetailsQuery = (id:string) =>
useQuery({
    queryKey:['orders',id],
    queryFn:async () =>(await apiClient.get<Order>(`api/orders/${id}` )).data
})

export const useGetRazorpayClientIdQuery = () => 
useQuery({
    queryKey:['razorpay-clientId'],
    queryFn:async ()=> (await apiClient.get<{clientId: string}>(`api/keys/razorpay`)).data
})


export const usePayOrderMutation = () => 
useMutation({
    mutationFn:async (details: {orderId: string}) => 
    (
        await apiClient.put<{ message: string, order: Order}>(
            `api/orders/${details.orderId}/pay`,
            details
        )
    ).data,
})

export const useCreatedOrderMutation = () => useMutation({
    mutationFn:async (order: {
        orderItems: CartItem[]
        shippingAddress: ShippingAddress
        paymentMethod: string
        itemsPrice: number
        shippingPrice: number
        taxPrice: number
        totalPrice: number
    }) => 
    (
        await apiClient.post<{ message: string, order: Order}>(
            `api/orders`,
            order
        )
    ).data,
})

export const useRazorpayCreateOrder = () => useMutation({
    mutationFn:async ({
        amount
    } : {
        amount:number
    }) => 
    (
        await apiClient.post<createRazorpay>(`api/orders/create-order`, {
            amount
        })
    ).data
})

export const useGetOrderHistoryQuery = () => 
useQuery({
    queryKey:['order-history'],
    queryFn:async ()=> (await apiClient.get< Order[]>(`api/orders/mine`)).data
})

//payment order succeed api
export const useOrderPaidMutation = () => useMutation({
    mutationFn:async (orderPaid: {
        orderId: string
        email_address: string
        status: string
    }) => 
    (
        await apiClient.put<{ message: string, order: Order}>(
            `api/orders/${orderPaid.orderId}/pay`,
        )
    ).data,
})