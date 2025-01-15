import { useNavigate } from "@tanstack/react-router";
import Button from "../../ui/Button";
import useUser from "../../utils/useUser";
import { useUserPosts } from "../../utils/usePost";
import { useEffect, useState } from "react";
import PostModal from "../../components/postModal";
import { IPost } from "../../types/postData";

const Profile = (): JSX.Element => {
  const { cachedData } = useUser();
  const [userPosts, setUserPosts] = useState<IPost[] | undefined>(undefined);
  const [openPostId, setOpenPostId] = useState<string | null>(null);

  const { cachedUserPostsData } = useUserPosts();

  function handleClick(postId: string): void {
    setOpenPostId(postId);
  }

  function closeModal(): void {
    setOpenPostId(null);
  }

  useEffect(() => {
    if (cachedUserPostsData?.posts) {
      setUserPosts(
        Array.isArray(cachedUserPostsData.posts)
          ? cachedUserPostsData.posts
          : [cachedUserPostsData.posts],
      );
    }
  }, [cachedUserPostsData]);

  const navigate = useNavigate();
  function toEdit() {
    navigate({ to: "/edit" });
  }

  //to add pending and errors
  return (
    <div className="w-[908px]">
      <header className="flex gap-20">
        <section>
          <div className="w-[120px] h-[120px] bg-white border rounded-full" />
        </section>

        <section className="grid gap-6">
          <div className="flex items-center gap-6">
            <p>{cachedData?.user.username}</p>
            <Button variant="profile" onClick={toEdit}>
              Edit profile
            </Button>
          </div>
          <div className="flex gap-6 text">
            <div className="flex gap-2">
              <p>{cachedData?.user.postsCount}</p>
              <p>posts</p>
            </div>
            <div className="flex gap-2">
              <p>{cachedData?.user.followersCount}</p>
              <p>folowers</p>
            </div>
            <div className="flex gap-2">
              <p>{cachedData?.user.followingCount}</p>
              <p>folowing</p>
            </div>
          </div>
          <div>
            <p>{cachedData?.user.bio}</p>
          </div>
          <div>
            <a className="text-blue-900 font-semibold" href="">
              {cachedData?.user.website}
            </a>
          </div>
        </section>
      </header>

      <main className="grid gap-1 mt-16 grid-cols-3 border-t pt-5">
        {userPosts?.map((post) => (
          <div key={post._id}>
            <img
              onClick={() => handleClick(post._id)}
              className="h-[300px] w-[300px] object-cover cursor-pointer"
              src={post.imgUrls[0]}
              alt={`Post ${post._id}`}
            />
            {openPostId === post._id && (
              <PostModal
                isOpen={!!openPostId}
                onClose={closeModal}
                postId={post._id}
              />
            )}
          </div>
        ))}
        {!userPosts && (
          <>
            <div>You have no posts yet.</div>
          </>
        )}
      </main>
    </div>
  );
};
export default Profile;
