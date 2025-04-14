import {
  Navigate,
  Route,
  BrowserRouter as Router,
  Routes,
} from "react-router-dom";
import { privateRoutes, publicRoutes } from "./routes";
import MainLayout from "./layouts/MainLayout";
import ProfileLayout from "./layouts/ProfileLayout";
import React, { Fragment } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const getRandomColor = () => {
  const hue = Math.floor(Math.random() * 360); // Ngẫu nhiên một màu sắc
  const randomColor = `hsl(${hue}, 90%, 30%)`;
  document.documentElement.style.setProperty("--random-color", randomColor);
};

getRandomColor();

const user = JSON.parse(localStorage.getItem("user"));

const renderRoutes = (routes) =>
  routes.map((route, index) => {
    const Page = route.component;
    const Layout =
      route.layout === ProfileLayout
        ? ProfileLayout
        : route.layout === null
        ? Fragment
        : MainLayout;

    return (
      <Route
        key={index}
        path={route.path}
        element={
          Layout === Fragment ? (
            <Page />
          ) : (
            <Layout>
              <Page />
            </Layout>
          )
        }
      >
        {route.children && renderRoutes(route.children)}

        {route.children && (
          <Route
            index
            element={
              <Navigate
                to={
                  route.children.find((child) => child.default)?.path ||
                  route.children[0].path
                }
                replace
              />
            }
          />
        )}
      </Route>
    );
  });

function App() {
  const routesToRender = user?.position ? privateRoutes : publicRoutes;
  return (
    <>
      <ToastContainer position="top-center" autoClose={3000} />
      <Router>
        <div className="App">
          <Routes>{renderRoutes(routesToRender)}</Routes>
        </div>
      </Router>
    </>
  );
}

export default App;
