import axios, { AxiosError } from "axios";
const token = localStorage.getItem("token");

export const like = async (postId: string | undefined) => {
  try {
    const response = await axios.post(
      `http://localhost:3333/like/post/${postId}`,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );
    return response.data;
  } catch (err) {
    console.error("error while liking post", (err as AxiosError).message);
  }
};

export const unlike = async (postId: string | undefined) => {
  try {
    const response = await axios.delete(
      `http://localhost:3333/like/post/${postId}/unlike`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );

    return response.data;
  } catch (err) {
    console.error("error while unliking post", (err as AxiosError).message);
  }
};

export const likeStatus = async (postId: string | undefined) => {
  try {
    const response = await axios.get(
      `http://localhost:3333/like/post/${postId}/like-status`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );

    return response.data;
  } catch (err) {
    console.error(
      "error while cheking post status",
      (err as AxiosError).message,
    );
  }
};
