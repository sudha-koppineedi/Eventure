// import { useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { useAuth } from '../context';
// import { settingsService } from '../services';

// const SystemSettingsPage = () => {
//   const { user } = useAuth();
//   const navigate = useNavigate();
//   const [loading, setLoading] = useState(false);
//   const [success, setSuccess] = useState(false);
//   const [error, setError] = useState(null);
  
//   // System settings state
//   const [settings, setSettings] = useState({
//     maxUsersPerEvent: 100,
//     maxEventsPerOrganizer: 10,
//     enableRegistration: true,
//     maintenanceMode: false,
//     emailVerificationRequired: true,
//     defaultUserRole: 'participant',
//     sessionTimeout: 60, // minutes
//     fileUploadLimit: 5, // MB
//     allowedFileTypes: '.jpg,.png,.pdf,.doc,.docx',
//     systemEmailAddress: 'system@eventflow.com',
//     smtpServer: 'smtp.eventflow.com',
//     smtpPort: 587,
//     smtpUsername: '',
//     smtpPassword: '',
//     analyticsEnabled: true,
//     loggingLevel: 'info'
//   });

//   // Redirect if user is not an admin
//   useEffect(() => {
//     if (user && user.role !== 'admin') {
//       navigate('/home');
//     }
//   }, [user, navigate]);
  
//   // Load system settings on component mount
//   useEffect(() => {
//     const fetchSystemSettings = async () => {
//       if (!user || user.role !== 'admin') return;
      
//       try {
//         setLoading(true);
//         const response = await settingsService.getSystemSettings();
        
//         if (response.success && response.data) {
//           // Update all settings from response
//           setSettings(prevSettings => ({
//             ...prevSettings,
//             ...response.data
//           }));
//         }
//       } catch (err) {
//         console.error('Failed to fetch system settings:', err);
//         setError('Failed to load system settings. Please try again.');
//       } finally {
//         setLoading(false);
//       }
//     };
    
//     fetchSystemSettings();
//   }, [user]);

//   const handleInputChange = (e) => {
//     const { name, value, type, checked } = e.target;
//     setSettings(prev => ({
//       ...prev,
//       [name]: type === 'checkbox' ? checked : value
//     }));
//   };

//   const handleSaveSettings = async (e) => {
//     e.preventDefault();
//     setLoading(true);
//     setSuccess(false);
//     setError(null);

//     try {
//       // In a real app, you would save these settings to the backend
//       await settingsService.updateSystemSettings(settings);
      
//       setSuccess(true);
//       setTimeout(() => setSuccess(false), 3000);
//     } catch (err) {
//       console.error('Failed to save system settings:', err);
//       setError('Failed to save system settings. Please try again.');
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="pb-12">
//       <div className="bg-white rounded-xl shadow-md overflow-hidden mb-8">
//         <div className="bg-gradient-to-r from-purple-600 to-indigo-800 px-6 py-4">
//           <h1 className="text-3xl font-bold text-white">System Settings</h1>
//         </div>
//         <div className="p-6">
//           <p className="text-lg text-gray-700 mb-6">Configure platform-wide settings and preferences.</p>
          
//           {success && (
//             <div className="bg-green-50 border-l-4 border-green-400 p-4 mb-6">
//               <div className="flex">
//                 <div className="flex-shrink-0">
//                   <svg className="h-5 w-5 text-green-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
//                     <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
//                   </svg>
//                 </div>
//                 <div className="ml-3">
//                   <p className="text-sm text-green-700">System settings saved successfully!</p>
//                 </div>
//               </div>
//             </div>
//           )}
          
//           {error && (
//             <div className="bg-red-50 border-l-4 border-red-400 p-4 mb-6">
//               <div className="flex">
//                 <div className="flex-shrink-0">
//                   <svg className="h-5 w-5 text-red-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
//                     <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
//                   </svg>
//                 </div>
//                 <div className="ml-3">
//                   <p className="text-sm text-red-700">{error}</p>
//                 </div>
//               </div>
//             </div>
//           )}
          
//           <form onSubmit={handleSaveSettings} className="space-y-8">
//             {/* General Settings */}
//             <div>
//               <h2 className="text-xl font-semibold text-gray-800 mb-4">General Settings</h2>
//               <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                 <div>
//                   <label htmlFor="maxUsersPerEvent" className="block text-sm font-medium text-gray-700 mb-1">
//                     Maximum Users Per Event
//                   </label>
//                   <input
//                     type="number"
//                     name="maxUsersPerEvent"
//                     id="maxUsersPerEvent"
//                     className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
//                     value={settings.maxUsersPerEvent}
//                     onChange={handleInputChange}
//                   />
//                 </div>
                
