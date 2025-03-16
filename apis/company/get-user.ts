import api from "@/utils/api";

export const getUser = async (id?: string) => {
  try {
    const response = await api.get(`/users/userId/${id}`);
    console.log("data user updated", response.data);
    return response.data;
  } catch (error) {
    console.log("get user failed", error);
  }
};
