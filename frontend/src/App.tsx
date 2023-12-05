import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Navbar from "./components/navbar";
import ServerPage from "./routes/server";
import ServersPage from "./routes/servers";
import { queryClient } from "./shared";
import { QueryClientProvider } from "@tanstack/react-query";

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
  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />;
    </QueryClientProvider>
  );
}

export default App;
