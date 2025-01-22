//нужно переделать колл-во лайков рендерит все посты заново -- нехорошо =)

import TimeAgo from "javascript-time-ago";
import en from "javascript-time-ago/locale/en";
import { useNavigate } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { NotificationIcon as LikeIcon } from "../../assets/menu_icons/MenuIcons";
// import { MessageIcon } from "../../assets/menu_icons/MenuIcons";
import { usePostFollowing } from "../../utilsQuery/usePostFollowing";
import { like, unlike, likeStatus } from "../../utilsQuery/like";

const Home = () => {
  const navigate = useNavigate();
  TimeAgo.addLocale(en);
  const timeAgo = new TimeAgo("en-US");
  const { data: postsFollowingData, refetch } = usePostFollowing();
  const [likedPosts, setLikedPosts] = useState<Set<string>>(new Set());

  const checkLikeStatus = async (postId: string) => {
    const status = await likeStatus(postId);
    if (status?.isLiked) {
      setLikedPosts((prev) => new Set(prev.add(postId)));
    } else {
      setLikedPosts((prev) => {
        const updated = new Set(prev);
        updated.delete(postId);
        return updated;
      });
    }
  };

  const handleLike = async (postId: string) => {
    const isLiked = likedPosts.has(postId);

    if (isLiked) {
      await unlike(postId);
      setLikedPosts((prev) => {
        const updated = new Set(prev);
        updated.delete(postId);
        return updated;
      });
    } else {
      await like(postId);
      setLikedPosts((prev) => new Set(prev.add(postId)));
    }
  };

  useEffect(() => {
    postsFollowingData?.posts.forEach((post) => {
      checkLikeStatus(post._id);
    });
  }, [postsFollowingData]);

  function toUser(username: string | undefined) {
    navigate({ to: `/${username}` });
  }

  function toPost(postId: string | undefined) {
    navigate({ to: `/post/${postId}` });
  }

  return (
    <>
      <div>
        <div className="flex gap-3 pb-3 text-lg border-b mb-3">
          <div className="font-medium">All time</div>
          <div className="font-medium text-black/20">Today</div>
        </div>

        <div className="grid-cols-1 gap-10 grid">
          {postsFollowingData?.posts.map((post) => (
            <div key={post._id} className="flex flex-col gap-3">
              <div className="flex items-center gap-3 h-fit">
                <div className="h-7 w-7 border rounded-full" />
                <div
                  className="font-medium cursor-pointer"
                  onClick={() => toUser(post.user.username)}
                >
                  {post.user.username}
                </div>
                <div className="text-gray-400">•</div>
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
              <div className="flex gap-3">
                <LikeIcon
                  onClick={() =>
                    handleLike(post._id).finally(() => {
                      refetch();
                    })
                  }
                  className={`cursor-pointer ${likedPosts.has(post._id) ? "text-red-500" : ""}`}
                />

                {/* <MessageIcon /> */}
              </div>
              <div>
                {post.likesCount} {post.likesCount === 1 ? "Like" : "Likes"}
              </div>
              <div className="flex gap-3">
                <div
                  className="font-medium cursor-pointer"
                  onClick={() => toUser(post.user.username)}
                >
                  {post.user.username}
                </div>
                <p>{post.caption}</p>
              </div>
              <div
                className="text-gray-400 cursor-pointer"
                onClick={() => toPost(post._id)}
              >
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
