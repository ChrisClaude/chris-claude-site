import { createApi } from '@reduxjs/toolkit/query/react';
import { customBaseQuery } from './customBaseQuery';

export const api = createApi({
  reducerPath: 'api',
  baseQuery: customBaseQuery(),
  tagTypes: ['TimeSlots', 'User', 'Booking'],
  endpoints: builder => ({
    //#region User
    getUserProfile: builder.query({
      query: () => ({
        endpoint: 'user.getUserProfile',
        params: null,
      }),
      providesTags: ['User'],
    }),

    // getAllUsers: builder.query({
    //   query: request => ({
    //     endpoint: 'user.getAllUsers',
    //     params: { request },
    //   }),
    //   providesTags: ['User'],
    // }),

    // updateUserProfile: builder.mutation({
    //   query: request => ({
    //     endpoint: 'user.updateUserProfile',
    //     params: { request },
    //   }),
    //   invalidatesTags: ['User'],
    // }),
    //#endregion
  }),
});

export const {
  useGetUserProfileQuery,
  // useGetAllUsersQuery,
  // useUpdateUserProfileMutation,
} = api;
