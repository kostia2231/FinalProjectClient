import Button from "../../ui/Button";

const Profile = () => {
  return (
    <>
      <header className="flex gap-20">
        <section>
          <div className="w-[120px] h-[120px] bg-white border rounded-full" />
        </section>

        <section className="grid gap-6">
          <div className="flex items-center gap-6">
            <p>username</p>
            <Button variant="profile">Edit profile</Button>
          </div>
          <div className="flex gap-6 text">
            <p>0 posts</p>
            <p>0 followers</p>
            <p>0 following</p>
          </div>
          <div>
            <p>this is to become a bio section</p>
          </div>
          <div>
            <a className="text-blue-900 font-semibold" href="">
              http://www.notalink.com
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
    </>
  );
};
export default Profile;
