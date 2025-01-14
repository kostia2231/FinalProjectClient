import FormProfileEdit from "../../components/formEditProfile";

const ProfileEdit = () => {
  return (
    <>
      <div className="grid gap-6 ">
        <div>
          <p className="text-2xl font-semibold">Edit Profile</p>
        </div>
        <FormProfileEdit />
      </div>
    </>
  );
};

export default ProfileEdit;
