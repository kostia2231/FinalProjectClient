import MenuItem from "../../ui/MenuItem";
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
    <div className="flex flex-col mx-3 gap-3 w-[200px] mt-3">
      <MenuItem name="Home" icon={<HomeIcon />} path="/" />

      <MenuItem name="Search" icon={<SearchIcon />} path="/search" />

      <MenuItem name="Explore" icon={<ExploreIcon />} path="/explore" />

      <MenuItem name="Messages" icon={<MessagesIcon />} path="/messages" />

      <MenuItem
        name="Notifications"
        icon={<NotificationIcon />}
        path="/notification"
      />

      <MenuItem name="Create" icon={<CreateIcon />} path="create" />

      <MenuItem name="Profile" icon={<ProfileIcon />} path="/profile" />

      <TanStackRouterDevtools />
    </div>
  );
};

export default Menu;
