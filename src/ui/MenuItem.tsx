import { ReactNode, FC } from "react";
import { Link } from "@tanstack/react-router";

interface MenuItemP {
  icon: ReactNode;
  name: string;
  path?: string;
}

const MenuItem: FC<MenuItemP> = ({ icon, name, path }) => {
  return (
    <Link to={path} className="[&.active]:font-bold">
      <div className="flex gap-4 h-auto rounded-lg hover:bg-gray-100 p-3">
        <div>{icon}</div>
        <p>{name}</p>
      </div>
    </Link>
  );
};
export default MenuItem;
