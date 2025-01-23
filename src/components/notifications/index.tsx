import { forwardRef } from "react";
import TimeAgo from "javascript-time-ago";
import en from "javascript-time-ago/locale/en";
TimeAgo.addLocale(en);
const timeAgo = new TimeAgo("en-US");
import { useNotifications } from "../../utilsQuery/useNotification";

const Notifications = forwardRef<HTMLDivElement>((_, ref): JSX.Element => {
  const data = useNotifications();

  return (
    <div
      className="py-6 px-6 border-r rounded-e-[16px] bg-white w-72"
      ref={ref}
    >
      <p className="text-2xl font-semibold">Notifications</p>
      <div className="py-6 flex flex-col gap-8">
        {data?.notifications.map((n) => (
          <div>
            <div className="text-sm flex items-center gap-4">
              <div className="h-8 w-8 rounded-full border" />
              <div>
                <p className="font-bold">{n.senderUsername}</p> {n.type}
                <div className="text-xs text-gray-400">
                  {timeAgo.format(new Date(n.createdAt ?? new Date()))}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
});

export default Notifications;
