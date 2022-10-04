import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import api from '../api'

const productsApi = createApi({
    reducerPath: "productsApi",

    baseQuery: fetchBaseQuery({
        baseUrl: api
    }),

    endpoints: (builder) => ({

        getAllProducts: builder.query({ query: () => `/products` }),

        getFilteredProducts: builder.query({ query: (type) => `/products?type=${type}` }),

    })
})

export default productsApi

export const { useGetAllProductsQuery , useGetFilteredProductsQuery } = productsApi
