import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";
import url from "../api";

export const usersAPI = createApi({
    reducerPath: "usersAPI",
    baseQuery: fetchBaseQuery({
        baseUrl: url,
    }),
    endpoints: (builder) =>({
      
    getNewUser: builder.mutation({
        query(user) {
          return {
            url: "auth/signup",
            method: "POST",
            body: user,
          };
        },
      }),

      getLogin: builder.mutation({
        query(user) {
          return {
            url: "auth/signin",
            method: "POST",
            body: user,
          }}
        }),

        getSignOut: builder.mutation({
          query: ({id, ...rest}) => ({
          url: `/auth/${id}`,
          method: 'PATCH',
          body: rest,
          })
        }),
        signInToken: builder.mutation({
          query: (token) => ({
              url: '/auth/token',
              method: 'GET',
              headers: {
                Authorization: "Bearer " + token
              }
          })
      }),
})
})

export default usersAPI;
export const {
    useGetNewUserMutation,
    useGetLoginMutation,
    useGetSignOutMutation,
    useSignInTokenMutation
} = usersAPI
