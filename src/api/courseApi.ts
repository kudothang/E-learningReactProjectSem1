
import axios from "axios";
import { type Course } from "../types/index";
const axiosClient = axios.create({
  baseURL: "https://697f027dd1548030ab64f01c.mockapi.io/api/v1",
});
export const courseApi = {
  getAll: async (): Promise<Course[]> => {
    const res = await axiosClient.get("/courses");
    return res.data;
  },

  getById: async (id: string): Promise<Course> => {
    const res = await axiosClient.get(`/courses/${id}`);
    return res.data;
  },
};
