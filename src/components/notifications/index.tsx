import { forwardRef } from "react";
import TimeAgo from "javascript-time-ago";
import en from "javascript-time-ago/locale/en";
TimeAgo.addLocale(en);
const timeAgo = new TimeAgo("en-US");
import { useNotifications } from "../../utilsQuery/useNotification";

const Notifications = forwardRef<HTMLDivElement>((_, ref): JSX.Element => {
  const { data, mutation } = useNotifications();

  console.log(data);

  return (
    <div
      className="py-6 px-6 border-r rounded-e-[16px] bg-white w-72"
      ref={ref}
    >
      <p className="text-2xl font-semibold">Notifications</p>
      <div className="py-6 flex flex-col gap-8">
        {data?.notifications.map((n) => (
          <div className="flex justify-between" key={n._id}>
            <div className="text-sm flex items-start gap-4">
              <div className="h-8 w-8 rounded-full border mt-[2px]" />
              <div className="flex flex-col">
                <p className="font-bold leading-1">{n.senderUsername}</p>
                <p>{n.type}.</p>
                {n.postImg && (
                  <img
                    src={n.postImg}
                    className="w-[80px] h-[80px] my-2 object-cover"
                  />
                )}
                <div className="text-xs text-gray-400">
                  {timeAgo.format(new Date(n.createdAt ?? new Date()))}
                </div>
              </div>
            </div>

            <div
              onClick={() => mutation.mutate(n._id)}
              className="w-4 h-4 p-4 text-gray-400 rounded-full hover:bg-gray-100 active:bg-gray-50 flex justify-center items-center cursor-pointer font-light"
            >
              x
            </div>
          </div>
        ))}
      </div>
    </div>
  );
});

export default Notifications;
