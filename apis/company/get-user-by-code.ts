import api from "@/utils/api";

export const getUserById = async (id: string) => {
  try {
    const response = await api.get(`/users/userId/${id}`);
    return response.data;
  } catch (error) {
    console.log("get user by code failed", error);
  }
};
