import TimeAgo from "javascript-time-ago";
import en from "javascript-time-ago/locale/en";
import { NotificationIcon as LikeIcon } from "../../assets/menu_icons/MenuIcons";
import { usePostFollowing } from "../../utilsQuery/usePostFollowing";

const Home = () => {
  TimeAgo.addLocale(en);
  const timeAgo = new TimeAgo("en-US");

  const { data: postsFollowingData } = usePostFollowing();
  console.log(postsFollowingData);

  function handleLike() {}
  return (
    <>
      <div>
        <div className="flex gap-3 pb-3 text-xl border-b mb-3">
          <div className="font-medium">All time</div>
          <div className="font-medium text-black/20">Today</div>
        </div>
        <div className="grid-cols-1 gap-10 grid">
          {postsFollowingData?.posts.map((post) => (
            <div key={post._id} className="flex flex-col gap-3">
              <div className="flex items-center gap-3 h-fit">
                <div className="h-7 w-7 border rounded-full" />
                <p>{post.user.username}</p>
                <p className="text-gray-400 text-sm font-light">
                  {timeAgo.format(new Date(post.createdAt ?? new Date()))}
                </p>
              </div>
              <div className="h-[500px] w-[500px]">
                <img
                  src={post.imgUrls[0]}
                  className="object-cover h-full w-full rounded"
                />
              </div>
              <div>
                <LikeIcon onClick={handleLike} />
              </div>
              <div>{post.likesCount} Likes</div>
              <div className="flex gap-3">
                <p>{post.user.username}</p>
                <p>{post.caption}</p>
              </div>
              <div className="text-gray-400">
                Show all comments ({post.commentsCount})
              </div>
              <hr />
            </div>
          ))}
        </div>
      </div>
    </>
  );
};
export default Home;
