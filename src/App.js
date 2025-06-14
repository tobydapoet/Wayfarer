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
import ScrollToTop from "./utils/SrollToTop";
import { getCurrentUser } from "./utils/currentUser";

const getRandomColor = () => {
  const hue = Math.floor(Math.random() * 360);
  const randomColor = `hsl(${hue}, 90%, 30%)`;
  document.documentElement.style.setProperty("--random-color", randomColor);
};

getRandomColor();

const user = getCurrentUser();

const RequireRole = ({ roles = [], children }) => {
  if (!user) return <Navigate to="/login" replace />;

  if (user.position === "super admin" || roles.includes(user.position)) {
    return children;
  }

  return <Navigate to="/unauthorized" replace />;
};

const renderRoutes = (routes) =>
  routes.map((route, index) => {
    const Page = route.component;
    const Layout =
      route.layout === ProfileLayout
        ? ProfileLayout
        : route.layout === null
        ? Fragment
        : MainLayout;

    const contexts = Array.isArray(route.context)
      ? route.context
      : route.context
      ? [route.context]
      : [];

    const PageWithContexts = contexts.reduceRight((children, Context) => {
      return <Context>{children}</Context>;
    }, <Page />);

    const Element = route.roles ? (
      <RequireRole roles={route.roles}>{PageWithContexts}</RequireRole>
    ) : (
      PageWithContexts
    );

    return (
      <Route
        key={index}
        path={route.path}
        element={Layout === Fragment ? Element : <Layout>{Element}</Layout>}
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
  const routesToRender =
    user?.position && user.status !== "quit" ? privateRoutes : publicRoutes;
  return (
    <>
      <ToastContainer position="top-center" autoClose={3000} />

      <Router>
        <ScrollToTop />
        <div className="App">
          <Routes>
            {renderRoutes(routesToRender)}{" "}
            <Route path="*" element={<Navigate to="/unauthorized" replace />} />
          </Routes>
        </div>
      </Router>
    </>
  );
}

export default App;
