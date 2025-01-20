import axios, { AxiosError } from "axios";
const token = localStorage.getItem("token");

export const likeComment = async (commentId: string | undefined) => {
  try {
    const response = await axios.post(
      `http://localhost:3333/comment-like/comment/${commentId}`,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );
    return response.data;
  } catch (err) {
    console.error("error while liking comment", (err as AxiosError).message);
  }
};

export const unlikeComment = async (commentId: string | undefined) => {
  try {
    const response = await axios.delete(
      `http://localhost:3333/comment-like/comment/${commentId}/unlike`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );

    return response.data;
  } catch (err) {
    console.error("error while unliking comment", (err as AxiosError).message);
  }
};

export const commentLikeStatus = async (commentId: string | undefined) => {
  try {
    const response = await axios.get(
      `http://localhost:3333/comment-like/comment/${commentId}/like-status`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );

    return response.data;
  } catch (err) {
    console.error(
      "error while cheking comment status",
      (err as AxiosError).message,
    );
  }
};