//                 <div>
//                   <label htmlFor="maxEventsPerOrganizer" className="block text-sm font-medium text-gray-700 mb-1">
//                     Maximum Events Per Organizer
//                   </label>
//                   <input
//                     type="number"
//                     name="maxEventsPerOrganizer"
//                     id="maxEventsPerOrganizer"
//                     className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
//                     value={settings.maxEventsPerOrganizer}
//                     onChange={handleInputChange}
//                   />
//                 </div>
                
//                 <div>
//                   <label htmlFor="sessionTimeout" className="block text-sm font-medium text-gray-700 mb-1">
//                     Session Timeout (minutes)
//                   </label>
//                   <input
//                     type="number"
//                     name="sessionTimeout"
//                     id="sessionTimeout"
//                     className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
//                     value={settings.sessionTimeout}
//                     onChange={handleInputChange}
//                   />
//                 </div>
                
//                 <div>
//                   <label htmlFor="fileUploadLimit" className="block text-sm font-medium text-gray-700 mb-1">
//                     File Upload Limit (MB)
//                   </label>
//                   <input
//                     type="number"
//                     name="fileUploadLimit"
//                     id="fileUploadLimit"
//                     className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
//                     value={settings.fileUploadLimit}
//                     onChange={handleInputChange}
//                   />
//                 </div>
                
//                 <div className="md:col-span-2">
//                   <label htmlFor="allowedFileTypes" className="block text-sm font-medium text-gray-700 mb-1">
//                     Allowed File Types (comma separated)
//                   </label>
//                   <input
//                     type="text"
//                     name="allowedFileTypes"
//                     id="allowedFileTypes"
//                     className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
//                     value={settings.allowedFileTypes}
//                     onChange={handleInputChange}
//                   />
//                 </div>
//               </div>
              
//               <div className="mt-4 space-y-4">
//                 <div className="flex items-start">
//                   <div className="flex items-center h-5">
//                     <input
//                       id="enableRegistration"
//                       name="enableRegistration"
//                       type="checkbox"
//                       className="focus:ring-blue-500 h-4 w-4 text-blue-600 border-gray-300 rounded"
//                       checked={settings.enableRegistration}
//                       onChange={handleInputChange}
//                     />
//                   </div>
//                   <div className="ml-3 text-sm">
//                     <label htmlFor="enableRegistration" className="font-medium text-gray-700">Enable User Registration</label>
//                     <p className="text-gray-500">Allow new users to register on the platform</p>
//                   </div>
//                 </div>
                
//                 <div className="flex items-start">
//                   <div className="flex items-center h-5">
//                     <input
//                       id="maintenanceMode"
//                       name="maintenanceMode"
//                       type="checkbox"
//                       className="focus:ring-blue-500 h-4 w-4 text-blue-600 border-gray-300 rounded"
//                       checked={settings.maintenanceMode}
//                       onChange={handleInputChange}
//                     />
//                   </div>
//                   <div className="ml-3 text-sm">
//                     <label htmlFor="maintenanceMode" className="font-medium text-gray-700">Maintenance Mode</label>
//                     <p className="text-gray-500">Put the site in maintenance mode (only admins can access)</p>
//                   </div>
//                 </div>
                
//                 <div className="flex items-start">
//                   <div className="flex items-center h-5">
//                     <input
//                       id="emailVerificationRequired"
//                       name="emailVerificationRequired"
//                       type="checkbox"
//                       className="focus:ring-blue-500 h-4 w-4 text-blue-600 border-gray-300 rounded"
//                       checked={settings.emailVerificationRequired}
//                       onChange={handleInputChange}
//                     />
//                   </div>
//                   <div className="ml-3 text-sm">
//                     <label htmlFor="emailVerificationRequired" className="font-medium text-gray-700">Require Email Verification</label>
//                     <p className="text-gray-500">Users must verify their email before accessing the platform</p>
//                   </div>
//                 </div>
                
//                 <div className="flex items-start">
//                   <div className="flex items-center h-5">
//                     <input
//                       id="analyticsEnabled"
//                       name="analyticsEnabled"
//                       type="checkbox"
//                       className="focus:ring-blue-500 h-4 w-4 text-blue-600 border-gray-300 rounded"
//                       checked={settings.analyticsEnabled}
//                       onChange={handleInputChange}
//                     />
//                   </div>
//                   <div className="ml-3 text-sm">
//                     <label htmlFor="analyticsEnabled" className="font-medium text-gray-700">Enable Analytics</label>
//                     <p className="text-gray-500">Collect usage data to improve the platform</p>
//                   </div>
//                 </div>
//               </div>
//             </div>
            
