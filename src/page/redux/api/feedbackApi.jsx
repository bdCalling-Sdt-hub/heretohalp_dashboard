import { baseApi } from "./baseApi";


const feedback = baseApi.injectEndpoints({
  endpoints: (builder) => ({
 
     getFeedback: builder.query({
        query: () => {
            return {
                url: '/feedback/get-all-feedback',
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
  }),
});

export const {
useGetFeedbackQuery,
useUpdateFeedbackMutation,
usePostFeedbackMutation,
useDeleteFeedbackMutation

 
} = feedback;
