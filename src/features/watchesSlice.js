import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import api from '../api'

const watchesSlice = createApi({
    reducerPath: "watchesSlice",

    baseQuery: fetchBaseQuery({
        baseUrl: api
    }),

    endpoints: (builder) => ({

        getAllProducts: builder.query({ query: () => "/products" }),

    })
})

export default watchesSlice

export const { useGetAllProductsQuery } = watchesSlice
