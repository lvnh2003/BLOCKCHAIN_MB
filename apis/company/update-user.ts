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
    const { code, name, password, role, dateOfBirth, image } = body;
    console.log("image ", image);
    const imageUpload = `http://192.168.2.6:3000${image}`;
    const response = await api.put(`users/${id}`, {
      code,
      name,
      password,
      role,
      dateOfBirth,
      image: imageUpload,
    });

    console.log("response data image", response.data);

    return response.data;
  } catch (error) {
    console.error("Error update user:", error);
    throw new Error("Failed to update user");
  }
};
