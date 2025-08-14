import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  Heart, 
  Calendar, 
  MapPin, 
  FileText, 
  Pill, 
  User, 
  LogOut,
  Bell,
  Search,
  Plus,
  Clock,
  CheckCircle,
  AlertCircle,
  TrendingUp,
  Activity,
  Settings,
  Menu,
  X,
  Play
} from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { useTheme } from '../contexts/ThemeContext';
import toast from 'react-hot-toast';
import TourGuide from './TourGuide';

const Dashboard = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const { isDarkMode, toggleTheme } = useTheme();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('overview');
  const [showTourGuide, setShowTourGuide] = useState(false);

  // Mock data
  const [stats, setStats] = useState({
    totalAppointments: 12,
    upcomingAppointments: 3,
    completedAppointments: 9,
    totalPrescriptions: 8,
    totalLabReports: 15
  });

  const [recentAppointments] = useState([
    {
      id: 1,
      doctor: 'Dr. Sarah Johnson',
      specialty: 'Cardiology',
      hospital: 'City General Hospital',
      date: '2024-01-15',
      time: '10:00 AM',
      status: 'upcoming'
    },
    {
      id: 2,
      doctor: 'Dr. Michael Chen',
      specialty: 'Dermatology',
      hospital: 'Metro Medical Center',
      date: '2024-01-10',
      time: '2:30 PM',
      status: 'completed'
    },
    {
      id: 3,
      doctor: 'Dr. Emily Davis',
      specialty: 'Orthopedics',
      hospital: 'Regional Health Clinic',
      date: '2024-01-08',
      time: '9:15 AM',
      status: 'completed'
    }
  ]);

  const [quickActions] = useState([
    {
      title: 'Book Appointment',
      icon: <Calendar className="w-6 h-6" />,
      color: 'from-blue-500 to-blue-600',
      route: '/hospitals'
    },
    {
      title: 'View Records',
      icon: <FileText className="w-6 h-6" />,
      color: 'from-green-500 to-green-600',
      route: '/health-records'
    },
    {
      title: 'Prescriptions',
      icon: <Pill className="w-6 h-6" />,
      color: 'from-purple-500 to-purple-600',
      route: '/prescriptions'
    },
    {
      title: 'Lab Reports',
      icon: <Activity className="w-6 h-6" />,
      color: 'from-orange-500 to-orange-600',
      route: '/lab-reports'
    }
  ]);

  const handleLogout = () => {
    logout();
    toast.success('Logged out successfully');
    navigate('/');
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'upcoming':
        return 'text-blue-600 bg-blue-100 dark:bg-blue-900/20';
      case 'completed':
        return 'text-green-600 bg-green-100 dark:bg-green-900/20';
      case 'cancelled':
        return 'text-red-600 bg-red-100 dark:bg-red-900/20';
      default:
        return 'text-gray-600 bg-gray-100 dark:bg-gray-900/20';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'upcoming':
        return <Clock className="w-4 h-4" />;
      case 'completed':
        return <CheckCircle className="w-4 h-4" />;
      case 'cancelled':
        return <AlertCircle className="w-4 h-4" />;
      default:
        return <Clock className="w-4 h-4" />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 bg-pattern">
      {/* Header */}
      <header className="glass-card shadow-lg border-b border-white/20 dark:border-gray-700/50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="lg:hidden p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
              
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                  <Heart className="w-6 h-6 text-white" />
                </div>
                <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  HealthHub
                </span>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <button
                onClick={() => setShowTourGuide(true)}
                className="flex items-center gap-2 px-4 py-2 btn-gradient-primary rounded-lg transition-all duration-300 hover:scale-105 glow"
              >
                <Play className="w-4 h-4" />
                <span className="hidden sm:inline">Tour Guide</span>
              </button>
              
              <button
                onClick={toggleTheme}
                className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                {isDarkMode ? '☀️' : '🌙'}
              </button>
              
              <button className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 relative">
                <Bell className="w-5 h-5" />
                <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"></span>
              </button>
              
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                  <User className="w-4 h-4 text-white" />
                </div>
                <span className="hidden sm:block font-medium">
                  {user?.firstName} {user?.lastName}
                </span>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Sidebar */}
        <aside className={`fixed lg:static inset-y-0 left-0 z-50 w-64 bg-white dark:bg-gray-800 shadow-lg lg:shadow-none border-r border-gray-200 dark:border-gray-700 transform ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0 transition-transform duration-300 ease-in-out`}>
          <div className="p-6">
            <nav className="space-y-2">
              {[
                { id: 'overview', label: 'Overview', icon: <TrendingUp className="w-5 h-5" /> },
                { id: 'appointments', label: 'Appointments', icon: <Calendar className="w-5 h-5" /> },
                { id: 'hospitals', label: 'Find Hospitals', icon: <MapPin className="w-5 h-5" /> },
                { id: 'records', label: 'Health Records', icon: <FileText className="w-5 h-5" /> },
                { id: 'prescriptions', label: 'Prescriptions', icon: <Pill className="w-5 h-5" /> },
                { id: 'lab-reports', label: 'Lab Reports', icon: <Activity className="w-5 h-5" /> },
                { id: 'profile', label: 'Profile', icon: <User className="w-5 h-5" /> }
              ].map((item) => (
                <button
                  key={item.id}
                  onClick={() => {
                    setActiveTab(item.id);
                    if (item.id !== 'overview') {
                      navigate(`/${item.id}`);
                    }
                    setIsMobileMenuOpen(false);
                  }}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left transition-colors ${
                    activeTab === item.id
                      ? 'bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400'
                      : 'text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700'
                  }`}
                >
                  {item.icon}
                  {item.label}
                </button>
              ))}
            </nav>

            <div className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-700">
              <button
                onClick={handleLogout}
                className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
              >
                <LogOut className="w-5 h-5" />
                Logout
              </button>
            </div>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-6">
          <div className="max-w-7xl mx-auto">
            {/* Welcome Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-8"
            >
              <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-100 mb-2">
                Welcome back, {user?.firstName}!
              </h1>
              <p className="text-gray-600 dark:text-gray-300">
                Here's what's happening with your health today.
              </p>
            </motion.div>

            {/* Stats Cards */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mb-8"
            >
              {[
                { label: 'Total Appointments', value: stats.totalAppointments, icon: <Calendar className="w-6 h-6" />, color: 'from-blue-500 to-blue-600' },
                { label: 'Upcoming', value: stats.upcomingAppointments, icon: <Clock className="w-6 h-6" />, color: 'from-orange-500 to-orange-600' },
                { label: 'Completed', value: stats.completedAppointments, icon: <CheckCircle className="w-6 h-6" />, color: 'from-green-500 to-green-600' },
                { label: 'Prescriptions', value: stats.totalPrescriptions, icon: <Pill className="w-6 h-6" />, color: 'from-purple-500 to-purple-600' },
                { label: 'Lab Reports', value: stats.totalLabReports, icon: <FileText className="w-6 h-6" />, color: 'from-indigo-500 to-indigo-600' }
                             ].map((stat, index) => (
                 <motion.div 
                   key={index} 
                   className="glass-card interactive-card"
                   whileHover={{ scale: 1.05 }}
                   transition={{ duration: 0.3 }}
                 >
                   <div className="flex items-center justify-between">
                     <div>
                       <p className="text-sm text-gray-600 dark:text-gray-300 mb-1">{stat.label}</p>
                       <p className="text-2xl font-bold text-gray-800 dark:text-gray-100">{stat.value}</p>
                     </div>
                     <div className={`p-3 rounded-lg bg-gradient-to-r ${stat.color} text-white float`}>
                       {stat.icon}
                     </div>
                   </div>
                 </motion.div>
               ))}
            </motion.div>

            {/* Quick Actions */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="mb-8"
            >
              <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-100 mb-4">
                Quick Actions
              </h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                 {quickActions.map((action, index) => (
                   <motion.button
                     key={index}
                     onClick={() => navigate(action.route)}
                     className="glass-card interactive-card p-6 group"
                     whileHover={{ scale: 1.05, y: -5 }}
                     transition={{ duration: 0.3 }}
                   >
                     <div className={`p-4 rounded-lg bg-gradient-to-r ${action.color} text-white mb-4 group-hover:scale-110 transition-transform float`}>
                       {action.icon}
                     </div>
                     <h3 className="font-medium text-gray-800 dark:text-gray-100 text-center">
                       {action.title}
                     </h3>
                   </motion.button>
                 ))}
              </div>
            </motion.div>

            {/* Recent Appointments */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="mb-8"
            >
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-100">
                  Recent Appointments
                </h2>
                <button
                  onClick={() => navigate('/appointments')}
                  className="text-blue-600 dark:text-blue-400 hover:underline text-sm font-medium"
                >
                  View All
                </button>
              </div>
              
              <div className="space-y-4">
                                 {recentAppointments.map((appointment) => (
                   <motion.div 
                     key={appointment.id} 
                     className="glass-card interactive-card"
                     whileHover={{ scale: 1.02, y: -2 }}
                     transition={{ duration: 0.3 }}
                   >
                     <div className="flex items-center justify-between">
                       <div className="flex items-center gap-4">
                         <div className={`p-3 rounded-lg ${getStatusColor(appointment.status)} float`}>
                           {getStatusIcon(appointment.status)}
                         </div>
                         <div>
                           <h3 className="font-medium text-gray-800 dark:text-gray-100">
                             {appointment.doctor}
                           </h3>
                           <p className="text-sm text-gray-600 dark:text-gray-300">
                             {appointment.specialty} • {appointment.hospital}
                           </p>
                           <p className="text-sm text-gray-500 dark:text-gray-400">
                             {new Date(appointment.date).toLocaleDateString()} at {appointment.time}
                           </p>
                         </div>
                       </div>
                       <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(appointment.status)}`}>
                         {appointment.status}
                       </span>
                     </div>
                   </motion.div>
                 ))}
              </div>
            </motion.div>

            {/* Health Tips */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="grid grid-cols-1 lg:grid-cols-2 gap-6"
            >
                             <motion.div 
                 className="glass-card interactive-card"
                 whileHover={{ scale: 1.02, y: -2 }}
                 transition={{ duration: 0.3 }}
               >
                 <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100 mb-3">
                   Health Tips
                 </h3>
                 <div className="space-y-3">
                   <div className="flex items-start gap-3">
                     <div className="w-3 h-3 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full mt-2 flex-shrink-0 float"></div>
                     <p className="text-sm text-gray-600 dark:text-gray-300">
                       Stay hydrated by drinking at least 8 glasses of water daily
                     </p>
                   </div>
                   <div className="flex items-start gap-3">
                     <div className="w-3 h-3 bg-gradient-to-r from-green-500 to-green-600 rounded-full mt-2 flex-shrink-0 float"></div>
                     <p className="text-sm text-gray-600 dark:text-gray-300">
                       Get 7-9 hours of quality sleep for optimal health
                     </p>
                   </div>
                   <div className="flex items-start gap-3">
                     <div className="w-3 h-3 bg-gradient-to-r from-purple-500 to-purple-600 rounded-full mt-2 flex-shrink-0 float"></div>
                     <p className="text-sm text-gray-600 dark:text-gray-300">
                       Exercise regularly for at least 30 minutes daily
                     </p>
                   </div>
                 </div>
               </motion.div>

                             <motion.div 
                 className="glass-card interactive-card"
                 whileHover={{ scale: 1.02, y: -2 }}
                 transition={{ duration: 0.3 }}
               >
                 <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100 mb-3">
                   Upcoming Reminders
                 </h3>
                 <div className="space-y-3">
                   <div className="flex items-center justify-between p-4 bg-gradient-to-r from-blue-500/10 to-blue-600/10 rounded-lg border border-blue-200/20">
                     <div>
                       <p className="font-medium text-gray-800 dark:text-gray-100">Blood Test</p>
                       <p className="text-sm text-gray-600 dark:text-gray-300">Tomorrow at 9:00 AM</p>
                     </div>
                     <Bell className="w-5 h-5 text-blue-500 float" />
                   </div>
                   <div className="flex items-center justify-between p-4 bg-gradient-to-r from-green-500/10 to-green-600/10 rounded-lg border border-green-200/20">
                     <div>
                       <p className="font-medium text-gray-800 dark:text-gray-100">Medication Refill</p>
                       <p className="text-sm text-gray-600 dark:text-gray-300">In 3 days</p>
                     </div>
                     <Pill className="w-5 h-5 text-green-500 float" />
                   </div>
                 </div>
               </motion.div>
            </motion.div>
          </div>
        </main>
      </div>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      {/* Tour Guide */}
      <TourGuide 
        isOpen={showTourGuide} 
        onClose={() => setShowTourGuide(false)} 
      />
    </div>
  );
};

export default Dashboard;
