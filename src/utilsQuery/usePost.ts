import axios, { AxiosError } from "axios";
import { useState, useEffect } from "react";
import { useQuery, useQueryClient, useMutation } from "@tanstack/react-query";
import { TPostsData } from "../types/postData";
import { jwtDecode, JwtPayload } from "jwt-decode";
import { TUserData } from "../types/userData";

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

  const fetchPosts = async (userId: string | undefined) => {
    const response = await axios.get(
      `http://localhost:3333/post/all/${userId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );

    return response.data;
  };

  const { data, error, isLoading, isFetching, refetch } = useQuery<TPostsData>({
    queryKey: ["userPostsData"],
    queryFn: () => fetchPosts(userId),
    enabled: !!userId,
  });

  const cachedUserPostsData = queryClient.getQueryData<TUserData>([
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
      window.location.reload();
    },
    onError: (error: AxiosError) => {
      console.error("error editing:", error.response?.data);
    },
  });
  return { deletePost };
};
