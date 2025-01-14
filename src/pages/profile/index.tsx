import { useNavigate } from "@tanstack/react-router";
import Button from "../../ui/Button";
import useUser from "../../utils/useUser";

const Profile = (): JSX.Element => {
  const { cachedData } = useUser();

  const navigate = useNavigate();
  function toEdit() {
    navigate({ to: "/edit" });
  }

  //to add pending and errors
  return (
    <div>
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
              <p>posts</p>
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
        <div className="w-[300px] h-[300px] bg-gray-100" />
        <div className="w-[300px] h-[300px] bg-gray-100" />
        <div className="w-[300px] h-[300px] bg-gray-100" />
        <div className="w-[300px] h-[300px] bg-gray-100" />
        <div className="w-[300px] h-[300px] bg-gray-100" />
        <div className="w-[300px] h-[300px] bg-gray-100" />
      </main>
    </div>
  );
};
export default Profile;
