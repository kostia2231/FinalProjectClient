import { Outlet } from "@tanstack/react-router";
import Menu from "../../components/menu";

const Main = () => {
  return (
    <>
      <div>
        <div className="border-r h-screen fixed w-fit">
          <Menu />
        </div>
        <div className="grid grid-cols-[225px_1fr]">
          {/* dummy block */}
          <div></div>
          <div className="mx-auto mt-3">
            <Outlet />
          </div>
        </div>
      </div>
    </>
  );
};
export default Main;
