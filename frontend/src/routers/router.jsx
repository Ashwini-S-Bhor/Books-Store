import {
    createBrowserRouter,
    } from "react-router-dom";
import App from "../App";
import { Home } from "../pages/home/Home";
import Register from "../component/Register";
import Login from "../component/login";
import CartPage from "../pages/books/CartPage";
import CheckoutPage from "../pages/books/CheckoutPage";
import SingleBook from "../pages/books/SingleBook";
import PrivateRoute from "./PrivateRoute";
import OrdersPage from "../redux/features/orders/OrdersPage";
import About from "../pages/Footer/About";
import Contact from "../pages/Footer/Contact";

import TermsOfService from "../pages/Conditions/TermsOfService";
import PolicyPrivacy from "../pages/Conditions/PolicyPrivacy";
import SearchPage from "../pages/books/BookSearch";
import AdminPrivateRoute from "./AdminPrivateRoute";

import AdminLogin from "../Admin/AdminLogin";
import AdminDashboard from "../Admin/AdminDashboard";
import WishlistPage from "../pages/books/WishlistPage";


const router = createBrowserRouter([
  {
    path: "/",
    element: <App/>, // user layout with Navbar/Footer
    children: [
      { path: "/", element: <Home/> },
      { path: "/orders", element: <PrivateRoute><OrdersPage /></PrivateRoute> },
      { path: "/about", element: <About /> },
      { path: "/login", element: <Login /> },
      { path: "/register", element: <Register /> },
      { path: "/cart", element: <PrivateRoute><CartPage /></PrivateRoute> },
      { path: "/checkout", element: <PrivateRoute><CheckoutPage /></PrivateRoute> },
      { path: "/book/:id", element: <SingleBook /> },
      { path: "/services", element: <TermsOfService /> },
      { path: "/contact", element: <Contact /> },
      { path: "/privacypolicy", element: <PolicyPrivacy /> },
        {
  path: "/wishlist",
  element: (
    
      <WishlistPage />
  
  ),
},

    ],
  },

  // ✅ Admin Routes OUTSIDE of App Layout
  {
    path: "/admin/login",
    element: <AdminLogin />,
  },
  {
    path: "/admin/dashboard",
    element: (
      <AdminPrivateRoute>
        <AdminDashboard/>
      </AdminPrivateRoute>
    ),
  },
]);

export default router;
