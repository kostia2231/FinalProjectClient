import {
  createRouter,
  createRoute,
  createRootRoute,
} from "@tanstack/react-router";
import LogIn from "../pages/login";
import SignIn from "../pages/signIn";
import Menu from "../components/menu";
import Main from "../pages/main";
import Search from "../pages/search";
import Explore from "../pages/explore";
import Messages from "../pages/messages";
import Notification from "../pages/notification";
import Profile from "../pages/profile";

//root router
const rootRoute = createRootRoute({
  component: Menu,
});

//routes
const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/",
  component: Main,
});

const searchRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/search",
  component: Search,
});

const exploreRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/explore",
  component: Explore,
});

const messagesRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/messages",
  component: Messages,
});

const notificationRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/notification",
  component: Notification,
});

const profileRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/profile",
  component: Profile,
});

const logInRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/login",
  component: LogIn,
});

const signInRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/signin",
  component: SignIn,
});

//router
export const router = createRouter({
  routeTree: rootRoute.addChildren([
    indexRoute,
    logInRoute,
    signInRoute,
    searchRoute,
    profileRoute,
    exploreRoute,
    messagesRoute,
    notificationRoute,
  ]),
});

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}
