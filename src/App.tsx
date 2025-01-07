import { RouterProvider } from "@tanstack/react-router";
import { router } from "./routes";

const App = () => {
  return (
    <div>
      <RouterProvider router={router} />
    </div>
  );
};

export default App;
