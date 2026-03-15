import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context";
import { adminService, eventService } from "../services";
import { UserManagement } from "../components/admin";

const ManagementCard = ({ title, description, buttonText, buttonColor, onClick }) => (
  <div
    className="
    bg-white/90 backdrop-blur-sm rounded-xl p-6 
    border border-gray-200 shadow-md
    transform transition-all duration-300
    hover:-translate-y-4 hover:shadow-2xl
    hover:bg-white
    "
  >
    <h3 className="text-lg font-semibold text-gray-800 mb-2">
      {title}
    </h3>

    <p className="text-gray-600 mb-4 text-sm">
      {description}
    </p>

    <button
      onClick={onClick}
      className={`px-4 py-2 rounded-md text-white text-sm font-medium ${buttonColor}
                  hover:scale-105 transition`}
    >
      {buttonText}
    </button>
  </div>
);

const AdminDashboardPage = () => {

  const { user } = useAuth();
  const navigate = useNavigate();
  const [showUsers, setShowUsers] = useState(false);

  const [stats, setStats] = useState({
    totalUsers: 0,
    totalEvents: 0,
    activeEvents: 0,
    upcomingEvents: 0,
    registrations: 0,
    systemHealth: "99.8%"
  });

  const [loading, setLoading] = useState(true);

  /*
  ===========================
  PROTECT ADMIN ROUTE
  ===========================
  */

  useEffect(() => {
    if (user && user.role !== "admin") {
      navigate("/home");
    }
  }, [user, navigate]);

  /*
  ===========================
  FETCH ANALYTICS
  ===========================
  */

  useEffect(() => {

    const fetchStats = async () => {

      try {

        const userStatsRes = await adminService.getAdminStats();
        const eventStatsRes = await eventService.getEventStats();

        const userStats = userStatsRes?.data || userStatsRes || {};
        const eventStats = eventStatsRes?.data || eventStatsRes || {};

        setStats({
          ...userStats,
          ...eventStats,
        });

      } catch (err) {

        console.error("Dashboard analytics error:", err);

      } finally {

        setLoading(false);

      }

    };

    if (user?.role === "admin") {
      fetchStats();
    }

  }, [user]);

  /*
  ===========================
  UI
  ===========================
  */

  return (
    <div className="min-h-screen bg-gray-100">

      {/* HEADER */}

      <div className="bg-gradient-to-r from-purple-600 to-indigo-700 p-6 shadow-lg">
        <h1 className="text-3xl font-bold text-white">
          Admin Dashboard
        </h1>

        <p className="text-purple-100 mt-1">
          Welcome back, {user?.firstName || "Admin"} 👋
        </p>
      </div>

      {/* MAIN */}

      <div className="max-w-7xl mx-auto p-8">

        {loading ? (

          <div className="text-lg">Loading analytics...</div>

        ) : (

          <>
            {/* PLATFORM MANAGEMENT */}

            <h2 className="text-xl font-semibold text-gray-800 mb-6">
              Platform Management ⚙️
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-14">

              <ManagementCard
                title="User Management 👥"
                description="Manage users, roles and permissions across the platform."
                buttonText="Manage Users"
                buttonColor="bg-blue-600"
                onClick={() => setShowUsers(!showUsers)}
              />

              <ManagementCard
                title="Event Management 📅"
                description="Review and monitor platform events."
                buttonText="Manage Events"
                buttonColor="bg-green-600"
                onClick={() => navigate("/events")}
              />

              <ManagementCard
                title="System Settings ⚙️"
                description="Configure system integrations and platform settings."
                buttonText="System Settings"
                buttonColor="bg-gray-700"
                onClick={() => navigate("/system-settings")}
              />

            </div>

            {showUsers && (
              <div className="mb-12">
                <UserManagement />
              </div>
            )}

            {/* ANALYTICS */}

            <h2 className="text-xl font-semibold text-gray-800 mb-6">
              Platform Analytics 📊
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-8">

              <div className="p-6 rounded-xl text-white bg-gradient-to-r from-blue-600 to-indigo-700 shadow-lg hover:-translate-y-4 transition">
                <p className="text-sm opacity-80">Total Users</p>
                <h2 className="text-3xl font-bold mt-2">{stats?.totalUsers || 0}</h2>
              </div>

              <div className="p-6 rounded-xl text-white bg-gradient-to-r from-purple-600 to-pink-600 shadow-lg hover:-translate-y-4 transition">
                <p className="text-sm opacity-80">Total Events</p>
                <h2 className="text-3xl font-bold mt-2">{stats?.totalEvents || 0}</h2>
              </div>

              <div className="p-6 rounded-xl text-white bg-gradient-to-r from-green-500 to-emerald-600 shadow-lg hover:-translate-y-4 transition">
                <p className="text-sm opacity-80">Active Events</p>
                <h2 className="text-3xl font-bold mt-2">{stats?.activeEvents || 0}</h2>
              </div>

              <div className="p-6 rounded-xl text-white bg-gradient-to-r from-yellow-500 to-orange-500 shadow-lg hover:-translate-y-4 transition">
                <p className="text-sm opacity-80">Upcoming Events</p>
                <h2 className="text-3xl font-bold mt-2">{stats?.upcomingEvents || 0}</h2>
              </div>

              <div className="p-6 rounded-xl text-white bg-gradient-to-r from-cyan-500 to-blue-500 shadow-lg hover:-translate-y-4 transition">
                <p className="text-sm opacity-80">Registrations</p>
                <h2 className="text-3xl font-bold mt-2">{stats?.registrations || 0}</h2>
              </div>

              <div className="p-6 rounded-xl text-white bg-gradient-to-r from-teal-500 to-green-600 shadow-lg hover:-translate-y-4 transition">
                <p className="text-sm opacity-80">System Health</p>
                <h2 className="text-3xl font-bold mt-2">{stats?.systemHealth || "99%"}</h2>
              </div>

            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default AdminDashboardPage;