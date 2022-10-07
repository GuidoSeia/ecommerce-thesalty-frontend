import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import api from '../api'

const couponApi = createApi({
    reducerPath: "couponApi",

    baseQuery: fetchBaseQuery({
        baseUrl: api
    }),

    endpoints: (builder) => ({

        getCoupon: builder.query({
            query: (id) => '/coupons/' + id
        }),

        getAllCoupons: builder.query({ query: () => '/coupons' }),

        NewCoupon: builder.mutation({
            query({ ...newCoupon }) { return { url: "coupons/", method: "POST", body: newCoupon, }; }
        }),
    })
})

export default couponApi

export const {
    useNewCouponMutation,
    useGetCouponQuery,
    useGetAllCouponsQuery
} = couponApi
