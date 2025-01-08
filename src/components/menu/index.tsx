import MenuItem from "../../ui/MenuItem";
import { Outlet, Link } from "@tanstack/react-router";
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
      <div className="fixed top-0 left-0 h-screen border-r w-[20%]">
        <div className="flex flex-col m-3 gap-3">
          <Link to="/">
            <MenuItem name="Home" icon={<HomeIcon />} path="/" />
          </Link>

          <Link to="/search">
            <MenuItem name="Search" icon={<SearchIcon />} path="/search" />
          </Link>

          <Link to="/explore">
            <MenuItem name="Explore" icon={<ExploreIcon />} path="/explore" />
          </Link>

          <Link to="/messages">
            <MenuItem
              name="Messages"
              icon={<MessagesIcon />}
              path="/messages"
            />
          </Link>

          <Link to="/notification">
            <MenuItem
              name="Notifications"
              icon={<NotificationIcon />}
              path="/notification"
            />
          </Link>

          <MenuItem name="Create" icon={<CreateIcon />} path="create" />

          <Link to="/profile">
            <MenuItem name="Profile" icon={<ProfileIcon />} path="/profile" />
          </Link>

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
