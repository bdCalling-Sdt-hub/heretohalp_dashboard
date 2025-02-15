import { baseApi } from "./baseApi";

const blog = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getTermsConditions: builder.query({
            query: () => {
              return {
                url: "/manage/get-terms-conditions",
                method: "GET",
              };
            },
            providesTags: ["terms"],
          }),
          updateTermsCondition: builder.mutation({
            query: (data) => {
              return {
                url: "/manage/add-terms-conditions",
                method: "POST",
                body: data,
              };
            },
            invalidatesTags: ["terms"],
          }),
      
          getPrivecy: builder.query({
            query: () => {
              return {
                url: "/manage/get-privacy-policy",
                method: "GET",
              };
            },
            providesTags: ["terms"],
          }),
      
          postPrivecy: builder.mutation({
            query: (data) => {
              console.log("data", data);
              return {
                url: "/manage/add-privacy-policy",
                method: "POST",
                body: data,
              };
            },
            invalidatesTags: ["terms"],
          }),

          postContact: builder.mutation({
            query: (data) => {
              console.log("data", data);
              return {
                url: "/manage/add-contact-us",
                method: "POST",
                body: data,
              };
            },
            invalidatesTags: ["terms"],
          }),

          getOverview: builder.query({
            query: () => {
                return {
                    url: '/dashboard/growth?year=2024&role=USER',
                    method: 'GET'
                }
            },
            providesTags: ['terms']
        }),
       
          getFaq: builder.query({
            query: () => {
                return {
                    url: '/manage/get-faq',
                    method: 'GET'
                }
            },
            providesTags: ['faq']
        }),
    
        addFaq: builder.mutation({
            query: (data) => {
                return {
                    url: '/manage/add-faq',
                    method: "POST",
                    body: data
                }
            }, invalidatesTags: ['faq']
        }),
    
        getFaqUpdate: builder.mutation({
            query: ({ id, data }) => {
                console.log(id, data)
              return {
                url: `/manage/edit-faq/${id}`,
                method: "PATCH",
                body: data,
              };
            },
            invalidatesTags: ["faq"], 
          }),
    
      
          deleteFaq :  builder.mutation({
            query : ({id})=>{
                return {
                    url : `/manage/delete-faq?id=${id}`,
                    method : 'DELETE'
                }
            },
            invalidatesTags :['faq']
        }),


    }),
});

export const {useGetFaqQuery, useGetOverviewQuery, useAddFaqMutation, useGetFaqUpdateMutation, useDeleteFaqMutation, useGetTermsConditionsQuery, usePostContactMutation, useUpdateTermsConditionMutation,useGetPrivecyQuery,usePostPrivecyMutation} = blog;
