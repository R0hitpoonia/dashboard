import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { loginUser } from "../slice/authSlice";
import {
  getUserResponse,
  loginUserRequest,
  authResponse,
  registerUserRequest,
} from "@/lib/schema";

export const authApi = createApi({
  reducerPath: "authapi",
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.API_URL,
    credentials: "include",
  }),
  endpoints: (builder) => ({
    getUser: builder.query<getUserResponse, null>({
      query: () => ({
        url: `/admin/profile`,
        method: "GET",
        headers: {
          authorization: `Bearer ${sessionStorage.getItem("token")}`,
        },
      }),
      async onQueryStarted(_args, { dispatch, queryFulfilled }) {
        try {
          const user = (await queryFulfilled).data.adminData;
          dispatch(
            loginUser({
              email: user.email,
              name: user.name,
              password: "",
              profilePhoto: user.profilePhoto,
              role: user.role,
            }),
          );
        } catch (error) {
          console.log(error);
        }
      },
    }),
    loginUser: builder.mutation<authResponse, loginUserRequest>({
      query(credentials: loginUserRequest) {
        return { url: "/admin/login", method: "POST", body: credentials };
      },
      async onQueryStarted(_args, { dispatch, queryFulfilled }) {
        try {
          await queryFulfilled;
          sessionStorage.setItem("token", (await queryFulfilled).data?.token);
          await dispatch(authApi.endpoints.getUser.initiate(null));
        } catch (error: any) {
          throw new Error(
            error.message ? error.message : "Error occured  while logging in",
          );
        }
      },
    }),
    registerUser: builder.mutation<authResponse, registerUserRequest>({
      query(userData: registerUserRequest) {
        return { url: "/admin/signup", method: "POST", body: userData };
      },
      async onQueryStarted(_args, { dispatch, queryFulfilled }) {
        try {
          await queryFulfilled;
          sessionStorage.setItem("token", (await queryFulfilled).data.token);
          await dispatch(authApi.endpoints.getUser.initiate(null));
        } catch (error) {}
      },
    }),
    logoutUser: builder.mutation<void, void>({
      query() {
        return {
          url: "/admin/logout",
          credentials: "include",
        };
      },
    }),
  }),
});

// Action Creators
export const {
  useLoginUserMutation,
  useLogoutUserMutation,
  useRegisterUserMutation,
  useLazyGetUserQuery,
} = authApi;
