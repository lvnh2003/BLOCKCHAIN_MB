import api from "@/utils/api";
import * as FileSystem from "expo-file-system";

interface UpdateUserArgs {
  id?: string;
  body: {
    name?: string;
    code?: string;
    password?: string;
    role?: string;
    dateOfBirth?: string;
    image?: string | null;
  };
}

interface UpdateUserResponse {
  message: string;
}

export const updateUser = async ({
  body,
  id,
}: UpdateUserArgs): Promise<UpdateUserResponse> => {
  try {
    const response = await api.put(`users/${id}`, body);

    console.log("response data image", response.data);

    return response.data;
  } catch (error) {
    console.error("Error update user:", error);
    throw new Error("Failed to update user");
  }
};
