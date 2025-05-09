import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import PetsPage from "./pages/PetsPage.tsx";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import ClientPage from "./pages/ClientPage.tsx";

const router = createBrowserRouter([
  {
    path: "/clients",
    element: <ClientPage />,
  },
  {
    path: "/pets",
    element: <PetsPage />,
  },
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
