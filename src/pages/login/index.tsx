import FormLogin from "../../components/formLogin";

const Login = () => {
  return (
    <>
      <div className="flex justify-between py-[2%] px-[20%]">
        <div>{/* тут картинка  */}</div>
        <div className="w-[50%] flex flex-col justify-center items-center gap-2">
          <div className="flex flex-col items-center justify-center w-full p-10 border">
            <FormLogin />
            <div>OR</div>
            <div>Forgot password?</div>
          </div>
          <div className="flex w-full p-10 border">
            <div>Don't have an account?</div>
            <div>Sign Up</div>
          </div>
        </div>
      </div>
    </>
  );
};
export default Login;
