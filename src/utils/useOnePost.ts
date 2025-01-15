import axios from "axios";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { IPostData } from "../types/postData";

interface UseOnePostProps {
  postId?: string;
}

export const useOnePost = ({ postId }: UseOnePostProps) => {
  const token = localStorage.getItem("token");
  const queryClient = useQueryClient();

  const { data, error, isLoading, isFetching, isPending } = useQuery<IPostData>(
    {
      queryKey: ["userOnePostData"],
      queryFn: async () => {
        const response = await axios.get(
          `http://localhost:3333/post/${postId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        );
        console.log(response.data);

        return response.data;
      },
      enabled: !!postId,
    },
  );

  const cachedUserPostsData = queryClient.getQueryData<IPostData>([
    "userOnePostData",
  ]);
  return {
    data,
    error,
    isLoading,
    isFetching,
    isPending,
    cachedUserPostsData,
  };
};
