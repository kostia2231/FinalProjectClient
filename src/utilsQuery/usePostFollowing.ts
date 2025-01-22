import { useQuery } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";
import { TPost } from "../types/postData";

interface IFollowingPosts {
  message: "string";
  posts: TPost[];
}

export const usePostFollowing = () => {
  const userId = localStorage.getItem("userId");
  const token = localStorage.getItem("token");

  const fetchPostFollowing = async () => {
    try {
      const response = await axios.get(
        `http://localhost:3333/post/${userId}/all-following-posts`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      return response.data;
    } catch (err) {
      console.error(
        "error fetching following posts",
        (err as AxiosError).message,
      );
    }
  };

  const { data, isFetching, refetch } = useQuery<IFollowingPosts>({
    queryKey: ["postsFollowing"],
    queryFn: fetchPostFollowing,
    enabled: !!userId,
  });

  return { data, isFetching, refetch };
};
