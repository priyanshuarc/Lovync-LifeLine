// src/App.tsx
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { DataProvider } from "./context/DataContext";
import LandingPage from "./pages/LandingPage";
import Login from "./components/Login";
import Signup from "./components/Signup";
import VerificationPage from "./components/VerificationPage";
import ProfileCreationPage from "./components/ProfileCreationPage";
import Homepage from "./pages/Homepage";
import ProfilePage from "./pages/ProfilePage";
import TrendingPage from "./pages/TrendingPage";
import MessagesPage from "./pages/MessagesPage";
import EditProfilePage from "./pages/EditProfilePage";
import SearchPage from "./pages/SearchPage";
import ExplorePage from "./pages/ExplorePage";
import Layout from "./components/Layout";

function App() {
  return (
    <DataProvider>
      <Router>
        <Routes>
          {/* Public pages without navigation */}
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/verification" element={<VerificationPage />} />
          <Route path="/profile-creation" element={<ProfileCreationPage />} />
          
          {/* Main app pages with navigation */}
          <Route path="/homepage" element={
            <Layout>
              <Homepage />
            </Layout>
          } />
          <Route path="/trending" element={
            <Layout>
              <TrendingPage />
            </Layout>
          } />
          <Route path="/messages" element={
            <Layout>
              <MessagesPage />
            </Layout>
          } />
          <Route path="/profile/:username" element={
            <Layout>
              <ProfilePage />
            </Layout>
          } />
          <Route path="/edit-profile" element={
            <Layout>
              <EditProfilePage />
            </Layout>
          } />
          <Route path="/search" element={
            <Layout>
              <SearchPage />
            </Layout>
          } />
          <Route path="/explore" element={
            <Layout>
              <ExplorePage />
            </Layout>
          } />
        </Routes>
      </Router>
    </DataProvider>
  );
}

export default App;