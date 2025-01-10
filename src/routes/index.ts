import {
  createRouter,
  createRoute,
  createRootRoute,
} from "@tanstack/react-router";
import LogIn from "../pages/login";
import SignIn from "../pages/signIn";
import Main from "../pages/main";
import Search from "../pages/search";
import Explore from "../pages/explore";
import Messages from "../pages/messages";
import Profile from "../pages/profile";
import NotFound from "../pages/404";

//shared root
const rootRoute = createRootRoute();

//routes with menu
const menuRoute = createRoute({
  getParentRoute: () => rootRoute,
  id: "main",
  component: Main,
});

const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/",
  component: Main,
});

const searchRoute = createRoute({
  getParentRoute: () => menuRoute,
  path: "search",
  component: Search,
});

const exploreRoute = createRoute({
  getParentRoute: () => menuRoute,
  path: "explore",
  component: Explore,
});

const messagesRoute = createRoute({
  getParentRoute: () => menuRoute,
  path: "messages",
  component: Messages,
});

const profileRoute = createRoute({
  getParentRoute: () => menuRoute,
  path: "profile",
  component: Profile,
});

//routes without menu
const logInRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "login",
  component: LogIn,
});

const signInRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "signin",
  component: SignIn,
});

const notFoundRoute = createRoute({
  getParentRoute: () => menuRoute,
  path: "*",
  component: NotFound,
});

export const router = createRouter({
  routeTree: rootRoute.addChildren([
    //menuMain
    menuRoute.addChildren([
      indexRoute,
      searchRoute,
      exploreRoute,
      messagesRoute,
      profileRoute,
      notFoundRoute,
    ]),
    //auth
    logInRoute,
    signInRoute,
  ]),
});
