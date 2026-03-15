import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { Layout } from "./components/layout";

import {
  LoginPage,
  RegisterPage,
  ForgotPasswordPage,
  ResetPasswordPage,
  HomePage,
  AdminDashboardPage,
  OrganizerDashboardPage,
  EventsPage,
  EventDetailPage,
  CreateEventPage,
  EditEventPage,
  ProfilePage,
  AnnouncementsPage,
  CreateAnnouncementPage,
  EditAnnouncementPage,
  LeaderboardPage,
  SettingsPage,
  SystemSettingsPage
} from "./pages";

import { ProtectedRoute } from "./components/auth";

function App() {
  return (
    <Router>
      <Routes>

        {/* PUBLIC ROUTES */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/forgot-password" element={<ForgotPasswordPage />} />
        <Route path="/reset-password/:token" element={<ResetPasswordPage />} />

        {/* Redirect root */}
        <Route path="/" element={<Navigate to="/login" replace />} />

        {/* PROTECTED ROUTES */}
        <Route element={<ProtectedRoute />}>

          {/* Home */}
          <Route path="/home" element={<Layout />}>
            <Route index element={<HomePage />} />
            <Route path="dashboard" element={<h1 className="text-4xl font-bold mb-6">Dashboard</h1>} />
          </Route>

          {/* Admin Dashboard */}
          <Route path="/admindashboard" element={<Layout />}>
            <Route index element={<AdminDashboardPage />} />
          </Route>

          {/* Organizer Dashboard */}
          <Route path="/organizerdashboard" element={<Layout />}>
            <Route index element={<OrganizerDashboardPage />} />
          </Route>

          {/* Events */}
          <Route path="/events" element={<Layout />}>
            <Route index element={<EventsPage />} />
            <Route path=":eventId" element={<EventDetailPage />} />
            <Route path="create" element={<CreateEventPage />} />
            <Route path=":eventId/edit" element={<EditEventPage />} />
          </Route>

          {/* Profile */}
          <Route path="/profile" element={<Layout />}>
            <Route index element={<ProfilePage />} />
          </Route>

          {/* Announcements */}
          <Route path="/announcements" element={<Layout />}>
            <Route index element={<AnnouncementsPage />} />
            <Route path="create" element={<CreateAnnouncementPage />} />
            <Route path="edit/:id" element={<EditAnnouncementPage />} />
          </Route>

          {/* Leaderboard */}
          <Route path="/leaderboard" element={<Layout />}>
            <Route index element={<LeaderboardPage />} />
            <Route path=":eventId" element={<LeaderboardPage />} />
          </Route>

          {/* Settings */}
          <Route path="/settings" element={<Layout />}>
            <Route index element={<SettingsPage />} />
          </Route>

          {/* System Settings */}
          <Route path="/system-settings" element={<Layout />}>
            <Route index element={<SystemSettingsPage />} />
          </Route>

        </Route>

      </Routes>
    </Router>
  );
}

export default App;