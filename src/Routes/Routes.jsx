import { createBrowserRouter } from "react-router-dom";
import Main from "../Layout/Main";
import AboutPage from "../pages/AboutPage/AboutPage";
import Bookings from "../pages/Bookings/Bookings";
import Checkout from "../pages/Checkout/Checkout";
import Home from "../pages/Home/Home/Home";
import Login from "../pages/Login/Login";
import Signup from "../pages/Signup/Signup";
import PrivateRoute from "./PrivateRoute";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Main />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/about",
        element: <AboutPage />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/signup",
        element: <Signup />,
      },
      {
        path: "/checkout/:id",
        element: (
          <PrivateRoute>
            {" "}
            <Checkout />{" "}
          </PrivateRoute>
        ),
        loader: ({ params }) =>
          fetch(`http://localhost:7000/services/${params.id}`),
      },
      {
        path: "/bookings",
        element: (
          <PrivateRoute>
            {" "}
            <Bookings />{" "}
          </PrivateRoute>
        ),
      },
    ],
  },
]);

export default router;
