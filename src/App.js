import {
  Navigate,
  Route,
  BrowserRouter as Router,
  Routes,
} from "react-router-dom";
import { publicRoutes } from "./routes";
import MainLayout from "./layouts/MainLayout";
import { Fragment } from "react";
import ProfileLayout from "./layouts/ProfileLayout";

const getRandomColor = () => {
  const hue = Math.floor(Math.random() * 360); // Ngẫu nhiên một màu sắc
  const randomColor =  `hsl(${hue}, 90%, 30%)`; 
  document.documentElement.style.setProperty('--random-color',randomColor)
};

// const setRandomColor = () => {
//   const r = Math.floor(Math.random() * 156) ;
//   const g = Math.floor(Math.random() * 156) ;
//   const b = Math.floor(Math.random() * 156 ) ;

//   const randomColor = `rgb(${r}, ${g}, ${b})`;
//   document.documentElement.style.setProperty('--pastel-color',randomColor)
// };


getRandomColor()


function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          {publicRoutes.map((route, index) => {
            const Page = route.component;
            let Layout = MainLayout;
            if (route.layout === null) {
              Layout = ProfileLayout;
            }
            return (
              <Route
                key={index}
                path={route.path}
                element={
                  <Layout>
                    <Page />
                  </Layout>
                }
              >
                {route.children &&
                  route.children.map((child, i) => (
                    <Route
                      key={i}
                      path={child.path}
                      element={<child.component />}
                    />
                  ))}
                {route.children && route.children.length > 0 && (
                  <Route
                    index
                    element={<Navigate to={route.children[0].path} replace />}
                  />
                )}
              </Route>
            );
          })}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
