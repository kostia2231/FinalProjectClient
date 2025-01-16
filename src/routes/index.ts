import {
  createRouter,
  createRoute,
  createRootRoute,
} from "@tanstack/react-router";
import ProtectedRoutes from "../ui/ProtectedRoutes";
import Home from "../pages/home";
import LogIn from "../pages/login";
import SignIn from "../pages/signIn";
import Main from "../pages/main";
import Search from "../pages/search";
import Explore from "../pages/explore";
import Messages from "../pages/messages";
import Profile from "../pages/profile";
import ProfileEdit from "../pages/profileEdit";
import NotFound from "../pages/404";

const rootRoute = createRootRoute();

const rootProtected = createRoute({
  getParentRoute: () => rootRoute,
  id: "protected",
  component: ProtectedRoutes,
});

const menuRoute = createRoute({
  getParentRoute: () => rootProtected,
  id: "main",
  component: Main,
});

const indexRoute = createRoute({
  getParentRoute: () => menuRoute,
  path: "/",
  component: Home,
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

const profileEditRoute = createRoute({
  getParentRoute: () => menuRoute,
  path: "edit",
  component: ProfileEdit,
});

const notFoundRoute = createRoute({
  getParentRoute: () => menuRoute,
  path: "*",
  component: NotFound,
});

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

export const router = createRouter({
  routeTree: rootRoute.addChildren([
    rootProtected.addChildren([
      menuRoute.addChildren([
        indexRoute,
        searchRoute,
        exploreRoute,
        messagesRoute,
        profileRoute,
        profileEditRoute,
        notFoundRoute,
      ]),
    ]),
    logInRoute,
    signInRoute,
  ]),
});
