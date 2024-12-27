import { BrowserRouter, Routes, Route } from "react-router-dom";
import Auth from "./pages/Auth";
import Home from "./pages/Home";
import PublicRoute from "./pages/PublicRoute";
import ProtectedRoute from "./pages/ProtectedRoute";

const App = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route
            exact
            path="/auth"
            element={
              <PublicRoute>
                <Auth />
              </PublicRoute>
            }
          />
          <Route
            exact
            path="/"
            element={
              <ProtectedRoute>
                <Home />
              </ProtectedRoute>
            }
          />
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;

/*
  1. The application will load.
  2. We will send an api request. 
   (http://localhost:5000/api/auth)
  3. We will get the response.
    (cookies)
  4. We will get the response in frontend.
  5. Conditional Routing
    ( response.ok ? <Home/> : <Auth/>)
*/
