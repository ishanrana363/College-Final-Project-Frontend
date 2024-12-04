import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { baseUrl } from '../../../util/baseUrl';

let authApi = createApi({
    reducerPath: "authApi",
    baseQuery: fetchBaseQuery({
        baseUrl: `${baseUrl()}`,
        credentials: "include",
    }),
    endpoints: (builder) => ({
        registerUser: builder.mutation({
            query: (data) => ({
                url: `/register`,
                method: "POST",
                body: data,
            }),
        }),
        loginUser: builder.mutation({
            query: (payload) => ({
                url: `/login`,
                method: "POST",
                body: payload,
            }),
        }),
    }),
});

// Corrected export statement
export const { useRegisterUserMutation, useLoginUserMutation } = authApi;

export default authApi;
