import axios, { AxiosError } from "axios";
import { useQuery } from "@tanstack/react-query";
const token = localStorage.getItem("token");

export const useAllPosts = () => {
  const fetchAllPosts = async () => {
    try {
      const response = await axios.get("http://localhost:3333/post/posts/all", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (err) {
      console.error("error fetching posts", err as AxiosError);
    }
  };

  const { data, refetch, error, isLoading, isFetching } = useQuery({
    queryKey: ["allPostsData"],
    queryFn: fetchAllPosts,
  });

  return { data, refetch, error, isLoading, isFetching };
};
