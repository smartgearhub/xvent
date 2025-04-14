import React from "react";
import HomePage from "./pages/HomePage";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import MessagesPage from "./pages/MessagesPage";
import NotificationsPage from "./pages/NotificationsPage";
import DiscoverEvents from "./pages/DiscoverEvents";
import ProfilePage from "./pages/ProfilePage";
import MyPostsPage from "./pages/MyPostsPage";
import SettingsPage from "./pages/SettingsPage";
import OtherUserProfilePage from './pages/OtherUserProfilePage';
import EditProfile from './pages/EditProfile';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/messages" element={<MessagesPage />} />
        <Route path="/profile" element={<ProfilePage />} /> {/* lowercase 'profile' */}
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/settings" element={<SettingsPage />} />
        <Route path="/myposts" element={<MyPostsPage />} />
        <Route path="/notifications" element={<NotificationsPage />} />
        <Route path="/discover-events" element={<DiscoverEvents />} />
        <Route path="/profile/:userId" element={<OtherUserProfilePage />} />
        <Route path="/editProfile/:userId" element={<EditProfile />} />
      </Routes>
    </Router>
  );
}

export default App;
