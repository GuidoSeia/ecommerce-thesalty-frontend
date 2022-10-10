import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import api from '../api'

export const reviewsApi = createApi({
      reducerPath: "reviewsApi",

    baseQuery: fetchBaseQuery({
        baseUrl: api
    }),

    endpoints: (builder) => ({

      getReviews: builder.mutation({
            query: (id) => ({
                url:  `/reviews?product=${id}`,
                method: 'GET',
            }),
        }),

        newReview: builder.mutation({
            query: (newReview) => ({
                url: '/reviews',
                method: 'POST',
                body: newReview,
                headers: {
                    Authorization: "Bearer " + JSON.parse(localStorage.getItem("token"))
                } 
            })
        }),

        deleteReview: builder.mutation({
            query: (id) => ({
                url:  `/reviews/${id}`,
                method: 'DELETE',
/*                 headers: {Authorization: "Bearer " + JSON.parse(localStorage.getItem("token"))}
 */            })
        }),


    })

})

export default reviewsApi
export const { useGetReviewsMutation, useNewReviewMutation, useDeleteReviewMutation} = reviewsApi