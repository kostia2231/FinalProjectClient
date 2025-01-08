import FormLogIn from "../../components/formLogin";
import AuthImg from "../../assets/images/auth.png";
import { Link } from "@tanstack/react-router";

const LogIn = () => {
  return (
    <>
      <div className="flex justify-between mt-12 px-[20%] gap-8 items-center">
        <div>
          <img src={AuthImg} alt="AuthImg" />
        </div>
        <div className="w-[50%] flex flex-col justify-center items-center gap-2 mb-auto">
          <div className="flex flex-col items-center justify-center w-full p-10 border">
            <FormLogIn />
            <div className="flex flex-row w-full items-center gap-5 my-6">
              <div className=" flex-1 h-[1px] border-t" />
              <div>OR</div>
              <div className=" flex-1 h-[1px] border-t" />
            </div>
            <div>Forgot password?</div>
          </div>
          <div className="flex w-full py-6 border items-center justify-center gap-2">
            <div>Don't have an account?</div>
            <div>
              <Link to="/signin" className="text-blue-500 font-semibold">
                Sign up
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default LogIn;
