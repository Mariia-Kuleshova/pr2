import { createHashRouter } from "react-router-dom";
import Home from "./pages/Home";
import Register from "./pages/Register";
import Participants from "./pages/Participants";
import NotFound from "./pages/NotFound";
import Analytics from "./pages/Analytics";

export const router = createHashRouter([
  { path: "/", element: <Home /> },
  { path: "/register/:eventId", element: <Register /> },
  { path: "/participants/:eventId", element: <Participants /> },
  { path: "/analytics", element: <Analytics /> },
  { path: "*", element: <NotFound /> },
]);
