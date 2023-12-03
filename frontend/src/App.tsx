import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Navbar from "./components/navbar";
import ServerPage from "./routes/server";
import ServersPage from "./routes/servers";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Navbar />,
    children: [
      {
        path: "server/:containerId",
        element: <ServerPage />,
      },
      {
        path: "/",
        element: <ServersPage />,
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
