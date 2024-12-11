import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { baseUrl } from '../../../util/baseUrl';

const productApi = createApi({
    reducerPath: "productApi",
    baseQuery: fetchBaseQuery({
        baseUrl: `${baseUrl()}`,
        credentials: "include",
    }),
    tagTypes: ["Products"], // Fixed: Should be an array
    endpoints: (builder) => ({
        fetchAllProducts: builder.query({
            query: ({
                category = "",
                color = "",
                minPrice = 0,
                maxPrice = 0,
                page = 1,
                limit = 10,
            } = {}) => { // Default empty object
                const queryParams = new URLSearchParams();

                if (category) queryParams.append("category", category);
                if (color) queryParams.append("color", color);
                if (minPrice) queryParams.append("minPrice", minPrice.toString());
                if (maxPrice) queryParams.append("maxPrice", maxPrice.toString());
                queryParams.append("page", page.toString());
                queryParams.append("limit", limit.toString());

                return `/?${queryParams.toString()}`;
            },
            providesTags: ["Products"], // Correct tag format
        }),
        fetchProductId: builder.query({
            query: (id) => `/single-product/${id}`,
            providesTags: (result, error, id) => [{ type: "Products", id }],
        }),
        addProduct: builder.mutation({
            query: (payload) => ({
                url: "/create-product",
                method: "POST",
                body: payload
            }),
            invalidatesTags: ["Products"], // Correct tag format
        }),
        updateProduct: builder.mutation({
            query: (id, payload) => ({
                url: `/update-product/${id}`,
                method: "PUT",
                body: payload
            }),
            invalidatesTags: ["Products"], // Correct tag format
        }),
        deleteProduct: builder.mutation({
            query: (id) => ({
                url: `/product-delete/${id}`,
                method: "DELETE"
            }),
            invalidatesTags: (result, error, id) => [{ type: "Products", id }], // Correct tag format
        })
    }),
});

export const {
    useFetchAllProductsQuery, // Fixed export naming
    useFetchProductIdQuery, // Fixed hook name
    useAddProductMutation, // Fixed hook name
    useUpdateProductMutation, // Fixed hook name
    useDeleteProductMutation, // Fixed hook name
} = productApi;

export default productApi;
