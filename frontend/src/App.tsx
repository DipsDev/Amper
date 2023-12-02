import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Navbar from "./components/navbar";
import ServerPage from "./routes/server";

const router = createBrowserRouter([
  {
    path: "/server/:containerId",
    element: <ServerPage />,
  },
]);

function App() {
  return (
    <main>
      <Navbar />
      <RouterProvider router={router} />
    </main>
  );
}

export default App;
