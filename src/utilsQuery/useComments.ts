import axios, { AxiosError } from "axios";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

export const useComments = (postId: string | undefined) => {
  const token = localStorage.getItem("token");

  const fetchPostComments = async () => {
    if (!postId) return [];
    try {
      const response = await axios.get(
        `http://localhost:3333/comment/all/${postId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      return response.data;
    } catch (err) {
      console.error(
        "Error fetching post comments",
        (err as AxiosError).message,
      );
      throw err;
    }
  };

  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: ["postComments", postId],
    queryFn: fetchPostComments,
    enabled: !!postId,
    staleTime: 60 * 1000,
  });

  return { data, isLoading, isError, refetch };
};

export const useDeleteComment = () => {
  const token = localStorage.getItem("token");
  const queryClient = useQueryClient();

  const deleteComment = async (commentId: string | undefined) => {
    try {
      const response = await axios.delete(
        `http://localhost:3333/comment/${commentId}/delete`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      return response.data;
    } catch (err) {
      console.error("error deleting comment", (err as AxiosError).message);
    }
  };

  const mutation = useMutation({
    mutationFn: deleteComment,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: "postComments" });
    },
    onError: (err: AxiosError) => {
      console.error("error deleting comment", err.message);
    },
  });

  return mutation;
};
