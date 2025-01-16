import axios, { AxiosError } from "axios";
import { useState, useEffect } from "react";
import { useQuery, useQueryClient, useMutation } from "@tanstack/react-query";
import { TPostData } from "../types/postData";
import { jwtDecode, JwtPayload } from "jwt-decode";

interface DecodedToken extends JwtPayload {
  username: string;
  id: string;
  exp: number;
  iat: number;
}

export const useUserPosts = () => {
  const [id, setId] = useState<string | null>(null);
  const token = localStorage.getItem("token");
  const queryClient = useQueryClient();

  useEffect(() => {
    if (token) {
      const decodedToken = jwtDecode<DecodedToken>(token);
      setId(decodedToken.id);
    }
  }, [token]);

  const { data, error, isLoading, isFetching, refetch } = useQuery<TPostData>({
    queryKey: ["userPostsData"],
    queryFn: async () => {
      const response = await axios.get(`http://localhost:3333/post/all/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log(response.data);

      return response.data;
    },
    enabled: !!id,
  });

  const cachedUserPostsData = queryClient.getQueryData<TPostData>([
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
