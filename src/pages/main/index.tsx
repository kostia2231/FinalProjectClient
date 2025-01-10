import { Outlet } from "@tanstack/react-router";
import Menu from "../../components/menu";

const Main = (): JSX.Element => {
  return (
    <>
      <div>
        <div className="h-screen fixed w-fit">
          <Menu />
        </div>
        <div className="grid grid-cols-[225px_1fr]">
          {/* dummy block */}
          <div></div>
          <div className="mx-auto mt-6">
            <Outlet />
          </div>
        </div>
      </div>
    </>
  );
};
export default Main;
