import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import { publicRoutes } from "./routes";
import MainLayout from "./layouts/MainLayout";
import { Fragment } from "react";

function App() {
  return ( 
    <Router>
      <div className="App">
        <Routes>
          {publicRoutes.map((route, index) => {
            const Page = route.component
            let Layout = MainLayout
            if(route.layout === null) {
              Layout = Fragment
            }
            return <Route 
                      key={index} 
                      path={route.path} 
                      element={
                        <Layout>
                          <Page />
                        </Layout>
                      } 
                  />;
          })}
        </Routes>
      </div>
    </Router> 
  );
}

export default App;