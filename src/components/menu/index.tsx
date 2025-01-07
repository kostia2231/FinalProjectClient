import MenuItem from "../../ui/MenuItem";

import { HomeIcon } from "../../assets/menu_icons/HomeIcon";
import { SearchIcon } from "../../assets/menu_icons/SearchIcon";
import { ExploreIcon } from "../../assets/menu_icons/ExploreIcon";
import { MessagesIcon } from "../../assets/menu_icons/MessagesIcon";
import { NotificationIcon } from "../../assets/menu_icons/NotificatiobIcon";
import { CreateIcon } from "../../assets/menu_icons/CreateIcon";
import { ProfileIcon } from "../../assets/menu_icons/ProfileIcon";

import { Outlet, Link } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/router-devtools";

const Menu = () => {
  return (
    <div className="flex m-3">
      <div className="flex flex-col gap-3">
        <Link to="/">
          <MenuItem name="Home" icon={<HomeIcon />} path="/" />
        </Link>

        <Link to="/search">
          <MenuItem name="Search" icon={<SearchIcon />} path="/search" />
        </Link>

        <MenuItem name="Explore" icon={<ExploreIcon />} />

        <MenuItem name="Messages" icon={<MessagesIcon />} />

        <MenuItem name="Notifications" icon={<NotificationIcon />} />

        <MenuItem name="Create" icon={<CreateIcon />} />

        <MenuItem name="Profile" icon={<ProfileIcon />} />

        <TanStackRouterDevtools />
      </div>
      <Outlet />
    </div>
  );
};
export default Menu;
