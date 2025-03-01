import axios, { AxiosError } from "axios";
import { useState, useEffect, useCallback } from "react";
import { useQuery, useQueryClient, useMutation } from "@tanstack/react-query";
import { useRouter } from "@tanstack/react-router";
import { TPostsData } from "../types/postData";
import { jwtDecode, JwtPayload } from "jwt-decode";

export interface DecodedToken extends JwtPayload {
  username: string;
  id: string;
  exp: number;
  iat: number;
}

export const useUserPosts = () => {
  const [userId, setUserId] = useState<string | undefined>(undefined);
  const token = localStorage.getItem("token");
  const queryClient = useQueryClient();

  useEffect(() => {
    if (token) {
      const decodedToken = jwtDecode<DecodedToken>(token);
      setUserId(decodedToken.id);
    }
  }, [token]);

  const fetchPosts = useCallback(
    async (userId: string | undefined) => {
      const response = await axios.get(
        `http://localhost:3333/post/all/${userId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      return response.data;
    },
    [token],
  );

  const { data, error, isLoading, isFetching, refetch } = useQuery<TPostsData>({
    queryKey: ["userPostsData"],
    queryFn: () => fetchPosts(userId),
    staleTime: 60 * 1000,
    enabled: !!userId,
  });

  const cachedUserPostsData = queryClient.getQueryData<TPostsData>([
    "userPostsData",
  ]);
  queryClient.invalidateQueries({ queryKey: "userData" });

  return {
    refetch,
    data,
    error,
    isLoading,
    isFetching,
    cachedUserPostsData,
    fetchPosts,
  };
};

export const useDeleteOnePost = () => {
  const { refetch: refetchPosts } = useUserPosts();
  const router = useRouter();
  const token = localStorage.getItem("token");
  const queryClient = useQueryClient();

  const deletePost = useMutation({
    mutationFn: async (postId: string) => {
      const response = await axios.delete(
        `http://localhost:3333/post/delete/${postId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      return response.data;
    },

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: "userData" });
      refetchPosts();
      router.history.back();
    },
    onError: (error: AxiosError) => {
      console.error("error editing:", error.response?.data);
    },
  });
  return { deletePost };
};
