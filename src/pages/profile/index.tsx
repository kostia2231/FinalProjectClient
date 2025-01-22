import { useEffect, useState } from "react";
import { useNavigate } from "@tanstack/react-router";
import { profileByUsernameRoute } from "../../routes";
import { useUser } from "../../utilsQuery/useUser";
import { useUserPosts } from "../../utilsQuery/usePost";
import Button from "../../ui/Button";
import { TPostsData } from "../../types/postData";
import { TUserData } from "../../types/userData";
import { follow, unfollow } from "../../utilsQuery/subscription";
import ProfileExitModal from "../../components/profileExitModal";

const Profile = (): JSX.Element => {
  const { username }: { username: string } = profileByUsernameRoute.useParams();
  const { cachedData, fetchUserData } = useUser();
  const { fetchPosts, cachedUserPostsData } = useUserPosts();
  const [userData, setUserData] = useState<TUserData | undefined>(undefined);
  const [userPosts, setUserPosts] = useState<TPostsData | undefined>(undefined);
  const [isAdmin, setIsAdmin] = useState<boolean>(false);

  const [isExitModalOpen, setExitModalOpen] = useState<boolean>(false);

  const usernameToken = localStorage.getItem("username");
  const userId = userData?.user._id;

  useEffect(() => {
    let isMounted = true;

    const fetchData = async () => {
      try {
        const result = await fetchUserData(username);
        if (isMounted) setUserData(result);
      } catch (err) {
        console.error(`error fetching ${username} data:`, err);
      }
    };

    if (username) fetchData();
    return () => {
      isMounted = false;
    };
  }, [username, fetchUserData]);

  useEffect(() => {
    if (username === usernameToken) {
      setIsAdmin(true);
    } else if (userId) {
      setIsAdmin(false);
    }
  }, [username, usernameToken, userId]);

  useEffect(() => {
    let isMounted = true;

    const fetchUserPosts = async () => {
      try {
        if (userId && !isAdmin) {
          const response = await fetchPosts(userId);
          if (isMounted) setUserPosts(response);
        }
      } catch (err) {
        console.error("error fetching user posts", err);
      }
    };

    fetchUserPosts();

    return () => {
      isMounted = false;
    };
  }, [userId, fetchPosts, isAdmin]);

  function handleFollow() {
    if (!userId) return;
    if (!userData.isFollowing) {
      follow(userId).then(async () => {
        try {
          const result = await fetchUserData(username);
          setUserData(result);
        } catch (err) {
          console.error(`error fetching ${username} data:`, err);
        }
      });
    } else {
      unfollow(userId).then(async () => {
        try {
          const result = await fetchUserData(username);
          setUserData(result);
        } catch (err) {
          console.error(`error fetching ${username} data:`, err);
        }
      });
    }
  }

  const navigate = useNavigate();
  function toEdit() {
    navigate({ to: "/edit" });
  }

  function toPost(postId: string) {
    navigate({ to: `/post/${postId}` });
  }

  function toggleCreateModal(): void {
    setExitModalOpen((prev) => !prev);
  }

  const postsToRender = isAdmin ? cachedUserPostsData?.posts : userPosts?.posts;

  const headerData = isAdmin ? cachedData : userData;

  return (
    <div>
      <div className="w-[908px]">
        {headerData && (
          <header className="flex gap-20">
            <section>
              {userData?.user.profileImg ? (
                <div className="w-[120px] h-[120px] rounded-full">
                  <img
                    className="rounded-full w-fit h-fit object-cover"
                    src={userData?.user.profileImg}
                  />
                </div>
              ) : (
                <div className="w-[120px] h-[120px] bg-white border rounded-full" />
              )}
            </section>
            <section className="grid gap-6 w-full">
              <div className="flex items-center">
                <div className="flex items-center gap-6">
                  <p>{headerData ? headerData.user.username : "Loading..."}</p>
                  {isAdmin && (
                    <Button variant="profile" onClick={toEdit}>
                      Edit profile
                    </Button>
                  )}

                  {!isAdmin && (
                    <Button
                      variant={`${userData?.isFollowing ? "profile" : "profilePrimary"}`}
                      onClick={handleFollow}
                    >
                      {userData?.isFollowing ? "Followed" : "Follow"}
                    </Button>
                  )}
                  {!isAdmin && <Button variant="profile">Message</Button>}
                </div>
                {isAdmin && (
                  <div
                    className="cursor-pointer ml-auto text-[8px]"
                    onClick={toggleCreateModal}
                  >
                    ● ● ●
                  </div>
                )}
              </div>
              <div className="flex gap-6 text">
                <div className="flex gap-2">
                  <p>{headerData?.user.postsCount || 0}</p>
                  <p>posts</p>
                </div>
                <div className="flex gap-2">
                  <p>{headerData?.user.followersCount || 0}</p>
                  <p>followers</p>
                </div>
                <div className="flex gap-2">
                  <p>{headerData?.user.followingCount || 0}</p>
                  <p>following</p>
                </div>
              </div>
              <div>
                <p>{headerData?.user.bio || "No bio available"}</p>
              </div>
              {headerData?.user.website && (
                <a
                  className="text-blue-900 font-semibold"
                  href={headerData.user.website}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {headerData.user.website}
                </a>
              )}
            </section>
          </header>
        )}

        {postsToRender && (
          <main className="grid gap-1 mt-16 grid-cols-3 border-t pt-5">
            {postsToRender?.length ? (
              postsToRender.map((post) => (
                <div key={post._id}>
                  <img
                    onClick={() => toPost(post._id)}
                    className="h-[300px] w-[300px] object-cover cursor-pointer"
                    src={post.imgUrls[0]}
                    alt={`Post ${post._id}`}
                  />
                </div>
              ))
            ) : (
              <div className="w-[908px] text-center">
                There is no posts yet.
              </div>
            )}
          </main>
        )}
      </div>

      <ProfileExitModal
        onClose={() => setExitModalOpen(false)}
        isOpen={isExitModalOpen}
      />
    </div>
  );
};

export default Profile;
