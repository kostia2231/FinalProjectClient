import { useState, useRef, useEffect, MouseEvent, FC } from "react";
import MenuItemLink from "../../ui/MenuItemLink";
import MenuItem from "../../ui/MenuItem";
import Notifications from "../notifications";
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

const Menu: FC = () => {
  const [isNotificationOpen, setIsNotificationOpen] = useState<boolean>(false);
  const notificationsRef = useRef<HTMLDivElement | null>(null);

  function toggleNotification(): void {
    setIsNotificationOpen((prev) => !prev);
  }

  useEffect(() => {
    function handleClickOutside(
      event: MouseEvent | globalThis.MouseEvent,
    ): void {
      const target = event.target as HTMLElement;
      if (
        notificationsRef.current &&
        !notificationsRef.current.contains(event.target as Node) &&
        !target.closest(".notification-button")
      ) {
        setIsNotificationOpen(false);
      }
    }

    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  return (
    <>
      <div className="flex">
        <main className="flex flex-col mx-3 gap-3 w-[200px] mt-3">
          <MenuItemLink name="Home" icon={<HomeIcon />} path="/" />

          <MenuItemLink name="Search" icon={<SearchIcon />} path="/search" />

          <MenuItemLink name="Explore" icon={<ExploreIcon />} path="/explore" />

          <MenuItemLink
            name="Messages"
            icon={<MessagesIcon />}
            path="/messages"
          />

          <MenuItem
            name="Notifications"
            icon={<NotificationIcon />}
            onClick={toggleNotification}
            className="notification-button"
          />

          <MenuItemLink name="Create" icon={<CreateIcon />} path="create" />

          <MenuItemLink name="Profile" icon={<ProfileIcon />} path="/profile" />

          <TanStackRouterDevtools />
        </main>

        <div className="h-screen w-[1px] border-l" />

        {isNotificationOpen && <Notifications ref={notificationsRef} />}
      </div>
    </>
  );
};

export default Menu;
