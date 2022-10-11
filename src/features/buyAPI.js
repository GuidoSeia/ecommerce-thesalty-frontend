import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import api from '../api'

const buyAPI = createApi({
    reducerPath: "buyAPI",

    baseQuery: fetchBaseQuery({
        baseUrl: api
    }),

    endpoints: (builder) => ({

        getBuys: builder.query({ query: () => `/checkout` }),

        getNewCart: builder.mutation ({
            query (cart) {
                return {
                    url: "checkout/",
                    method: "POST",
                    body: cart,
                };
            }
        }),
    
    })
})

export default buyAPI

export const {
    useGetNewCartMutation,
    useGetBuysQuery
    } = buyAPI
