import axios from "axios";

export const searchServiceData = async (service: string, query: string) => {
  const response = await axios.post(`${process.env.NEXT_PUBLIC_SOCKET_URL}/api/v1/search`, {
    service,
    query,
  });

  return response.data;
};
