import { ReactNode, FC } from "react";

interface MenuItemP {
  icon: ReactNode;
  name: string;
  onClick?: () => void;
  className?: string;
}

const MenuItem: FC<MenuItemP> = ({ icon, name, onClick, className }) => {
  return (
    <div
      className={`flex gap-4 h-auto rounded-lg hover:bg-gray-100 p-3 cursor-pointer ${className}`}
      onClick={onClick}
    >
      <div>{icon}</div>
      <p>{name}</p>
    </div>
  );
};
export default MenuItem;
