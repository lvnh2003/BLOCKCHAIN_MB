import api from "@/utils/api";

export interface CertificateResponse {
  id: string;
  name: string;
  createdAt: number;
  updatedAt: number;
}

export const getCertificates = async () => {
  try {
    const response = await api.get<CertificateResponse[]>(
      `certificate/type/all`
    );
    return response.data;
  } catch (error) {
    console.log("get certificates all failed", error);
  }
};
