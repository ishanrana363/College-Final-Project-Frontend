import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { baseUrl } from './../../../util/baseUrl';

const reviewApi = createApi({
    reducerPath: "reviewApi",
    baseQuery: fetchBaseQuery({ baseUrl: baseUrl() }),
    credentials: 'include', 
    tagTypes: ["reviews"],
    endpoints: (builder) => ({
        postReview: builder.mutation({
            query: (payload) => ({
                url: "/post-review",
                method: "POST",
                body: payload
            }),
            invalidatesTags: (result, error, { postId }) => [{ type: "reviews", id: postId }]
        }),
        getReviewCount: builder.query({
            query: () => ({
                url: "/total-review",
                method: "GET"
            })
        }),

        getRevieByUserId : builder.query({
            query: () => ({
                url: `/product-review}`,
                method: "GET"
            }),
            providesTags: (result)=> result ? [ { type: "reviews", id: result[0]?.email}] : []
        })

    })
})

export const {
    usePostReviewMutation,
    useGetReviewCountQuery,
    useGetRevieByUserIdQuery
} = reviewApi;

export default reviewApi;