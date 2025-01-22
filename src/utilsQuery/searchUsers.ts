import axios, { AxiosError } from "axios";

export const searchUsers = async (query: string) => {
  const token = localStorage.getItem("token");

  try {
    const response = await axios.get(`http://localhost:3333/`, {
      params: { query },
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data.users;
  } catch (err) {
    console.error("error searching users", err as AxiosError);

    return [];
  }
};
