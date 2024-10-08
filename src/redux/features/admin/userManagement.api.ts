import { TQueryParam } from "./../../../types/global";
import { TAdmin, TFaculty, TStudent } from "../../../types";
import { TResponseRedux } from "../../../types/global";
import { baseApi } from "../../api/baseApi";

const userManagementApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllStudents: builder.query({
      query: (args) => {
        const params = new URLSearchParams();

        // Assuming args is an array of { name: string; value: any } objects
        args.forEach(({ name, value }) => {
          params.append(name, value.toString());
        });

        return {
          url: "/students",
          method: "GET",
          params: params, // Now this contains the actual query parameters
        };
      },
      transformResponse: (response: TResponseRedux<TStudent[]>) => {
        return {
          data: response.data,
          meta: response.meta,
        };
      },
    }),

    getSingleStudent: builder.query({
      query: (args) => {
        return {
          url: `/students/${args}`,
          method: "GET",
        };
      },
    }),

    addStudent: builder.mutation({
      query: (data) => {
        return {
          url: "/users/create-student",
          method: "POST",
          body: data,
        };
      },
    }),
    changePassword: builder.mutation({
      query: (data) => {
        return {
          url: "/auth/change-password",
          method: "POST",
          body: data,
        };
      },
    }),
    addFaculty: builder.mutation({
      query: (data) => {
        return {
          url: "/users/create-faculty",
          method: "POST",
          body: data,
        };
      },
    }),
    getAllFaculty: builder.query({
      query: (args) => {
        const params = new URLSearchParams();

        if (args) {
          args.forEach((item: TQueryParam) => {
            params.append(item.name, item.value as string);
          });
        }
        return {
          url: "/faculties",
          method: "GET",
          params: params,
        };
      },
      transformResponse: (response: TResponseRedux<TFaculty[]>) => {
        return {
          data: response.data,
          meta: response.meta,
        };
      },
    }),
    getSingleFaculty: builder.query({
      query: (args) => {
        return {
          url: `/faculties/${args}`,
          method: "GET",
        };
      },
    }),
    addAdmin: builder.mutation({
      query: (data) => {
        return {
          url: "/users/create-admin",
          method: "POST",
          body: data,
        };
      },
    }),
    getAllAdmin: builder.query({
      query: (args) => {
        const params = new URLSearchParams();

        // Assuming args is an array of { name: string; value: any } objects
        args.forEach(({ name, value }) => {
          params.append(name, value.toString());
        });

        return {
          url: "/admins",
          method: "GET",
          params: params, // Now this contains the actual query parameters
        };
      },
      transformResponse: (response: TResponseRedux<TAdmin[]>) => {
        return {
          data: response.data,
          meta: response.meta,
        };
      },
    }),
    getSingleAdmin: builder.query({
      query: (args) => {
        return {
          url: `/admins/${args}`,
          method: "GET",
        };
      },
    }),
    updateUser: builder.mutation({
      query: (data) => {
        const { id, status } = data;
        return {
          url: `/users/change-status/${id}`,
          method: "POST",
          body: { status },
        };
      },
    }),
    updateStudent: builder.mutation({
      query: (args) => {
        const { data, studentId } = args;
        console.log(data, studentId, "inside redux");

        return {
          url: `/students/${studentId}`,
          method: "PATCH",
          body: data,
        };
      },
    }),
  }),
});

export const {
  useAddStudentMutation,
  useGetAllStudentsQuery,
  useGetSingleStudentQuery,
  useUpdateUserMutation,
  useUpdateStudentMutation,
  useAddFacultyMutation,
  useAddAdminMutation,
  useGetAllFacultyQuery,
  useGetAllAdminQuery,
  useGetSingleAdminQuery,
  useGetSingleFacultyQuery,
  useChangePasswordMutation,
} = userManagementApi;
