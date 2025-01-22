import { Link } from "@tanstack/react-router";
import FormSignIn from "../../components/formSignIn";

const SignIn = (): JSX.Element => {
  return (
    <>
      <div className="mt-12 w-screen">
        <div className="flex flex-col w-[350px] mx-auto gap-2">
          <div className="p-10 border">
            <FormSignIn />
          </div>
          <div className="flex w-full py-6 border items-center justify-center gap-2">
            <div>Already have an account?</div>
            <div>
              <Link to="/login" className="text-blue-500 font-semibold">
                Log in
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SignIn;