//             {/* User Settings */}
//             <div>
//               <h2 className="text-xl font-semibold text-gray-800 mb-4">User Settings</h2>
//               <div>
//                 <label htmlFor="defaultUserRole" className="block text-sm font-medium text-gray-700 mb-1">
//                   Default User Role
//                 </label>
//                 <select
//                   id="defaultUserRole"
//                   name="defaultUserRole"
//                   className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
//                   value={settings.defaultUserRole}
//                   onChange={handleInputChange}
//                 >
//                   <option value="participant">Participant</option>
//                   <option value="organizer">Organizer</option>
//                   <option value="admin">Admin</option>
//                 </select>
//               </div>
//             </div>
            
//             {/* Email Settings */}
//             <div>
//               <h2 className="text-xl font-semibold text-gray-800 mb-4">Email Configuration</h2>
//               <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                 <div>
//                   <label htmlFor="systemEmailAddress" className="block text-sm font-medium text-gray-700 mb-1">
//                     System Email Address
//                   </label>
//                   <input
//                     type="email"
//                     name="systemEmailAddress"
//                     id="systemEmailAddress"
//                     className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
//                     value={settings.systemEmailAddress}
//                     onChange={handleInputChange}
//                   />
//                 </div>
                
//                 <div>
//                   <label htmlFor="smtpServer" className="block text-sm font-medium text-gray-700 mb-1">
//                     SMTP Server
//                   </label>
//                   <input
//                     type="text"
//                     name="smtpServer"
//                     id="smtpServer"
//                     className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
//                     value={settings.smtpServer}
//                     onChange={handleInputChange}
//                   />
//                 </div>
                
//                 <div>
//                   <label htmlFor="smtpPort" className="block text-sm font-medium text-gray-700 mb-1">
//                     SMTP Port
//                   </label>
//                   <input
//                     type="number"
//                     name="smtpPort"
//                     id="smtpPort"
//                     className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
//                     value={settings.smtpPort}
//                     onChange={handleInputChange}
//                   />
//                 </div>
                
//                 <div>
//                   <label htmlFor="smtpUsername" className="block text-sm font-medium text-gray-700 mb-1">
//                     SMTP Username
//                   </label>
//                   <input
//                     type="text"
//                     name="smtpUsername"
//                     id="smtpUsername"
//                     className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
//                     value={settings.smtpUsername}
//                     onChange={handleInputChange}
//                   />
//                 </div>
                
//                 <div>
//                   <label htmlFor="smtpPassword" className="block text-sm font-medium text-gray-700 mb-1">
//                     SMTP Password
//                   </label>
//                   <input
//                     type="password"
//                     name="smtpPassword"
//                     id="smtpPassword"
//                     className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
//                     value={settings.smtpPassword}
//                     onChange={handleInputChange}
//                   />
//                 </div>
//               </div>
//             </div>
            
//             {/* Logging Settings */}
//             <div>
//               <h2 className="text-xl font-semibold text-gray-800 mb-4">Logging</h2>
//               <div>
//                 <label htmlFor="loggingLevel" className="block text-sm font-medium text-gray-700 mb-1">
//                   Logging Level
//                 </label>
//                 <select
//                   id="loggingLevel"
//                   name="loggingLevel"
//                   className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
//                   value={settings.loggingLevel}
//                   onChange={handleInputChange}
//                 >
//                   <option value="error">Error</option>
//                   <option value="warn">Warning</option>
//                   <option value="info">Info</option>
//                   <option value="debug">Debug</option>
//                 </select>
//               </div>
//             </div>
            
//             <div className="flex justify-end">
//               <button
//                 type="submit"
//                 className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
//                 disabled={loading}
//               >
//                 {loading ? (
//                   <>
//                     <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
//                       <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
//                       <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
//                     </svg>
//                     Saving...
//                   </>
//                 ) : 'Save System Settings'}
//               </button>
//             </div>
//           </form>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default SystemSettingsPage;

import { useEffect, useState } from "react";
import settingsService from "../services/settingsService";

