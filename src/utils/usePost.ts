import axios from "axios";
import { useState, useEffect } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { IPostsData } from "../types/postData";
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

  const { data, error, isLoading, isFetching } = useQuery<IPostsData>({
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

  const cachedUserPostsData = queryClient.getQueryData<IPostsData>([
    "userPostsData",
  ]);
  return {
    data,
    error,
    isLoading,
    isFetching,
    cachedUserPostsData,
  };
};
