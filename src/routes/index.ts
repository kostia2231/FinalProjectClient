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
import Explore from "../pages/explore";
import Messages from "../pages/messages";
import Profile from "../pages/profile";
import ProfileEdit from "../pages/profileEdit";
import NotFound from "../pages/404";
import Reset from "../pages/reset";
import PostModalWrapper from "../pages/postModalWrapper";

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

export const profileByUsernameRoute = createRoute({
  getParentRoute: () => menuRoute,
  path: "$username",
  component: Profile,
});

const profileEditRoute = createRoute({
  getParentRoute: () => menuRoute,
  path: "edit",
  component: ProfileEdit,
});

export const postModalWrapperRoute = createRoute({
  getParentRoute: () => menuRoute,
  path: "post/$postId",
  component: PostModalWrapper,
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

const resetPasswordRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "password-reset",
  component: Reset,
});

export const router = createRouter({
  routeTree: rootRoute.addChildren([
    rootProtected.addChildren([
      menuRoute.addChildren([
        indexRoute,
        exploreRoute,
        messagesRoute,
        profileByUsernameRoute,
        profileEditRoute,
        postModalWrapperRoute,
        notFoundRoute,
      ]),
    ]),
    logInRoute,
    signInRoute,
    resetPasswordRoute,
  ]),
});
