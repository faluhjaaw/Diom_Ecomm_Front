import { createBrowserRouter } from "react-router-dom";
import { Accueil } from "../screens/Accueil/Accueil";
import { Login } from "../screens/Login";
import { Register } from "../screens/Register";
import { Products } from "../screens/Products/Products";
import { ProductDetail } from "../screens/ProductDetail/ProductDetail";
import { CartPage } from "../screens/CartPage";
import { Checkout } from "../screens/Checkout/Checkout";
import { Orders } from "../screens/Orders/Orders";
import { Profile } from "../screens/Profile/Profile";



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
]);

