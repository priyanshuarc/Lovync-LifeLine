// src/App.tsx
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import Login from "./components/Login";
import Signup from "./components/Signup";
import VerificationPage from "./components/VerificationPage";
import ProfileCreationPage from "./components/ProfileCreationPage";
import Homepage from "./components/Homepage"; // New import

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/verification" element={<VerificationPage />} />
        <Route path="/profile-creation" element={<ProfileCreationPage />} />
        <Route path="/homepage" element={<Homepage />} /> {/* New route */}
      </Routes>
    </Router>
  );
}

export default App;