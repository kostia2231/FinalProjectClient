import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";

interface INotification {
  notifications: {
    _id: string;
    senderUsername: string;
    type: string;
    createdAt: string;
  }[];
}

export const useNotifications = () => {
  const queryClient = useQueryClient();
  const userId = localStorage.getItem("userId");
  const token = localStorage.getItem("token");
  const endpoint = `http://localhost:3333/notification/${userId}`;

  const { data, isLoading, isError, refetch } = useQuery<INotification>({
    queryKey: ["notificationsData"],
    queryFn: async () => {
      try {
        const response = await axios.get(endpoint, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        return response.data;
      } catch (err) {
        console.error(
          "error fetching notifications",
          (err as AxiosError).message,
        );
      }
    },
  });

  const mutation = useMutation({
    mutationKey: ["notificationsData"],
    mutationFn: async (notificationId: string) => {
      try {
        const response = await axios.delete(
          `http://localhost:3333/notification/delete/${notificationId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        );
        console.log(response.data);
        return response.data;
      } catch (err) {
        console.error(
          "error deleting notification",
          (err as AxiosError).message,
        );
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: "notificationsData" });
      refetch();
    },
    onError: (err: AxiosError) => {
      console.error("error deleting comment", err.message);
    },
  });

  return { data, isLoading, isError, mutation, refetch };
};
