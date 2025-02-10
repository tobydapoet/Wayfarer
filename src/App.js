import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import { publicRoutes } from "./routes";

function App() {
  return ( 
    <Router>
      <div className="App">
        <Routes>
          {publicRoutes.map((route, index) => {
            return <Route 
                      key={index} 
                      path={route.path} 
                      element={<route.component />} 
                  />;
          })}
        </Routes>
      </div>
    </Router> 
  );
}

export default App;