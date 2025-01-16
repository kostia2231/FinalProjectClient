import { useEffect, useState } from "react";
import { useNavigate } from "@tanstack/react-router";
import { profileByUsernameRoute } from "../../routes";
import { useUser } from "../../utilsQuery/useUser";
import { useUserPosts } from "../../utilsQuery/usePost";
import Button from "../../ui/Button";
import PostModal from "../../components/postModal";
import { TPostsData } from "../../types/postData";
import { TUserData } from "../../types/userData";
import { jwtDecode } from "jwt-decode";
import { DecodedToken } from "../../utilsQuery/usePost";

const Profile = (): JSX.Element => {
  const { username }: { username: string } = profileByUsernameRoute.useParams();
  const { cachedData, fetchUserData } = useUser();
  const { fetchPosts } = useUserPosts();
  const [userId, setUserId] = useState<string | undefined>(undefined);
  const [userData, setUserData] = useState<TUserData | undefined>(undefined);
  const [userPosts, setUserPosts] = useState<TPostsData | undefined>(undefined);
  const [openPostId, setOpenPostId] = useState<string | null>(null);
  const [isAdmin, setIsAdmin] = useState<boolean>(false);

  const token = localStorage.getItem("token");

  useEffect(() => {
    if (token) {
      const userIdToken = jwtDecode<DecodedToken>(token);
      const userAdminId = userIdToken.id;

      if (userId === userAdminId) {
        setIsAdmin(true);
      }
    }
  }, [token, userId]);

  useEffect(() => {
    const id = userData?.user._id;
    setUserId(id);
  }, [userData?.user._id]);

  useEffect(() => {
    const fetchUserPosts = async () => {
      try {
        if (userId) {
          const response = await fetchPosts(userId);
          setUserPosts(response);
        }
        return;
      } catch (err) {
        console.error("Error fetching user posts", err);
      }
    };
    fetchUserPosts();
  }, [userId]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await fetchUserData(username);
        setUserData(result);
      } catch (err) {
        console.error(`Error fetching ${username} data:`, err);
      }
    };
    if (username) {
      fetchData();
    }
  }, [username]);

  function handleClick(postId: string): void {
    setOpenPostId(postId);
  }

  function closeModal(): void {
    setOpenPostId(null);
  }

  const navigate = useNavigate();
  function toEdit() {
    navigate({ to: "/edit" });
  }

  return (
    <div className="w-[908px]">
      <header className="flex gap-20">
        <section>
          <div className="w-[120px] h-[120px] bg-white border rounded-full" />
        </section>

        <section className="grid gap-6">
          <div className="flex items-center gap-6">
            <p>
              {userData ? userData.user.username : cachedData?.user.username}
            </p>
            {isAdmin && (
              <Button variant="profile" onClick={toEdit}>
                Edit profile
              </Button>
            )}
            {!isAdmin && <Button variant="profilePrimary">Follow</Button>}
            {!isAdmin && <Button variant="profile">Message</Button>}
          </div>
          <div className="flex gap-6 text">
            <div className="flex gap-2">
              <p>
                {userData
                  ? userData.user.postsCount
                  : cachedData?.user.postsCount}
              </p>
              <p>posts</p>
            </div>
            <div className="flex gap-2">
              <p>
                {userData
                  ? userData.user.followersCount
                  : cachedData?.user.followersCount}
              </p>
              <p>folowers</p>
            </div>
            <div className="flex gap-2">
              <p>
                {userData
                  ? userData.user.followingCount
                  : cachedData?.user.followingCount}
              </p>
              <p>folowing</p>
            </div>
          </div>
          <div>
            <p>{userData ? userData.user.bio : cachedData?.user.bio}</p>
          </div>
          <div>
            <a className="text-blue-900 font-semibold" href="">
              {userData ? userData.user.website : cachedData?.user.website}
            </a>
          </div>
        </section>
      </header>

      <main className="grid gap-1 mt-16 grid-cols-3 border-t pt-5">
        {userPosts?.posts?.map((post) => (
          <div key={post._id}>
            <img
              onClick={() => handleClick(post._id)}
              className="h-[300px] w-[300px] object-cover cursor-pointer"
              src={post.imgUrls[0]}
              alt={`Post ${post._id}`}
            />
            {openPostId === post._id && (
              <PostModal
                isAdmin={isAdmin}
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
