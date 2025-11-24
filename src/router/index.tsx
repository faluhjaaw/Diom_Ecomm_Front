import { createBrowserRouter } from "react-router-dom";
import { Accueil } from "../screens/Accueil/Accueil";
import { Login } from "../screens/Login";
import { Register } from "../screens/Register";
import { RegisterVendor } from "../screens/RegisterVendor";
import { Products } from "../screens/Products/Products";
import { ProductDetail } from "../screens/ProductDetail/ProductDetail";
import { CartPage } from "../screens/CartPage";
import { Checkout } from "../screens/Checkout/Checkout";
import { Orders } from "../screens/Orders/Orders";
import { Profile } from "../screens/Profile/Profile";
import { VendorProfile } from "../screens/VendorProfile";
import { VendorDashboard } from "../screens/VendorDashboard";
import { Reviews } from "../screens/Reviews/Reviews";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Accueil />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/register-vendeur",
    element: <RegisterVendor />,
  },
  {
    path: "/products",
    element: <Products />,
  },
  {
    path: "/products/:id",
    element: <ProductDetail />,
  },
  {
    path: "/cart",
    element: <CartPage />,
  },
  {
    path: "/checkout",
    element: <Checkout />,
  },
  {
    path: "/orders",
    element: <Orders />,
  },
  {
    path: "/profile",
    element: <Profile />,
  },
  {
    path: "/vendor-profile",
    element: <VendorProfile />,
  },
  {
    path: "/vendor-dashboard",
    element: <VendorDashboard />,
  },
  {
    path: "/reviews",
    element: <Reviews />,
  },
]);

