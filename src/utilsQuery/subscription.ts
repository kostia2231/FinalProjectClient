import axios, { AxiosError } from "axios";
const token = localStorage.getItem("token");

export const follow = async (userId: string) => {
  try {
    const response = await axios.post(
      `http://localhost:3333/subscription/follow/${userId}`,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );
    return response.data;
  } catch (err) {
    console.error("error while following user", (err as AxiosError).message);
  }
};

export const unfollow = async (userId: string) => {
  try {
    const response = await axios.post(
      `http://localhost:3333/subscription/unfollow/${userId}`,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );
    return response.data;
  } catch (err) {
    console.error("error while unfollowing user", (err as AxiosError).message);
  }
};
