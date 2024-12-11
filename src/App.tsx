import {
  Outlet,
  RouterProvider,
  Link,
  createRouter,
  createRoute,
  createRootRoute,
} from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/router-devtools";
import LogIn from "./pages/logIn";
import SignIn from "./pages/signIn";

//root router
const rootRoute = createRootRoute({
  component: () => (
    <>
      <div className="p-2 flex gap-2">
        <Link to="/" className="[&.active]:font-bold">
          Home
        </Link>
        <Link to="/login" className="[&.active]:font-bold">
          Log In
        </Link>
        <Link to="/signin" className="[&.active]:font-bold">
          Sign In
        </Link>
      </div>
      <hr />
      <Outlet />
      <TanStackRouterDevtools />
    </>
  ),
});

//routes
const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/",
  component: function Index() {
    return (
      <div className="p-2">
        <h3>ICHGRAM</h3>
      </div>
    );
  },
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
  routeTree: rootRoute.addChildren([indexRoute, logInRoute, signInRoute]),
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
