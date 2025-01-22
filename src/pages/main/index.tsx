import { Outlet } from "@tanstack/react-router";
import Menu from "../../components/menu";

const Main = (): JSX.Element => {
  return (
    <>
      <div>
        <div className="h-screen fixed w-fit">
          <Menu />
        </div>
        <div className="ml-[225px] pt-6 flex justify-center">
          <Outlet />
        </div>
      </div>
    </>
  );
};
export default Main;
