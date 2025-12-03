import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useEffect } from "react";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./components/Home";
import VillasPage from "./pages/Villas";
import VillaDetail from "./components/VillaDetail";
import SignUp from "./components/SignUp";
import SignIn from "./components/SignIn";
import Payment from "./components/Payment";
import ProfileGuard from "./components/ProfileGuard";
import NotFound from "./pages/NotFound";
import { getAllUsers, saveUsers } from "./utils/auth";
import "./styles/main.css";

export default function App() {
  useEffect(() => {
    // Initialize demo user if no users exist
    const users = getAllUsers();
    if (!users || users.length === 0) {
      saveUsers([
        {
          id: "1",
          firstName: "Demo",
          lastName: "User",
          email: "demo@gmail.com",
          phone: "1234567890",
          password: "demo123",
        },
      ]);
    }
  }, []);

  return (
    <BrowserRouter>
      <div className="app-container">
        <Navbar />
        <div className="content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/villas" element={<VillasPage />} />
            <Route path="/villas/:id" element={<VillaDetail />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/signin" element={<SignIn />} />
            <Route
              path="/payment"
              element={
                <ProfileGuard>
                  <Payment />
                </ProfileGuard>
              }
            />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
        <Footer />
      </div>
    </BrowserRouter>
  );
}
