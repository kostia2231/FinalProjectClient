import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useState, useEffect, useCallback } from "react";
import axios, { AxiosError } from "axios";
import { jwtDecode, JwtPayload } from "jwt-decode";
import { TUserData } from "../types/userData";

interface DecodedToken extends JwtPayload {
  username: string;
  userId: string;
  exp: number;
  iat: number;
}

interface UseUserId {
  userId?: string;
}

export const useUser = () => {
  const token = localStorage.getItem("token");
  const [username, setUsername] = useState<string | null>(null);
  const queryClient = useQueryClient();

  useEffect(() => {
    if (token) {
      const decodedToken = jwtDecode<DecodedToken>(token);
      setUsername(decodedToken.username);
    }
  }, [token]);

  const fetchUserData = useCallback(
    async (username: string | null) => {
      if (!username) throw new Error("Username is required");
      const response = await axios.get(`http://localhost:3333/${username}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    },
    [token],
  );

  const { data, error, isLoading, isFetching, refetch } = useQuery<TUserData>({
    queryKey: ["userData"],
    queryFn: () => fetchUserData(username),
    staleTime: 60 * 1000,
    enabled: !!username,
  });

  const mutation = useMutation({
    mutationFn: async (updatedData: Partial<TUserData["user"]>) => {
      const response = await axios.put(
        `http://localhost:3333/${username}/edit`,
        updatedData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      const newToken: string = String(response.data.token);
      localStorage.setItem("token", newToken);
      setUsername(jwtDecode<DecodedToken>(newToken).username);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: "userData" });
    },
    onError: (error: AxiosError) => {
      console.error("error editing:", error.response?.data);
    },
  });

  const cachedData = queryClient.getQueryData<TUserData>(["userData"]);
  queryClient.invalidateQueries({ queryKey: "userData" });

  return {
    refetch,
    cachedData,
    mutation,
    data,
    error,
    isLoading,
    isFetching,
    fetchUserData,
  };
};

export const useUserById = ({ userId }: UseUserId) => {
  const token = localStorage.getItem("token");
  const queryClient = useQueryClient();

  const fetchUserById = useCallback(
    async (userId: string | undefined) => {
      if (!userId) throw new Error("User ID is required");
      const response = await axios.get(`http://localhost:3333/id/${userId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    },
    [token],
  );

  const { data, error, isLoading, isFetching } = useQuery<TUserData>({
    queryKey: ["userData", userId],
    queryFn: () => fetchUserById(userId),
    enabled: !!userId,
  });

  const cachedData = queryClient.getQueryData<TUserData>(["userData", userId]);
  return {
    fetchUserById,
    cachedData,
    data,
    error,
    isLoading,
    isFetching,
  };
};
