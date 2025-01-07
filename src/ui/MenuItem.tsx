import { ReactNode, FC } from "react";
import { useLocation } from "@tanstack/react-router";

interface MenuItemP {
  icon: ReactNode;
  name: string;
  path?: string;
}

const MenuItem: FC<MenuItemP> = ({ icon, name, path }) => {
  const pathname = useLocation({
    select: (location) => location.pathname,
  });

  return (
    <>
      <div className="flex gap-4 h-auto rounded-lg  cursor-pointer hover:bg-gray-100 p-3 justify-start items-start">
        <div>{icon}</div>
        <p
          className={`text-[1rem] font-normal ${path === pathname ? "font-[700]" : null}`}
        >
          {name}
        </p>
      </div>
    </>
  );
};
export default MenuItem;
