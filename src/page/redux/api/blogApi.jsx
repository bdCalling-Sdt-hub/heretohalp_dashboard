import { baseApi } from "./baseApi";

const blog = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getAllBlog: builder.query({
            query: ({searchTerm}) => {
                return {
                    url: `/blog/get-all-blog?limit=1000&searchTerm=${searchTerm}`,
                    method: 'GET',
                };
            },
            providesTags: ['newHost'],
        }),

        getAllPartner: builder.query({
            query: () => {
                return {
                    url: '/partnerRequest/get-all-partner-requests',
                    method: 'GET',
                };
            },
            providesTags: ['newHost'],
        }),

        addBlog :  builder.mutation({
            query : (data)=>{
                return {
                    url : '/blog/post-blog',
                    method : 'POST',
                    body : data
                }
            }, invalidatesTags: ['newHost']
        }),

        deleteBlog: builder.mutation({
            query: (id) => {
              return {
                url: `/blog/delete-single-blog?blogId=${id}`,
                method: "DELETE",
              };
            },
            invalidatesTags: ["newHost"],
          }),

        getSingleBlogDetails: builder.query({
            query: ({id}) => {
                return {
                    url: `/blog/get-single-blog?blogId=${id}`,
                    method: 'GET',
                };
            },
            providesTags: ['newHost'],
        }),

        getAllTicket: builder.query({
            query: ({searchTerm,limit,page}) => {
                return {
                    url: `/service/get-all-ticket?searchTerm=${searchTerm}&limit=${limit}&page=${page}`,
                    method: 'GET',
                };
            },
            providesTags: ['newHost'],
        }),


        updateStatus: builder.mutation({
            query: (data) => {
                
              return {
                url: `/service/update-ticket-status`,
                method: "PATCH",
                body: data,
              };
            },
            invalidatesTags: ["faq"], 
          }),


    }),
});

export const {useAddBlogMutation, useUpdateStatusMutation, useDeleteBlogMutation,useGetAllPartnerQuery,useGetAllTicketQuery, useGetAllBlogQuery, useGetSingleBlogDetailsQuery } = blog;
