import { useQuery } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";

interface INotification {
  notifications: {
    id: string;
    senderUsername: string;
    type: string;
    createdAt: string;
  }[];
}

export const useNotifications = () => {
  const userId = localStorage.getItem("userId");
  const token = localStorage.getItem("token");
  const endpoint = `http://localhost:3333/notification/${userId}`;

  const { data } = useQuery<INotification>({
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
  return data;
};
