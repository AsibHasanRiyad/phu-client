import { TStudent } from "../../../types";
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

    addStudent: builder.mutation({
      query: (data) => ({
        url: "/users/create-student",
        method: "POST",
        body: data,
      }),
    }),
  }),
});

export const { useAddStudentMutation, useGetAllStudentsQuery } =
  userManagementApi;
