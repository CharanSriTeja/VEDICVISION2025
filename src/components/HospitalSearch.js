import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  Search, 
  MapPin, 
  Filter, 
  Star, 
  Clock, 
  Phone, 
  Mail, 
  ExternalLink,
  Heart,
  Navigation,
  Calendar,
  CheckCircle,
  X,
  SlidersHorizontal
} from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { useTheme } from '../contexts/ThemeContext';
import toast from 'react-hot-toast';

const HospitalSearch = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { isDarkMode, toggleTheme } = useTheme();
  
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSpecialty, setSelectedSpecialty] = useState('');
  const [selectedState, setSelectedState] = useState('');
  const [selectedCardType, setSelectedCardType] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [likedHospitals, setLikedHospitals] = useState([]);
  const [interestedHospitals, setInterestedHospitals] = useState([]);
  const [activeTab, setActiveTab] = useState('all');

  // Mock hospital data
  const [hospitals] = useState([
    {
      id: 1,
      name: 'City General Hospital',
      specialty: 'Multi-Specialty',
      state: 'New York',
      city: 'New York',
      address: '123 Medical Center Dr',
      rating: 4.5,
      reviews: 1247,
      availability: 'available',
      cardType: 'General',
      phone: '+1 (555) 123-4567',
      email: 'info@citygeneral.com',
      website: 'https://citygeneral.com',
      coordinates: { lat: 40.7128, lng: -74.0060 },
      description: 'A leading multi-specialty hospital providing comprehensive healthcare services.',
      facilities: ['Emergency Care', 'ICU', 'Laboratory', 'Radiology', 'Pharmacy'],
      doctors: [
        { name: 'Dr. Sarah Johnson', specialty: 'Cardiology', available: true },
        { name: 'Dr. Michael Chen', specialty: 'Neurology', available: true },
        { name: 'Dr. Emily Davis', specialty: 'Orthopedics', available: false }
      ]
    },
    {
      id: 2,
      name: 'Metro Medical Center',
      specialty: 'Cardiology',
      state: 'California',
      city: 'Los Angeles',
      address: '456 Health Plaza',
      rating: 4.8,
      reviews: 892,
      availability: 'available',
      cardType: 'Specialized',
      phone: '+1 (555) 987-6543',
      email: 'contact@metromedical.com',
      website: 'https://metromedical.com',
      coordinates: { lat: 34.0522, lng: -118.2437 },
      description: 'Specialized cardiac care center with state-of-the-art facilities.',
      facilities: ['Cardiac ICU', 'Cath Lab', 'Echo Lab', 'Cardiac Rehab'],
      doctors: [
        { name: 'Dr. Robert Wilson', specialty: 'Cardiology', available: true },
        { name: 'Dr. Lisa Thompson', specialty: 'Cardiac Surgery', available: true }
      ]
    },
    {
      id: 3,
      name: 'Regional Health Clinic',
      specialty: 'Orthopedics',
      state: 'Texas',
      city: 'Houston',
      address: '789 Wellness Blvd',
      rating: 4.2,
      reviews: 567,
      availability: 'unavailable',
      cardType: 'Specialized',
      phone: '+1 (555) 456-7890',
      email: 'info@regionalhealth.com',
      website: 'https://regionalhealth.com',
      coordinates: { lat: 29.7604, lng: -95.3698 },
      description: 'Specialized orthopedic care with advanced surgical techniques.',
      facilities: ['Orthopedic Surgery', 'Physical Therapy', 'Sports Medicine'],
      doctors: [
        { name: 'Dr. James Brown', specialty: 'Orthopedics', available: false },
        { name: 'Dr. Maria Garcia', specialty: 'Sports Medicine', available: false }
      ]
    },
    {
      id: 4,
      name: 'Community Medical Center',
      specialty: 'Multi-Specialty',
      state: 'Florida',
      city: 'Miami',
      address: '321 Care Street',
      rating: 4.6,
      reviews: 734,
      availability: 'available',
      cardType: 'General',
      phone: '+1 (555) 321-0987',
      email: 'hello@communitymedical.com',
      website: 'https://communitymedical.com',
      coordinates: { lat: 25.7617, lng: -80.1918 },
      description: 'Community-focused healthcare with personalized patient care.',
      facilities: ['Primary Care', 'Pediatrics', 'Women\'s Health', 'Dental'],
      doctors: [
        { name: 'Dr. David Lee', specialty: 'Family Medicine', available: true },
        { name: 'Dr. Jennifer White', specialty: 'Pediatrics', available: true }
      ]
    }
  ]);

  const specialties = ['All Specialties', 'Cardiology', 'Neurology', 'Orthopedics', 'Dermatology', 'Oncology', 'Pediatrics', 'Multi-Specialty'];
  const states = ['All States', 'New York', 'California', 'Texas', 'Florida', 'Illinois', 'Pennsylvania'];
  const cardTypes = ['All Types', 'General', 'Specialized', 'Emergency', 'Rehabilitation'];

  const filteredHospitals = hospitals.filter(hospital => {
    const matchesSearch = hospital.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         hospital.city.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesSpecialty = selectedSpecialty === '' || selectedSpecialty === 'All Specialties' || 
                            hospital.specialty === selectedSpecialty;
    const matchesState = selectedState === '' || selectedState === 'All States' || 
                        hospital.state === selectedState;
    const matchesCardType = selectedCardType === '' || selectedCardType === 'All Types' || 
                           hospital.cardType === selectedCardType;

    return matchesSearch && matchesSpecialty && matchesState && matchesCardType;
  });

  const getFilteredHospitalsByTab = () => {
    switch (activeTab) {
      case 'available':
        return filteredHospitals.filter(h => h.availability === 'available');
      case 'unavailable':
        return filteredHospitals.filter(h => h.availability === 'unavailable');
      case 'liked':
        return filteredHospitals.filter(h => likedHospitals.includes(h.id));
      case 'interested':
        return filteredHospitals.filter(h => interestedHospitals.includes(h.id));
      default:
        return filteredHospitals;
    }
  };

  const toggleLiked = (hospitalId) => {
    setLikedHospitals(prev => 
      prev.includes(hospitalId) 
        ? prev.filter(id => id !== hospitalId)
        : [...prev, hospitalId]
    );
    toast.success('Hospital preference updated');
  };

  const toggleInterested = (hospitalId) => {
    setInterestedHospitals(prev => 
      prev.includes(hospitalId) 
        ? prev.filter(id => id !== hospitalId)
        : [...prev, hospitalId]
    );
    toast.success('Interest updated');
  };

  const openGoogleMaps = (coordinates) => {
    const url = `https://www.google.com/maps?q=${coordinates.lat},${coordinates.lng}`;
    window.open(url, '_blank');
  };

  const handleBookAppointment = (hospital) => {
    // Navigate to appointment booking with hospital data
    navigate('/appointments', { state: { selectedHospital: hospital } });
  };

  const getAvailabilityColor = (availability) => {
    return availability === 'available' 
      ? 'text-green-600 bg-green-100 dark:bg-green-900/20' 
      : 'text-red-600 bg-red-100 dark:bg-red-900/20';
  };

  const getAvailabilityIcon = (availability) => {
    return availability === 'available' 
      ? <CheckCircle className="w-4 h-4" /> 
      : <X className="w-4 h-4" />;
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
                <X className="w-5 h-5" />
              </button>
              
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                  <MapPin className="w-6 h-6 text-white" />
                </div>
                <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  Find Hospitals
                </span>
              </div>
            </div>

            <button
              onClick={toggleTheme}
              className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"
            >
              {isDarkMode ? '☀️' : '🌙'}
            </button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-6">
        {/* Search and Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-6"
        >
          <div className="flex flex-col lg:flex-row gap-4 mb-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search hospitals, cities, or specialties..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center gap-2 px-4 py-3 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
            >
              <SlidersHorizontal className="w-5 h-5" />
              Filters
            </button>
          </div>

          {/* Filter Options */}
          <motion.div
            initial={false}
            animate={{ height: showFilters ? 'auto' : 0, opacity: showFilters ? 1 : 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Specialty
                </label>
                <select
                  value={selectedSpecialty}
                  onChange={(e) => setSelectedSpecialty(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
                >
                  {specialties.map(specialty => (
                    <option key={specialty} value={specialty}>{specialty}</option>
                  ))}
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  State
                </label>
                <select
                  value={selectedState}
                  onChange={(e) => setSelectedState(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
                >
                  {states.map(state => (
                    <option key={state} value={state}>{state}</option>
                  ))}
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Hospital Type
                </label>
                <select
                  value={selectedCardType}
                  onChange={(e) => setSelectedCardType(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
                >
                  {cardTypes.map(type => (
                    <option key={type} value={type}>{type}</option>
                  ))}
                </select>
              </div>
            </div>
          </motion.div>
        </motion.div>

        {/* Tabs */}
        <div className="flex flex-wrap gap-2 mb-6">
          {[
            { id: 'all', label: 'All Hospitals', count: filteredHospitals.length },
            { id: 'available', label: 'Available', count: filteredHospitals.filter(h => h.availability === 'available').length },
            { id: 'unavailable', label: 'Unavailable', count: filteredHospitals.filter(h => h.availability === 'unavailable').length },
            { id: 'liked', label: 'Liked', count: likedHospitals.length },
            { id: 'interested', label: 'Interested', count: interestedHospitals.length }
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                activeTab === tab.id
                  ? 'bg-blue-600 text-white'
                  : 'bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700'
              }`}
            >
              {tab.label} ({tab.count})
            </button>
          ))}
        </div>

        {/* Results */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {getFilteredHospitalsByTab().map((hospital, index) => (
            <motion.div
              key={hospital.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className={`card ${hospital.availability === 'unavailable' ? 'opacity-75' : ''}`}
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100">
                      {hospital.name}
                    </h3>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium flex items-center gap-1 ${getAvailabilityColor(hospital.availability)}`}>
                      {getAvailabilityIcon(hospital.availability)}
                      {hospital.availability === 'available' ? 'Available' : 'Unavailable'}
                    </span>
                  </div>
                  
                  <div className="flex items-center gap-4 text-sm text-gray-600 dark:text-gray-300 mb-2">
                    <span className="flex items-center gap-1">
                      <MapPin className="w-4 h-4" />
                      {hospital.city}, {hospital.state}
                    </span>
                    <span className="flex items-center gap-1">
                      <Star className="w-4 h-4 text-yellow-500" />
                      {hospital.rating} ({hospital.reviews} reviews)
                    </span>
                  </div>
                  
                  <p className="text-gray-600 dark:text-gray-300 text-sm mb-3">
                    {hospital.description}
                  </p>
                </div>
                
                <div className="flex flex-col gap-2">
                  <button
                    onClick={() => toggleLiked(hospital.id)}
                    className={`p-2 rounded-lg transition-colors ${
                      likedHospitals.includes(hospital.id)
                        ? 'text-red-500 bg-red-50 dark:bg-red-900/20'
                        : 'text-gray-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20'
                    }`}
                  >
                    <Heart className={`w-5 h-5 ${likedHospitals.includes(hospital.id) ? 'fill-current' : ''}`} />
                  </button>
                  
                  <button
                    onClick={() => toggleInterested(hospital.id)}
                    className={`p-2 rounded-lg transition-colors ${
                      interestedHospitals.includes(hospital.id)
                        ? 'text-blue-500 bg-blue-50 dark:bg-blue-900/20'
                        : 'text-gray-400 hover:text-blue-500 hover:bg-blue-50 dark:hover:bg-blue-900/20'
                    }`}
                  >
                    <Calendar className="w-5 h-5" />
                  </button>
                </div>
              </div>

              {/* Hospital Details */}
              <div className="space-y-3 mb-4">
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="font-medium text-gray-700 dark:text-gray-300">Specialty:</span>
                    <span className="ml-2 text-gray-600 dark:text-gray-400">{hospital.specialty}</span>
                  </div>
                  <div>
                    <span className="font-medium text-gray-700 dark:text-gray-300">Type:</span>
                    <span className="ml-2 text-gray-600 dark:text-gray-400">{hospital.cardType}</span>
                  </div>
                </div>
                
                <div>
                  <span className="font-medium text-gray-700 dark:text-gray-300">Facilities:</span>
                  <div className="flex flex-wrap gap-1 mt-1">
                    {hospital.facilities.map((facility, idx) => (
                      <span key={idx} className="px-2 py-1 bg-gray-100 dark:bg-gray-700 rounded text-xs">
                        {facility}
                      </span>
                    ))}
                  </div>
                </div>
                
                <div>
                  <span className="font-medium text-gray-700 dark:text-gray-300">Available Doctors:</span>
                  <div className="mt-1 space-y-1">
                    {hospital.doctors.map((doctor, idx) => (
                      <div key={idx} className="flex items-center gap-2 text-sm">
                        <span className="text-gray-600 dark:text-gray-400">{doctor.name}</span>
                        <span className="text-gray-500 dark:text-gray-500">({doctor.specialty})</span>
                        {doctor.available && (
                          <span className="text-green-600 text-xs">Available</span>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Contact and Actions */}
              <div className="flex items-center justify-between pt-4 border-t border-gray-200 dark:border-gray-700">
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => openGoogleMaps(hospital.coordinates)}
                    className="flex items-center gap-1 text-blue-600 dark:text-blue-400 hover:underline text-sm"
                  >
                    <Navigation className="w-4 h-4" />
                    Directions
                  </button>
                  
                  <a
                    href={`tel:${hospital.phone}`}
                    className="flex items-center gap-1 text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200 text-sm"
                  >
                    <Phone className="w-4 h-4" />
                    Call
                  </a>
                  
                  <a
                    href={hospital.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1 text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200 text-sm"
                  >
                    <ExternalLink className="w-4 h-4" />
                    Website
                  </a>
                </div>
                
                <button
                  onClick={() => handleBookAppointment(hospital)}
                  disabled={hospital.availability === 'unavailable'}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    hospital.availability === 'available'
                      ? 'bg-blue-600 text-white hover:bg-blue-700'
                      : 'bg-gray-300 dark:bg-gray-600 text-gray-500 dark:text-gray-400 cursor-not-allowed'
                  }`}
                >
                  Book Appointment
                </button>
              </div>
            </motion.div>
          ))}
        </div>

        {getFilteredHospitalsByTab().length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12"
          >
            <MapPin className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-600 dark:text-gray-300 mb-2">
              No hospitals found
            </h3>
            <p className="text-gray-500 dark:text-gray-400">
              Try adjusting your search criteria or filters
            </p>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default HospitalSearch;