const SystemSettingsPage = () => {
  const token = localStorage.getItem("token");

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const [settings, setSettings] = useState(null);

  useEffect(() => {
    fetchSettings();
  }, []);

  const fetchSettings = async () => {
    try {
      const res = await settingsService.getSystemSettings(token);
      const data = res.data;

      setSettings({
        ...data,
        uploads: {
          ...data.uploads,
          allowedFileTypes: data.uploads.allowedFileTypes.join(","),
        },
      });

      setLoading(false);
    } catch (err) {
      setError("Failed to load system settings.");
      setLoading(false);
    }
  };

  const handleChange = (section, field, value) => {
    setSettings((prev) => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: value,
      },
    }));
  };

  const handleSave = async () => {
    try {
      setSaving(true);
      await settingsService.updateSystemSettings(settings, token);
      setSaving(false);
      alert("Settings updated successfully.");
    } catch (err) {
      setSaving(false);
      alert("Failed to save settings.");
    }
  };

  if (loading) return <div className="p-8">Loading...</div>;
  if (!settings) return null;

  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      <div className="max-w-5xl mx-auto space-y-8">
        <div>
          <h1 className="text-3xl font-bold text-purple-700">
            System Settings
          </h1>
          <p className="text-gray-600 mt-2">
            Configure platform-wide rules and limits.
          </p>
        </div>

        {error && (
          <div className="bg-red-100 text-red-600 p-4 rounded-md shadow">
            {error}
          </div>
        )}

        <Card title="Platform Access">
          <Toggle
            label="Enable User Registration"
            value={settings.access.registrationEnabled}
            onChange={(val) =>
              handleChange("access", "registrationEnabled", val)
            }
          />
          <Toggle
            label="Maintenance Mode"
            value={settings.access.maintenanceMode}
            onChange={(val) =>
              handleChange("access", "maintenanceMode", val)
            }
          />
          <Toggle
            label="Require Email Verification"
            value={settings.access.requireEmailVerification}
            onChange={(val) =>
              handleChange("access", "requireEmailVerification", val)
            }
          />
          <NumberInput
            label="Session Timeout (minutes)"
            value={settings.access.sessionTimeoutMinutes}
            onChange={(val) =>
              handleChange("access", "sessionTimeoutMinutes", val)
            }
          />
        </Card>

        <Card title="Event Governance">
          <NumberInput
            label="Default Event Capacity"
            value={settings.events.defaultEventCapacity}
            onChange={(val) =>
              handleChange("events", "defaultEventCapacity", val)
            }
          />
          <NumberInput
            label="Max Users Per Event"
            value={settings.events.maxUsersPerEvent}
            onChange={(val) =>
              handleChange("events", "maxUsersPerEvent", val)
            }
          />
          <NumberInput
            label="Max Events Per Organizer"
            value={settings.events.maxEventsPerOrganizer}
            onChange={(val) =>
              handleChange("events", "maxEventsPerOrganizer", val)
            }
          />
          <Toggle
            label="Event Approval Required"
            value={settings.events.eventApprovalRequired}
            onChange={(val) =>
              handleChange("events", "eventApprovalRequired", val)
            }
          />
        </Card>

        <Card title="Upload Rules">
          <NumberInput
            label="File Upload Limit (MB)"
            value={settings.uploads.maxFileUploadSizeMB}
            onChange={(val) =>
              handleChange("uploads", "maxFileUploadSizeMB", val)
            }
          />
          <TextInput
            label="Allowed File Types (comma separated)"
            value={settings.uploads.allowedFileTypes}
            onChange={(val) =>
              handleChange("uploads", "allowedFileTypes", val)
            }
          />
        </Card>

        <Card title="Feature Controls">
          <Toggle
            label="Enable Leaderboard"
            value={settings.features.leaderboard}
            onChange={(val) =>
              handleChange("features", "leaderboard", val)
            }
          />
          <Toggle
            label="Enable Announcements"
            value={settings.features.announcements}
            onChange={(val) =>
              handleChange("features", "announcements", val)
            }
          />
          <Toggle
            label="Enable Notifications"
            value={settings.features.notifications}
            onChange={(val) =>
              handleChange("features", "notifications", val)
            }
          />
        </Card>

        <div className="text-right">
          <button
            onClick={handleSave}
            disabled={saving}
            className="bg-purple-600 hover:bg-purple-700 transition px-6 py-3 text-white font-semibold rounded-lg shadow-md"
          >
            {saving ? "Saving..." : "Save Changes"}
          </button>
        </div>
      </div>
    </div>
  );
};

const Card = ({ title, children }) => (
  <div className="bg-white p-6 rounded-xl shadow-md space-y-4 hover:shadow-lg transition">
    <h2 className="text-xl font-semibold text-gray-800">{title}</h2>
    {children}
  </div>
);

const Toggle = ({ label, value, onChange }) => (
  <div className="flex justify-between items-center">
    <span>{label}</span>
    <input
      type="checkbox"
      checked={value}
      onChange={(e) => onChange(e.target.checked)}
      className="w-5 h-5 accent-purple-600"
    />
  </div>
);

const NumberInput = ({ label, value, onChange }) => (
  <div className="flex flex-col">
    <label className="mb-1">{label}</label>
    <input
      type="number"
      value={value}
      onChange={(e) => onChange(Number(e.target.value))}
      className="border rounded-md p-2 focus:ring-2 focus:ring-purple-500"
    />
  </div>
);

const TextInput = ({ label, value, onChange }) => (
  <div className="flex flex-col">
    <label className="mb-1">{label}</label>
    <input
      type="text"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="border rounded-md p-2 focus:ring-2 focus:ring-purple-500"
    />
  </div>
);

export default SystemSettingsPage;