import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./pcomponent/navbar";
import Footer from "./pcomponent/footer";
import Home from "./pages/home";
import Recipes from "./pages/recipes";
import Settings from "./pages/settings";
import Login from "./pages/login";
import SignUp from "./pages/signup";
import Profile from "./pages/Profile";
import "./App.css";
import Private from "./pages/Private";
import PrivateAnother from "./pages/PrivateAnother";
import ProfileUpdateForm from "./pages/ProfileUpdateForm";
import { useUser } from "./Context/Usercontext";
const App = () => {
  const { userData, setUserData } = useUser();
  return (
    <Router>
      <Navbar />
      <div className="container main">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/home" element={<Home />} />
          <Route path="" element={<Private />}>
            <Route path="/recipes" element={<Recipes />} />
          </Route>

          <Route path="" element={<PrivateAnother />}>
            <Route path="/profile" element={<Profile />} />
          </Route>

          <Route path="/settings" element={<Settings />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route
            path="/profile/update"
            element={<ProfileUpdateForm userData={userData} />}
          />
        </Routes>
      </div>
      <Footer />
    </Router>
  );
};

export default App;
