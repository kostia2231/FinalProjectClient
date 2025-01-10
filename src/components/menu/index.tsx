import MenuItem from "../../ui/MenuItem";
import { Outlet } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/router-devtools";
import {
  HomeIcon,
  SearchIcon,
  ExploreIcon,
  MessagesIcon,
  NotificationIcon,
  CreateIcon,
  ProfileIcon,
} from "../../assets/menu_icons/MenuIcons";

const Menu = () => {
  return (
    <div className="flex flex-row w-screen">
      <div className="fixed top-0 h-screen border-r w-[20%]">
        <div className="flex flex-col m-3 gap-3">
          <MenuItem name="Home" icon={<HomeIcon />} path="/" />

          <MenuItem name="Search" icon={<SearchIcon />} path="/search" />

          <MenuItem name="Explore" icon={<ExploreIcon />} path="/explore" />

          <MenuItem name="Messages" icon={<MessagesIcon />} path="/messages" />

          <MenuItem
            name="Notifications"
            icon={<NotificationIcon />}
            path="/notification"
          />

          <MenuItem name="Create" icon={<CreateIcon />} />

          <MenuItem name="Profile" icon={<ProfileIcon />} path="/profile" />

          <TanStackRouterDevtools />
        </div>
      </div>
      <div className="flex ml-[20%] pt-3 px-3 w-full">
        <Outlet />
      </div>
    </div>
  );
};

export default Menu;
