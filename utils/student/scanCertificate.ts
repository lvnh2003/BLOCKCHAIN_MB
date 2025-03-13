import api from "../api";

export const scanCertificate = async (cerId: string | null) => {
  try {
    
    const response = await api.get(`/certificate/verify/${cerId}`);
    if (response) {
      return "This certificate is legit.";
    }
  } catch (error) {
    console.log(error);
    
    return "This certificate is not true.";
  }
};
