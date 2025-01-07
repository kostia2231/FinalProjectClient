import {
  RouterProvider,
  createRouter,
  createRoute,
  createRootRoute,
} from "@tanstack/react-router";
import LogIn from "./pages/login";
import SignIn from "./pages/signIn";
import Menu from "./components/menu";
import Main from "./pages/main";
import Search from "./pages/search";

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
const router = createRouter({
  routeTree: rootRoute.addChildren([
    indexRoute,
    logInRoute,
    signInRoute,
    searchRoute,
  ]),
});

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

const App = () => {
  return <RouterProvider router={router} />;
};

export default App;
