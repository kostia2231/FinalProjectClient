import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useState, useEffect } from "react";
import axios, { AxiosError } from "axios";
import { jwtDecode, JwtPayload } from "jwt-decode";
import { UserData } from "../types/userData";

interface DecodedToken extends JwtPayload {
  username: string;
  exp: number;
  iat: number;
}

const useUser = () => {
  const token = localStorage.getItem("token");
  const [username, setUsername] = useState<string | null>(null);
  const queryClient = useQueryClient();

  useEffect(() => {
    if (token) {
      const decodedToken = jwtDecode<DecodedToken>(token);
      setUsername(decodedToken.username);
    }
  }, [token]);

  const { data, error, isLoading, isFetching } = useQuery<UserData>({
    queryKey: ["userData"],
    queryFn: async () => {
      const response = await axios.get(`http://localhost:3333/${username}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log(response.data);
      return response.data;
    },
    enabled: !!username,
  });

  const mutation = useMutation({
    mutationFn: async (updatedData: Partial<UserData["user"]>) => {
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

  const cachedData = queryClient.getQueryData<UserData>(["userData"]);
  return {
    cachedData,
    mutation,
    data,
    error,
    isLoading,
    isFetching,
  };
};

export default useUser;
