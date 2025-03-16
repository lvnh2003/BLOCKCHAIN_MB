import api from "@/utils/api";

interface UpdateUserArgs {
  id: string;
  body: {
    name?: string;
    image?: string;
    code?: string;
    password?: string;
    dateOfBirth?: string;
    role?: string;
  };
}

interface UpdateUserResponse {
  message: string;
}

export const updateUser = async ({
  id,
  body,
}: UpdateUserArgs): Promise<UpdateUserResponse> => {
  try {
    const { code, image, name, password, dateOfBirth, role } = body;
    console.log("body ->", body);

    const response = await api.put(`users/${id}`, {
      code,
      image,
      name,
      password,
      dateOfBirth,
      role,
    });
    console.log("response update user:>", response.data);
    return response.data;
  } catch (error) {
    console.error("Error update user:", error);

    throw new Error("Failed to update user");
  }
};
