import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Accueil } from "./screens/Accueil/Accueil";

createRoot(document.getElementById("app") as HTMLElement).render(
  <StrictMode>
    <Accueil />
  </StrictMode>,
);
