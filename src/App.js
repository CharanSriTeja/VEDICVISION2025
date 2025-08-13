import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { ThemeProvider } from './contexts/ThemeContext';
import { AuthProvider } from './contexts/AuthContext';
import LandingPage from './components/LandingPage';
import AuthPage from './components/AuthPage';
import Dashboard from './components/Dashboard';
import HospitalSearch from './components/HospitalSearch';
import Appointments from './components/Appointments';
import HealthRecords from './components/HealthRecords';
import Prescriptions from './components/Prescriptions';
import LabReports from './components/LabReports';
import Profile from './components/Profile';
import './App.css';

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <Router>
          <div className="App">
            <Routes>
              <Route path="/" element={<LandingPage />} />
              <Route path="/auth" element={<AuthPage />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/hospitals" element={<HospitalSearch />} />
              <Route path="/appointments" element={<Appointments />} />
              <Route path="/health-records" element={<HealthRecords />} />
              <Route path="/prescriptions" element={<Prescriptions />} />
              <Route path="/lab-reports" element={<LabReports />} />
              <Route path="/profile" element={<Profile />} />
            </Routes>
            <Toaster 
              position="top-right"
              toastOptions={{
                duration: 4000,
                style: {
                  background: 'var(--toast-bg)',
                  color: 'var(--toast-color)',
                },
              }}
            />
          </div>
        </Router>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
