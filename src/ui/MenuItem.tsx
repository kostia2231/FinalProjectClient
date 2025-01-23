import { ReactNode, FC } from "react";

interface MenuItemP {
  icon: ReactNode;
  name: string;
  onClick?: () => void;
  className?: string;
  hasNotification?: boolean;
}

const MenuItem: FC<MenuItemP> = ({
  icon,
  name,
  onClick,
  className,
  hasNotification,
}) => {
  return (
    <div
      className={`flex gap-4 h-auto rounded-lg hover:bg-gray-100 p-3 cursor-pointer ${className}`}
      onClick={onClick}
    >
      <div className="relative">
        {icon}
        {hasNotification && (
          <span className="absolute top-0 right-0 h-3 w-3 bg-red-500 rounded-full border-2 border-white" />
        )}
      </div>
      <p>{name}</p>
    </div>
  );
};
export default MenuItem;
