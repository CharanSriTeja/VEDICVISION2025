import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  Heart, 
  Shield, 
  Clock, 
  Smartphone, 
  Users, 
  FileText,
  Calendar,
  MapPin,
  CheckCircle,
  ArrowRight
} from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';

const LandingPage = () => {
  const navigate = useNavigate();
  const { isDarkMode, toggleTheme } = useTheme();

  const features = [
    {
      icon: <Heart className="w-8 h-8" />,
      title: "Personal Health Records",
      description: "Access your complete medical history, lab reports, and prescriptions in one secure location."
    },
    {
      icon: <Calendar className="w-8 h-8" />,
      title: "Smart Appointment Booking",
      description: "Book appointments with nearby hospitals and doctors based on availability and specializations."
    },
    {
      icon: <Shield className="w-8 h-8" />,
      title: "Secure & Private",
      description: "Your health data is protected with bank-level security and HIPAA compliance standards."
    },
    {
      icon: <Smartphone className="w-8 h-8" />,
      title: "24/7 Access",
      description: "Manage your health anytime, anywhere with our mobile-responsive platform."
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: "Doctor Communication",
      description: "Secure messaging with healthcare providers for consultations and follow-ups."
    },
    {
      icon: <FileText className="w-8 h-8" />,
      title: "Lab Reports & Prescriptions",
      description: "Upload, view, and share your medical documents with healthcare providers."
    }
  ];

  const benefits = [
    "Real-time hospital availability",
    "Location-based hospital search",
    "Specialty-wise doctor filtering",
    "Appointment history tracking",
    "Prescription management",
    "Lab report storage & sharing",
    "Google Maps integration",
    "WhatsApp sharing capability"
  ];

  return (
    <div className="min-h-screen bg-hero bg-pattern">
      {/* Header */}
      <header className="container mx-auto px-4 py-6">
        <nav className="flex items-center justify-between">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center gap-3"
          >
            <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
              <Heart className="w-6 h-6 text-white" />
            </div>
            <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              HealthHub
            </span>
          </motion.div>
          
          <motion.button
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            onClick={toggleTheme}
            className="p-2 rounded-lg bg-white dark:bg-gray-800 shadow-md hover:shadow-lg transition-all"
          >
            {isDarkMode ? '☀️' : '🌙'}
          </motion.button>
        </nav>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-16">
        <div className="text-center max-w-4xl mx-auto">
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-5xl md:text-6xl font-bold mb-6 text-white drop-shadow-lg"
          >
            Your Health, <span className="bg-gradient-to-r from-yellow-300 to-orange-300 bg-clip-text text-transparent">Your Control</span>
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="text-xl md:text-2xl text-white/90 mb-8 max-w-3xl mx-auto drop-shadow-md"
          >
            A secure, comprehensive patient portal that puts your health information at your fingertips. 
            Manage appointments, access medical records, and connect with healthcare providers seamlessly.
          </motion.p>
          
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <button 
              onClick={() => navigate('/auth')}
              className="btn btn-gradient-primary btn-lg text-lg px-8 py-4 float"
            >
              Get Started
              <ArrowRight className="w-5 h-5" />
            </button>
            <button className="btn glass-card btn-lg text-lg px-8 py-4 text-white border-white/20 hover:bg-white/10">
              Learn More
            </button>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="container mx-auto px-4 py-16">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-800 dark:text-gray-100">
            Everything You Need for Better Health Management
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Our comprehensive platform provides all the tools you need to take control of your health journey.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="glass-card interactive-card p-6"
            >
              <div className="flex items-center gap-4 mb-4">
                <div className="p-3 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg text-white glow">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold text-white">
                  {feature.title}
                </h3>
              </div>
              <p className="text-white/80">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Benefits Section */}
      <section className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-gray-800 dark:text-gray-100">
              Why Choose HealthHub?
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 mb-8">
              Experience healthcare management like never before with our innovative features designed for modern patients.
            </p>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {benefits.map((benefit, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-center gap-3"
                >
                  <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                  <span className="text-gray-700 dark:text-gray-300">{benefit}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="relative"
          >
            <div className="bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl p-8 text-white">
              <div className="flex items-center gap-4 mb-6">
                <MapPin className="w-8 h-8" />
                <h3 className="text-2xl font-bold">Find Nearby Hospitals</h3>
              </div>
              <p className="text-blue-100 mb-6">
                Discover hospitals and clinics near you with real-time availability, 
                doctor specializations, and patient reviews.
              </p>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 bg-green-400 rounded-full"></div>
                  <span>Real-time availability</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 bg-blue-400 rounded-full"></div>
                  <span>Specialty filtering</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 bg-purple-400 rounded-full"></div>
                  <span>Google Maps integration</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-4 py-16">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-12 text-white"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Ready to Take Control of Your Health?
          </h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Join thousands of patients who are already managing their health more effectively with HealthHub.
          </p>
          <button 
            onClick={() => navigate('/auth')}
            className="btn btn-lg bg-white text-blue-600 hover:bg-gray-100 px-8 py-4 text-lg font-semibold"
          >
            Start Your Health Journey Today
            <ArrowRight className="w-5 h-5" />
          </button>
        </motion.div>
      </section>

      {/* Footer */}
      <footer className="container mx-auto px-4 py-8 border-t border-gray-200 dark:border-gray-700">
        <div className="text-center text-gray-600 dark:text-gray-400">
          <p>&copy; 2024 HealthHub. All rights reserved. Built with ❤️ for better healthcare.</p>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
