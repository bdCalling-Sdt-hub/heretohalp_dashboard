import { baseApi } from "./baseApi";


const feedback = baseApi.injectEndpoints({
  endpoints: (builder) => ({
 
     getFeedback: builder.query({
        query: () => {
            return {
                url: '/feedback/get-all-feedbacks?limit=99999999',
                method: 'GET'
            }
        },
        providesTags: ['feedback']
    }),

    getAllNewsSubscribe: builder.query({
        query: ({searchTerm}) => {
            return {
                url: `/newsletter/get-all-newsletters?searchTerm=${searchTerm}`,
                method: 'GET'
            }
        },
        providesTags: ['feedback']
    }),
    postFeedback: builder.mutation({
        query: (data) => {
            return {
                url: '/feedback/post-feedback',
                method: "POST",
                body: data
            }
        }, invalidatesTags: ['feedback']
    }),


    updateFeedback: builder.mutation({
        query: ({data}) => ({
          url: `/feedback/reply-feedback`, 
          method: "PATCH",
          body: data, 
        }),
        invalidatesTags: ["feedback"], 
      }),


      deleteFeedback :  builder.mutation({
        query : (id)=>{
            return {
                url : `/feedback/delete-feedback?id=${id}`,
                method : 'DELETE'
            }
        },
        invalidatesTags :['feedback']
    }),

    deleteNews: builder.mutation({
        query: ({ newsletterId }) => {
          return {
            url: `/newsletter/delete-newsletter`, // URL for deleting a newsletter
            method: 'DELETE',
            body: {
              newsletterId: newsletterId, // Passing the newsletterId in the body
            },
          };
        },
        invalidatesTags: ['feedback'],
      }),
      
  }),
});

export const {
useGetFeedbackQuery,
useUpdateFeedbackMutation,
usePostFeedbackMutation,
useDeleteFeedbackMutation,
useGetAllNewsSubscribeQuery,
useDeleteNewsMutation

 
} = feedback;
