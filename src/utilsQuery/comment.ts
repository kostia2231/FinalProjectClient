import axios, { AxiosError } from "axios";
const token = localStorage.getItem("token");

export const addComment = async (
  postId: string | undefined,
  commentBody: string,
) => {
  try {
    const response = await axios.post(
      `http://localhost:3333/comment/${postId}/add`,
      {
        commentBody: commentBody,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );
    return response.data;
  } catch (err) {
    console.error(
      "error adding comment to a post",
      (err as AxiosError).message,
    );
  }
};
