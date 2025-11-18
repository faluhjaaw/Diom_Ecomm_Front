import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";

import { router } from "./router";  // <--- ce fichier-là

ReactDOM.createRoot(document.getElementById("app")!)
  .render(<RouterProvider router={router} />);
