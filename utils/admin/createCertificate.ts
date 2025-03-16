import api from "../api";

export const createCertificate = async (name: string) => {
  try {
    
    const response = await api.post(`/certificate/type/create`,{
        name: name
    });
    
    return response.data;
  } catch (error) {
    console.log(error);
  }
};
