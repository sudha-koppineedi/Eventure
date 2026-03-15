import { useEffect, useState } from "react";
import axios from "axios";

const UserSettingsPage = () => {
  const token = localStorage.getItem("token");

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [settings, setSettings] = useState(null);

  useEffect(() => {
    fetchSettings();
  }, []);

  const fetchSettings = async () => {
    try {
      const res = await axios.get(
        "http://localhost:8000/api/settings/user",
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      setSettings(res.data.data);
      setLoading(false);
    } catch (error) {
      console.error("Failed to load user settings");
      setLoading(false);
    }
  };

  const handleChange = (section, field, value) => {
    setSettings((prev) => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: value
      }
    }));
  };

  const handleSave = async () => {
    try {
      setSaving(true);

      await axios.put(
        "http://localhost:8000/api/settings/user",
        settings,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      setSaving(false);
      alert("Settings updated successfully.");
    } catch (error) {
      setSaving(false);
      alert("Failed to update settings.");
    }
  };

  if (loading) return <div className="p-8">Loading...</div>;
  if (!settings) return <div className="p-8">Unable to load settings.</div>;

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-4xl mx-auto space-y-8">
        
        <div>
          <h1 className="text-3xl font-bold text-purple-700">
            User Settings
          </h1>
          <p className="text-gray-600 mt-2">
            Customize your experience.
          </p>
        </div>

        {/* ================= NOTIFICATIONS ================= */}
        <Card title="Notification Preferences">
          <Toggle
            label="Email Notifications"
            value={settings.notifications.emailNotifications}
            onChange={(val) =>
              handleChange("notifications", "emailNotifications", val)
            }
          />
          <Toggle
            label="Event Reminders"
            value={settings.notifications.eventReminders}
            onChange={(val) =>
              handleChange("notifications", "eventReminders", val)
            }
          />
          <Toggle
            label="Announcement Alerts"
            value={settings.notifications.announcementAlerts}
            onChange={(val) =>
              handleChange("notifications", "announcementAlerts", val)
            }
          />
        </Card>

        {/* ================= APPEARANCE ================= */}
        <Card title="Appearance">
          <SelectInput
            label="Theme"
            value={settings.appearance.theme}
            options={["light"]}
            onChange={(val) =>
              handleChange("appearance", "theme", val)
            }
          />
          <SelectInput
            label="Language"
            value={settings.appearance.language}
            options={["en"]}
            onChange={(val) =>
              handleChange("appearance", "language", val)
            }
          />
        </Card>

        {/* ================= PRIVACY ================= */}
        <Card title="Privacy">
          <SelectInput
            label="Profile Visibility"
            value={settings.privacy.profileVisibility}
            options={["public", "private"]}
            onChange={(val) =>
              handleChange("privacy", "profileVisibility", val)
            }
          />
          <Toggle
            label="Show Event Participation History"
            value={settings.privacy.showParticipationHistory}
            onChange={(val) =>
              handleChange("privacy", "showParticipationHistory", val)
            }
          />
        </Card>

        {/* ================= SAVE BUTTON ================= */}
        <div className="text-right">
          <button
            onClick={handleSave}
            disabled={saving}
            className="bg-purple-600 hover:bg-purple-700 transition px-6 py-3 text-white font-semibold rounded-lg shadow-md"
          >
            {saving ? "Saving..." : "Save Settings"}
          </button>
        </div>

      </div>
    </div>
  );
};

/* ================= REUSABLE COMPONENTS ================= */

const Card = ({ title, children }) => (
  <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition space-y-4">
    <h2 className="text-xl font-semibold text-gray-800">{title}</h2>
    {children}
  </div>
);

const Toggle = ({ label, value, onChange }) => (
  <div className="flex justify-between items-center">
    <span className="text-gray-700">{label}</span>
    <input
      type="checkbox"
      checked={value}
      onChange={(e) => onChange(e.target.checked)}
      className="w-5 h-5 accent-purple-600"
    />
  </div>
);

const SelectInput = ({ label, value, options, onChange }) => (
  <div className="flex flex-col">
    <label className="mb-1 text-gray-700">{label}</label>
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="border rounded-md p-2 focus:ring-2 focus:ring-purple-500"
    >
      {options.map((opt) => (
        <option key={opt} value={opt}>
          {opt}
        </option>
      ))}
    </select>
  </div>
);

export default UserSettingsPage;