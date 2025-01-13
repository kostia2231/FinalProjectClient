import { useState, useRef, useEffect, MouseEvent } from "react";
import { TanStackRouterDevtools } from "@tanstack/router-devtools";
import Notifications from "../notifications";
import Search from "../search";
import MenuItemLink from "../../ui/MenuItemLink";
import MenuItem from "../../ui/MenuItem";
import {
  HomeIcon,
  SearchIcon,
  ExploreIcon,
  MessagesIcon,
  NotificationIcon,
  CreateIcon,
  ProfileIcon,
} from "../../assets/menu_icons/MenuIcons";

const Menu = (): JSX.Element => {
  const [isNotificationOpen, setIsNotificationOpen] = useState<boolean>(false);
  const [isSearchOpen, setIsSearchOpen] = useState<boolean>(false);

  const notificationsRef = useRef<HTMLDivElement | null>(null);
  const searchRef = useRef<HTMLDivElement | null>(null);

  function toggleNotification(): void {
    setIsNotificationOpen((prev) => !prev);
  }

  function toggleSearch(): void {
    setIsSearchOpen((prev) => !prev);
  }

  useEffect(() => {
    function handleClickOutside(
      event: MouseEvent | globalThis.MouseEvent,
    ): void {
      const target = event.target as HTMLElement;
      if (
        searchRef.current &&
        !searchRef.current.contains(event.target as Node) &&
        !target.closest(".search-button")
      ) {
        setIsSearchOpen(false);
      }
    }

    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

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

          <MenuItem
            name="Search"
            icon={<SearchIcon />}
            onClick={toggleSearch}
            className="search-button"
          />
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

          <MenuItem name="Create" icon={<CreateIcon />} />

          <MenuItemLink name="Profile" icon={<ProfileIcon />} path="/profile" />

          <TanStackRouterDevtools />
        </main>

        <div className="h-screen w-[1px] border-l" />

        {isNotificationOpen && <Notifications ref={notificationsRef} />}

        {isSearchOpen && <Search ref={searchRef} />}
      </div>
    </>
  );
};

export default Menu;
