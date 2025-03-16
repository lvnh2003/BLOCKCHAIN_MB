import api from "@/utils/api";

export interface StudentCertificatesResponse {
  id: string;
  name: string;
  createdAt: number;
  updatedAt: number;
  image?: string;
  code: string;
  password: string;
  dateOfBirth: string;
  role: "STUDENT" | "TEACHER" | "MASTER" | "COMPANY";
  walletAddress?: string;
  walletPrivateKey?: string;
  certificate: {
    createdAt: number;
    updatedAt: number;
    status: "SIGNED" | "PENDING";
    certificateTypeId: string;
    score: number;
    id: string;
    certId: string;
  };
}

export const getStudentByType = async (certificateTypeId: string) => {
  try {
    const response = await api.get<StudentCertificatesResponse[]>(
      `certificate/studentByType/${certificateTypeId}`
    );
    console.log("get student:>", response.data);
    return response.data;
  } catch (error) {
    console.log("get certificates all failed", error);
  }
};
