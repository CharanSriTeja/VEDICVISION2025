import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import Calendar from 'react-calendar';
import { 
  Calendar as CalendarIcon, 
  Clock, 
  MapPin, 
  User, 
  Plus,
  Edit,
  Trash2,
  CheckCircle,
  X,
  ArrowLeft,
  Star
} from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { useTheme } from '../contexts/ThemeContext';
import toast from 'react-hot-toast';
import 'react-calendar/dist/Calendar.css';

const Appointments = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useAuth();
  const { isDarkMode, toggleTheme } = useTheme();
  
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [appointments, setAppointments] = useState([
    {
      id: 1,
      doctor: 'Dr. Sarah Johnson',
      specialty: 'Cardiology',
      hospital: 'City General Hospital',
      date: '2024-01-15',
      time: '10:00 AM',
      status: 'upcoming',
      notes: 'Follow-up consultation for heart condition',
      location: '123 Medical Center Dr, New York, NY'
    },
    {
      id: 2,
      doctor: 'Dr. Michael Chen',
      specialty: 'Dermatology',
      hospital: 'Metro Medical Center',
      date: '2024-01-10',
      time: '2:30 PM',
      status: 'completed',
      notes: 'Annual skin check-up',
      location: '456 Health Plaza, Los Angeles, CA'
    },
    {
      id: 3,
      doctor: 'Dr. Emily Davis',
      specialty: 'Orthopedics',
      hospital: 'Regional Health Clinic',
      date: '2024-01-08',
      time: '9:15 AM',
      status: 'completed',
      notes: 'Knee pain consultation',
      location: '789 Wellness Blvd, Houston, TX'
    },
    {
      id: 4,
      doctor: 'Dr. Robert Wilson',
      specialty: 'Cardiology',
      hospital: 'City General Hospital',
      date: '2024-01-20',
      time: '11:30 AM',
      status: 'upcoming',
      notes: 'ECG and stress test',
      location: '123 Medical Center Dr, New York, NY'
    }
  ]);

  const [showBookingModal, setShowBookingModal] = useState(false);
  const [selectedHospital, setSelectedHospital] = useState(null);
  const [bookingForm, setBookingForm] = useState({
    doctor: '',
    specialty: '',
    date: '',
    time: '',
    notes: ''
  });

  // Get selected hospital from navigation state
  useEffect(() => {
    if (location.state?.selectedHospital) {
      setSelectedHospital(location.state.selectedHospital);
      setShowBookingModal(true);
    }
  }, [location.state]);

  const getAppointmentsForDate = (date) => {
    const dateStr = date.toISOString().split('T')[0];
    return appointments.filter(apt => apt.date === dateStr);
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
        return <X className="w-4 h-4" />;
      default:
        return <Clock className="w-4 h-4" />;
    }
  };

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  const handleBookingSubmit = (e) => {
    e.preventDefault();
    
    const newAppointment = {
      id: Date.now(),
      doctor: bookingForm.doctor,
      specialty: bookingForm.specialty,
      hospital: selectedHospital?.name || 'Selected Hospital',
      date: bookingForm.date,
      time: bookingForm.time,
      status: 'upcoming',
      notes: bookingForm.notes,
      location: selectedHospital?.address || ''
    };

    setAppointments(prev => [newAppointment, ...prev]);
    setShowBookingModal(false);
    setBookingForm({
      doctor: '',
      specialty: '',
      date: '',
      time: '',
      notes: ''
    });
    setSelectedHospital(null);
    toast.success('Appointment booked successfully!');
  };

  const handleCancelAppointment = (appointmentId) => {
    setAppointments(prev => 
      prev.map(apt => 
        apt.id === appointmentId 
          ? { ...apt, status: 'cancelled' }
          : apt
      )
    );
    toast.success('Appointment cancelled');
  };

  const tileContent = ({ date, view }) => {
    if (view === 'month') {
      const dayAppointments = getAppointmentsForDate(date);
      if (dayAppointments.length > 0) {
        return (
          <div className="flex flex-col items-center">
            {dayAppointments.map((apt, index) => (
              <div
                key={index}
                className={`w-2 h-2 rounded-full mb-1 ${
                  apt.status === 'upcoming' ? 'bg-blue-500' :
                  apt.status === 'completed' ? 'bg-green-500' :
                  'bg-red-500'
                }`}
              />
            ))}
          </div>
        );
      }
    }
    return null;
  };

  const tileClassName = ({ date, view }) => {
    if (view === 'month') {
      const dayAppointments = getAppointmentsForDate(date);
      if (dayAppointments.length > 0) {
        return 'appointment-day';
      }
    }
    return null;
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <header className="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <button
                onClick={() => navigate('/dashboard')}
                className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                <ArrowLeft className="w-5 h-5" />
              </button>
              
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                  <CalendarIcon className="w-6 h-6 text-white" />
                </div>
                <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  Appointments
                </span>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <button
                onClick={() => setShowBookingModal(true)}
                className="btn btn-primary"
              >
                <Plus className="w-4 h-4" />
                Book Appointment
              </button>
              
              <button
                onClick={toggleTheme}
                className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                {isDarkMode ? '☀️' : '🌙'}
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Calendar */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="lg:col-span-1"
          >
            <div className="card">
              <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-100 mb-4">
                Calendar
              </h2>
              
              <Calendar
                onChange={handleDateChange}
                value={selectedDate}
                tileContent={tileContent}
                tileClassName={tileClassName}
                className="w-full border-0"
              />
              
              <div className="mt-4 space-y-2">
                <div className="flex items-center gap-2 text-sm">
                  <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                  <span className="text-gray-600 dark:text-gray-300">Upcoming</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  <span className="text-gray-600 dark:text-gray-300">Completed</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                  <span className="text-gray-600 dark:text-gray-300">Cancelled</span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Appointments List */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="lg:col-span-2"
          >
            <div className="card">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-100">
                  Appointments for {selectedDate.toLocaleDateString()}
                </h2>
                <div className="flex gap-2">
                  <button className="btn btn-sm btn-outline">All</button>
                  <button className="btn btn-sm btn-outline">Upcoming</button>
                  <button className="btn btn-sm btn-outline">Completed</button>
                </div>
              </div>

              <div className="space-y-4">
                {getAppointmentsForDate(selectedDate).map((appointment) => (
                  <motion.div
                    key={appointment.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="border border-gray-200 dark:border-gray-700 rounded-lg p-4 hover:shadow-md transition-shadow"
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="font-semibold text-gray-800 dark:text-gray-100">
                            {appointment.doctor}
                          </h3>
                          <span className={`px-2 py-1 rounded-full text-xs font-medium flex items-center gap-1 ${getStatusColor(appointment.status)}`}>
                            {getStatusIcon(appointment.status)}
                            {appointment.status}
                          </span>
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-600 dark:text-gray-300 mb-3">
                          <div className="flex items-center gap-2">
                            <User className="w-4 h-4" />
                            <span>{appointment.specialty}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <MapPin className="w-4 h-4" />
                            <span>{appointment.hospital}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <CalendarIcon className="w-4 h-4" />
                            <span>{new Date(appointment.date).toLocaleDateString()}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Clock className="w-4 h-4" />
                            <span>{appointment.time}</span>
                          </div>
                        </div>
                        
                        {appointment.notes && (
                          <p className="text-sm text-gray-600 dark:text-gray-300 mb-3">
                            <strong>Notes:</strong> {appointment.notes}
                          </p>
                        )}
                      </div>
                      
                      <div className="flex flex-col gap-2">
                        {appointment.status === 'upcoming' && (
                          <>
                            <button className="p-2 text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg">
                              <Edit className="w-4 h-4" />
                            </button>
                            <button 
                              onClick={() => handleCancelAppointment(appointment.id)}
                              className="p-2 text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </>
                        )}
                        {appointment.status === 'completed' && (
                          <button className="p-2 text-yellow-600 hover:bg-yellow-50 dark:hover:bg-yellow-900/20 rounded-lg">
                            <Star className="w-4 h-4" />
                          </button>
                        )}
                      </div>
                    </div>
                  </motion.div>
                ))}
                
                {getAppointmentsForDate(selectedDate).length === 0 && (
                  <div className="text-center py-8">
                    <CalendarIcon className="w-12 h-12 text-gray-400 mx-auto mb-3" />
                    <p className="text-gray-500 dark:text-gray-400">
                      No appointments scheduled for this date
                    </p>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Booking Modal */}
      {showBookingModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white dark:bg-gray-800 rounded-lg p-6 w-full max-w-md"
          >
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-100">
                Book Appointment
              </h2>
              <button
                onClick={() => setShowBookingModal(false)}
                className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {selectedHospital && (
              <div className="mb-4 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                <p className="text-sm text-blue-700 dark:text-blue-300">
                  <strong>Selected Hospital:</strong> {selectedHospital.name}
                </p>
              </div>
            )}

            <form onSubmit={handleBookingSubmit} className="space-y-4">
              <div>
                <label className="form-label">Doctor</label>
                <input
                  type="text"
                  value={bookingForm.doctor}
                  onChange={(e) => setBookingForm(prev => ({ ...prev, doctor: e.target.value }))}
                  className="form-input"
                  placeholder="Dr. Name"
                  required
                />
              </div>

              <div>
                <label className="form-label">Specialty</label>
                <select
                  value={bookingForm.specialty}
                  onChange={(e) => setBookingForm(prev => ({ ...prev, specialty: e.target.value }))}
                  className="form-select"
                  required
                >
                  <option value="">Select Specialty</option>
                  <option value="Cardiology">Cardiology</option>
                  <option value="Neurology">Neurology</option>
                  <option value="Orthopedics">Orthopedics</option>
                  <option value="Dermatology">Dermatology</option>
                  <option value="Oncology">Oncology</option>
                  <option value="Pediatrics">Pediatrics</option>
                </select>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="form-label">Date</label>
                  <input
                    type="date"
                    value={bookingForm.date}
                    onChange={(e) => setBookingForm(prev => ({ ...prev, date: e.target.value }))}
                    className="form-input"
                    required
                  />
                </div>

                <div>
                  <label className="form-label">Time</label>
                  <input
                    type="time"
                    value={bookingForm.time}
                    onChange={(e) => setBookingForm(prev => ({ ...prev, time: e.target.value }))}
                    className="form-input"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="form-label">Notes</label>
                <textarea
                  value={bookingForm.notes}
                  onChange={(e) => setBookingForm(prev => ({ ...prev, notes: e.target.value }))}
                  className="form-input"
                  rows="3"
                  placeholder="Any additional notes..."
                />
              </div>

              <div className="flex gap-3">
                <button
                  type="submit"
                  className="btn btn-primary flex-1"
                >
                  Book Appointment
                </button>
                <button
                  type="button"
                  onClick={() => setShowBookingModal(false)}
                  className="btn btn-secondary"
                >
                  Cancel
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default Appointments;
