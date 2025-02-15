import { baseApi } from "./baseApi"


const useApi = baseApi.injectEndpoints({
    endpoints : (builder)=>({
        registerUser : builder.mutation({
            query : (data)=>{
               return {
                url : '/auth/register',
                method : 'POST',
                body : data
               } 
            }
        }),
        registerActivation : builder.mutation({
            query : (data)=>{
               return {
                url : '/auth/activate-account',
                method : 'POST',
                body : data
               } 
            }
        }),

        loginAdmin : builder.mutation({
            query : (data)=>{
               return {
                url : '/auth/login',
                method : 'POST',
                body : data
               } 
            }
        }),

        feedback : builder.mutation({
            query : (data)=>{
               return {
                url : '/feedback/post-feedback',
                method : 'POST',
                body : data
               } 
            }
        }),

        getProfile :  builder.query({
            query : ()=>{
                return{
                    url : '/user/profile',
                    method : 'GET'
                }
            },
            providesTags : ['updateProfile']
        }),

        adminProfile :  builder.query({
            query : ()=>{
                return{
                    url : '/admin/profile',
                    method : 'GET'
                }
            },
            providesTags : ['updateProfile']
        }),

        forgotPassword : builder.mutation({
            query : (email)=>{
                return {
                    url : '/auth/forgot-password',
                    method : 'POST',
                    body : email
                }
            }
        }),
        verifyOtp : builder.mutation({
            query : (data)=>{
                return {
                    url : '/auth/forget-pass-otp-verify',
                    method : 'POST',
                    body :  data
                }
            }
        }) ,
        resetPassword :  builder.mutation({
            query : (data)=>{
                return {
                    url : '/auth/reset-password',
                    method : 'POST',
                    body : data
                }
            }
        }),
        updateProfile : builder.mutation({
            query : (data)=>{
                return {
                    url : '/admin/edit-profile',
                    method : 'PATCH',
                    body : data
                }
            },
            invalidatesTags : ['updateProfile']
        }),
        changePassword :  builder.mutation({
            query : (data)=>{
                return {
                    url : '/auth/change-password',
                    method : 'PATCH',
                    body : data
                }
            }
        }),
        allUser : builder.query({
            query : ({searchTerm})=>{
                return {
                    url : `/dashboard/get-all-user?role=USER&searchTerm=${searchTerm}`,
                    method : "GET"
                }
            }
        }) ,

        allUserData : builder.query({
            query : ()=>{
                return {
                    url : `/dashboard/get-all-user?role=USER`,
                    method : "GET"
                }
            }
        }) ,

        userBlock : builder.mutation({
            query : (data)=>{
                return {
                    url : '/dashboard/block-unblock-user',
                    method : 'PATCH',
                    body : data
                }
            },
            invalidatesTags : ['updateProfile']
        }),
    })
})

export const {useRegisterUserMutation ,useAdminProfileQuery, useUserBlockMutation,useAllUserDataQuery, useRegisterActivationMutation,useFeedbackMutation, useLoginAdminMutation, useGetProfileQuery , useForgotPasswordMutation , useVerifyOtpMutation , useResetPasswordMutation , useUpdateProfileMutation , useChangePasswordMutation, useAllUserQuery

 } = useApi