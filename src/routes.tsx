import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from "react-router-dom";
import { Home } from "./pages/home";
import { Cart } from "./pages/cart";
import { ReactNode } from "react";
import { Header } from "./components/Header";
import { Footer } from "./components/Footer";
import { makeRequest } from "./utils/makeRequest";

const CreatePage = ({ children }: { children: ReactNode }) => {
  return (
    <>
      <Header />
      {children}
      <Footer />
    </>
  );
};

export const routes = createBrowserRouter(
  createRoutesFromElements(
    <Route>
      <Route
        path="/"
        loader={() => makeRequest("/products", "GET")}
        element={
          <CreatePage>
            <Home />
          </CreatePage>
        }
      />
      <Route
        path="/cart"
        loader={() => makeRequest("/cart", "GET")}
        element={
          <CreatePage>
            <Cart />
          </CreatePage>
        }
      />
    </Route>
  )
);
