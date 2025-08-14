import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Heart,
  Shield,
  Smartphone,
  Users,
  FileText,
  Calendar,
  CheckCircle,
  ArrowRight,
  Sun,
  Moon
} from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext'; // Assuming this context exists

const LandingPage = () => {
  const navigate = useNavigate();
  const { isDarkMode, toggleTheme } = useTheme();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { type: 'spring', stiffness: 100 } }
  };

  const features = [
    { icon: <Heart className="icon" />, title: "Personal Health Records", description: "Access your complete medical history, lab reports, and prescriptions in one secure location." },
    { icon: <Calendar className="icon" />, title: "Smart Appointment Booking", description: "Book appointments with nearby hospitals and doctors based on availability and specializations." },
    { icon: <Shield className="icon" />, title: "Secure & Private", description: "Your health data is protected with bank-level security and HIPAA compliance standards." },
    { icon: <Smartphone className="icon" />, title: "24/7 Access", description: "Manage your health anytime, anywhere with our mobile-responsive platform." },
    { icon: <Users className="icon" />, title: "Doctor Communication", description: "Secure messaging with healthcare providers for consultations and follow-ups." },
    { icon: <FileText className="icon" />, title: "Lab Reports & Prescriptions", description: "Upload, view, and share your medical documents with healthcare providers." }
  ];

  const benefits = [
    "Real-time hospital availability",
    "Location-based hospital search",
    "Specialty-wise doctor filtering",
    "Appointment history tracking",
    "Prescription management",
    "Google Maps integration"
  ];

  return (
    <div className="landing-page">
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
        className="sticky-header"
      >
        <nav className="container header-nav">
          <div className="logo">
            <div className="logo-icon-wrapper">
              <Heart className="icon" />
            </div>
            <span className="logo-text">HealthHub</span>
          </div>
          
          <motion.button
            onClick={toggleTheme}
            className="theme-toggle-button"
            whileHover={{ scale: 1.1, rotate: 15 }}
            whileTap={{ scale: 0.9 }}
          >
            {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
          </motion.button>
        </nav>
      </motion.header>

      <main>
        {/* Hero Section */}
        <section className="hero-section">
          <div className="hero-bg"></div>
          <div className="container hero-content">
            <motion.h1
              variants={itemVariants}
              initial="hidden"
              animate="visible"
              transition={{ delay: 0.2, type: 'spring' }}
            >
              Your Health, <span className="text-gradient-animated">Your Control</span>
            </motion.h1>
            
            <motion.p
              variants={itemVariants}
              initial="hidden"
              animate="visible"
              transition={{ delay: 0.4, type: 'spring' }}
            >
              A secure, comprehensive patient portal that puts your health information at your fingertips. Manage appointments, access medical records, and connect with healthcare providers seamlessly.
            </motion.p>
            
            <motion.div
              variants={itemVariants}
              initial="hidden"
              animate="visible"
              transition={{ delay: 0.6 }}
            >
              <button onClick={() => navigate('/auth')} className="btn btn-primary btn-lg">
                Get Started Today <ArrowRight className="icon-sm" />
              </button>
            </motion.div>
          </div>
        </section>

        {/* Features Section */}
        <section className="features-section">
          <div className="container">
            <div className="section-header">
              <h2>A Healthier You is a Click Away</h2>
              <p>Our platform provides all the tools you need to take control of your health journey.</p>
            </div>

            <motion.div
              className="features-grid"
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
            >
              {features.map((feature, index) => (
                <motion.div key={index} variants={itemVariants} className="card feature-card">
                  <div className="feature-card-header">
                    <div className="feature-icon-wrapper">
                      {feature.icon}
                    </div>
                    <h3>{feature.title}</h3>
                  </div>
                  <p>{feature.description}</p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* Benefits Section */}
        <section className="benefits-section">
          <div className="container benefits-grid">
            <motion.div
              className="benefits-content"
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2>Why Choose HealthHub?</h2>
              <p>Experience healthcare management like never before with our innovative features designed for modern patients.</p>
              
              <motion.ul
                className="benefits-list"
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }}
              >
                {benefits.map((benefit, index) => (
                  <motion.li key={index} variants={itemVariants} className="benefit-item">
                    <CheckCircle className="benefit-icon" />
                    <span>{benefit}</span>
                  </motion.li>
                ))}
              </motion.ul>
            </motion.div>

            <motion.div
              className="benefit-visual"
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <img src="https://images.pexels.com/photos/4021775/pexels-photo-4021775.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" alt="Doctor and patient" />
            </motion.div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="cta-section">
          <div className="container">
            <div className="cta-card">
              <h2>Ready to Take Control?</h2>
              <p>Join thousands of patients who are managing their health more effectively with HealthHub.</p>
              <button onClick={() => navigate('/auth')} className="btn btn-light btn-lg">
                Start Your Journey Now <ArrowRight className="icon-sm" />
              </button>
            </div>
          </div>
        </section>
      </main>

      <footer className="footer">
        <div className="container">
          <p>&copy; {new Date().getFullYear()} HealthHub. All Rights Reserved.</p>
          <p className="footer-subtitle">Built with love for a healthier future.</p>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
