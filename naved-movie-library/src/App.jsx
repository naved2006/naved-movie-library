import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import ScrollToTop from "./components/ScrollToTop";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Profile from "./pages/Profile";
import PrivateRoute from "./components/PrivateRoute";
import MovieDetails from "./components/MovieDetails";
import MovieSearch from "./components/MovieSearch";

function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Navbar />

      <main className="site-main">
        <Routes>
          <Route path="/" element={<Home />} />

          <Route path="/movie/:id" element={<MovieDetails />} />

          <Route path="/search" element={<MovieSearch />} />

          <Route path="/login" element={<Login />} />

          <Route
            path="/profile"
            element={
              <PrivateRoute>
                <Profile />
              </PrivateRoute>
            }
          />

          <Route path="/movies" element={<Home />} />
        </Routes>
      </main>

      <Footer />
    </BrowserRouter>
  );
}

export default App;
