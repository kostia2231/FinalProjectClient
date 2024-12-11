import FormSignIn from "../../components/formSignIn";

const SignIn = () => {
  return (
    <>
      <div className="flex justify-between py-[2%] px-[20%]">
        <div>{/* тут левый блок  */}</div>
        <div className="w-[50%] flex flex-col justify-center items-center gap-2">
          <div className="flex flex-col items-center justify-center w-full p-10 border">
            <FormSignIn />
          </div>
          <div className="flex w-full p-10 border items-center justify-center gap-2"></div>
        </div>
      </div>
    </>
  );
};

export default SignIn;
