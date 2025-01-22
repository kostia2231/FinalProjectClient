import { Link, useNavigate } from "@tanstack/react-router";
import FormReset from "../../components/formReset";
import Button from "../../ui/Button";

const Reset = () => {
  const navigate = useNavigate();

  function toLogin() {
    navigate({ to: "/login" });
  }
  return (
    <div className="flex items-center w-screen">
      <div className="w-[400px] mx-auto border p-10 flex flex-col gap-4 mt-12">
        <div className="text-center font-medium text-lg">
          Trouble logging in?
        </div>
        <div className="text-xs text-gray-400 text-center">
          Enter your email and we'll send you a link to get back into your
          account.
        </div>
        <FormReset />
        <div className="flex flex-row w-full items-center gap-5 my-6">
          <div className=" flex-1 h-[1px] border-t" />
          <div>OR</div>
          <div className=" flex-1 h-[1px] border-t" />
        </div>
        <div className="cursor-pointer hover:underline underline-offset-8 text-center">
          <Link to="/signin">Create new account</Link>
        </div>

        <Button variant="link" className="mx-auto mt-4" onClick={toLogin}>
          Back to login
        </Button>
      </div>
    </div>
  );
};

export default Reset;
