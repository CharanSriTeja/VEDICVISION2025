import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  FileText, 
  Upload, 
  Download, 
  Share2, 
  Eye, 
  Trash2, 
  Plus,
  ArrowLeft,
  Calendar,
  User,
  AlertCircle,
  CheckCircle,
  X,
  Clock
} from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { useTheme } from '../contexts/ThemeContext';
import toast from 'react-hot-toast';

const LabReports = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { isDarkMode, toggleTheme } = useTheme();
  
  const [reports, setReports] = useState([
    {
      id: 1,
      name: 'Blood Test Report',
      type: 'Blood Analysis',
      date: '2024-01-10',
      hospital: 'City General Hospital',
      doctor: 'Dr. Sarah Johnson',
      status: 'normal',
      file: 'blood_test_report.pdf',
      size: '2.4 MB',
      description: 'Complete blood count and metabolic panel'
    },
    {
      id: 2,
      name: 'ECG Report',
      type: 'Cardiology',
      date: '2024-01-08',
      hospital: 'Metro Medical Center',
      doctor: 'Dr. Robert Wilson',
      status: 'abnormal',
      file: 'ecg_report.pdf',
      size: '1.8 MB',
      description: 'Electrocardiogram showing irregular heartbeat'
    },
    {
      id: 3,
      name: 'X-Ray Report',
      type: 'Radiology',
      date: '2024-01-05',
      hospital: 'Regional Health Clinic',
      doctor: 'Dr. Emily Davis',
      status: 'normal',
      file: 'xray_report.pdf',
      size: '3.2 MB',
      description: 'Chest X-ray for respiratory assessment'
    },
    {
      id: 4,
      name: 'Urine Analysis',
      type: 'Laboratory',
      date: '2024-01-03',
      hospital: 'Community Medical Center',
      doctor: 'Dr. David Lee',
      status: 'normal',
      file: 'urine_analysis.pdf',
      size: '1.5 MB',
      description: 'Routine urine analysis and culture'
    }
  ]);

  const [showUploadModal, setShowUploadModal] = useState(false);
  const [uploadForm, setUploadForm] = useState({
    name: '',
    type: '',
    hospital: '',
    doctor: '',
    description: '',
    file: null
  });

  const getStatusColor = (status) => {
    switch (status) {
      case 'normal':
        return 'text-green-600 bg-green-100 dark:bg-green-900/20';
      case 'abnormal':
        return 'text-red-600 bg-red-100 dark:bg-red-900/20';
      case 'pending':
        return 'text-yellow-600 bg-yellow-100 dark:bg-yellow-900/20';
      default:
        return 'text-gray-600 bg-gray-100 dark:bg-gray-900/20';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'normal':
        return <CheckCircle className="w-4 h-4" />;
      case 'abnormal':
        return <AlertCircle className="w-4 h-4" />;
      case 'pending':
        return <Clock className="w-4 h-4" />;
      default:
        return <FileText className="w-4 h-4" />;
    }
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setUploadForm(prev => ({ ...prev, file }));
    }
  };

  const handleUploadSubmit = (e) => {
    e.preventDefault();
    
    if (!uploadForm.file) {
      toast.error('Please select a file to upload');
      return;
    }

    const newReport = {
      id: Date.now(),
      name: uploadForm.name,
      type: uploadForm.type,
      date: new Date().toISOString().split('T')[0],
      hospital: uploadForm.hospital,
      doctor: uploadForm.doctor,
      status: 'pending',
      file: uploadForm.file.name,
      size: `${(uploadForm.file.size / 1024 / 1024).toFixed(1)} MB`,
      description: uploadForm.description
    };

    setReports(prev => [newReport, ...prev]);
    setShowUploadModal(false);
    setUploadForm({
      name: '',
      type: '',
      hospital: '',
      doctor: '',
      description: '',
      file: null
    });
    toast.success('Report uploaded successfully!');
  };

  const handleDownload = (report) => {
    // Simulate download
    toast.success(`Downloading ${report.name}...`);
  };

  const handleShareWhatsApp = (report) => {
    const message = `Lab Report: ${report.name}\nType: ${report.type}\nDate: ${report.date}\nHospital: ${report.hospital}\nDoctor: ${report.doctor}`;
    const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
    toast.success('Opening WhatsApp...');
  };

  const handleDeleteReport = (reportId) => {
    setReports(prev => prev.filter(report => report.id !== reportId));
    toast.success('Report deleted successfully');
  };

  const reportTypes = [
    'Blood Analysis',
    'Cardiology',
    'Radiology',
    'Laboratory',
    'Pathology',
    'Microbiology',
    'Biochemistry',
    'Hematology'
  ];

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
                  <FileText className="w-6 h-6 text-white" />
                </div>
                <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  Lab Reports
                </span>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <button
                onClick={() => setShowUploadModal(true)}
                className="btn btn-primary"
              >
                <Plus className="w-4 h-4" />
                Upload Report
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
        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8"
        >
          {[
            { label: 'Total Reports', value: reports.length, icon: <FileText className="w-6 h-6" />, color: 'from-blue-500 to-blue-600' },
            { label: 'Normal', value: reports.filter(r => r.status === 'normal').length, icon: <CheckCircle className="w-6 h-6" />, color: 'from-green-500 to-green-600' },
            { label: 'Abnormal', value: reports.filter(r => r.status === 'abnormal').length, icon: <AlertCircle className="w-6 h-6" />, color: 'from-red-500 to-red-600' },
            { label: 'Pending', value: reports.filter(r => r.status === 'pending').length, icon: <Clock className="w-6 h-6" />, color: 'from-yellow-500 to-yellow-600' }
          ].map((stat, index) => (
            <div key={index} className="card">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-300 mb-1">{stat.label}</p>
                  <p className="text-2xl font-bold text-gray-800 dark:text-gray-100">{stat.value}</p>
                </div>
                <div className={`p-3 rounded-lg bg-gradient-to-r ${stat.color} text-white`}>
                  {stat.icon}
                </div>
              </div>
            </div>
          ))}
        </motion.div>

        {/* Reports List */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="card"
        >
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-100">
              All Reports
            </h2>
            <div className="flex gap-2">
              <button className="btn btn-sm btn-outline">All</button>
              <button className="btn btn-sm btn-outline">Normal</button>
              <button className="btn btn-sm btn-outline">Abnormal</button>
              <button className="btn btn-sm btn-outline">Pending</button>
            </div>
          </div>

          <div className="space-y-4">
            {reports.map((report, index) => (
              <motion.div
                key={report.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="border border-gray-200 dark:border-gray-700 rounded-lg p-4 hover:shadow-md transition-shadow"
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="font-semibold text-gray-800 dark:text-gray-100">
                        {report.name}
                      </h3>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium flex items-center gap-1 ${getStatusColor(report.status)}`}>
                        {getStatusIcon(report.status)}
                        {report.status}
                      </span>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 text-sm text-gray-600 dark:text-gray-300 mb-3">
                      <div className="flex items-center gap-2">
                        <FileText className="w-4 h-4" />
                        <span>{report.type}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4" />
                        <span>{new Date(report.date).toLocaleDateString()}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <User className="w-4 h-4" />
                        <span>{report.doctor}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded">
                          {report.size}
                        </span>
                      </div>
                    </div>
                    
                    <p className="text-sm text-gray-600 dark:text-gray-300 mb-3">
                      <strong>Hospital:</strong> {report.hospital}
                    </p>
                    
                    {report.description && (
                      <p className="text-sm text-gray-600 dark:text-gray-300">
                        <strong>Description:</strong> {report.description}
                      </p>
                    )}
                  </div>
                  
                  <div className="flex flex-col gap-2">
                    <button
                      onClick={() => handleDownload(report)}
                      className="p-2 text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg"
                      title="Download"
                    >
                      <Download className="w-4 h-4" />
                    </button>
                    
                    <button
                      onClick={() => handleShareWhatsApp(report)}
                      className="p-2 text-green-600 hover:bg-green-50 dark:hover:bg-green-900/20 rounded-lg"
                      title="Share via WhatsApp"
                    >
                      <Share2 className="w-4 h-4" />
                    </button>
                    
                    <button
                      onClick={() => handleDeleteReport(report.id)}
                      className="p-2 text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg"
                      title="Delete"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
            
            {reports.length === 0 && (
              <div className="text-center py-8">
                <FileText className="w-12 h-12 text-gray-400 mx-auto mb-3" />
                <p className="text-gray-500 dark:text-gray-400">
                  No lab reports found
                </p>
              </div>
            )}
          </div>
        </motion.div>
      </div>

      {/* Upload Modal */}
      {showUploadModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white dark:bg-gray-800 rounded-lg p-6 w-full max-w-md"
          >
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-100">
                Upload Lab Report
              </h2>
              <button
                onClick={() => setShowUploadModal(false)}
                className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleUploadSubmit} className="space-y-4">
              <div>
                <label className="form-label">Report Name</label>
                <input
                  type="text"
                  value={uploadForm.name}
                  onChange={(e) => setUploadForm(prev => ({ ...prev, name: e.target.value }))}
                  className="form-input"
                  placeholder="e.g., Blood Test Report"
                  required
                />
              </div>

              <div>
                <label className="form-label">Report Type</label>
                <select
                  value={uploadForm.type}
                  onChange={(e) => setUploadForm(prev => ({ ...prev, type: e.target.value }))}
                  className="form-select"
                  required
                >
                  <option value="">Select Report Type</option>
                  {reportTypes.map(type => (
                    <option key={type} value={type}>{type}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="form-label">Hospital</label>
                <input
                  type="text"
                  value={uploadForm.hospital}
                  onChange={(e) => setUploadForm(prev => ({ ...prev, hospital: e.target.value }))}
                  className="form-input"
                  placeholder="Hospital name"
                  required
                />
              </div>

              <div>
                <label className="form-label">Doctor</label>
                <input
                  type="text"
                  value={uploadForm.doctor}
                  onChange={(e) => setUploadForm(prev => ({ ...prev, doctor: e.target.value }))}
                  className="form-input"
                  placeholder="Dr. Name"
                  required
                />
              </div>

              <div>
                <label className="form-label">Description</label>
                <textarea
                  value={uploadForm.description}
                  onChange={(e) => setUploadForm(prev => ({ ...prev, description: e.target.value }))}
                  className="form-input"
                  rows="3"
                  placeholder="Brief description of the report..."
                />
              </div>

              <div>
                <label className="form-label">Upload File</label>
                <div className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-6 text-center">
                  <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                  <input
                    type="file"
                    onChange={handleFileUpload}
                    accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
                    className="hidden"
                    id="file-upload"
                    required
                  />
                  <label htmlFor="file-upload" className="cursor-pointer">
                    <span className="text-blue-600 dark:text-blue-400 hover:underline">
                      Choose a file
                    </span>
                    <span className="text-gray-500 dark:text-gray-400"> or drag and drop</span>
                  </label>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
                    PDF, DOC, DOCX, JPG, PNG up to 10MB
                  </p>
                  {uploadForm.file && (
                    <p className="text-sm text-green-600 dark:text-green-400 mt-2">
                      Selected: {uploadForm.file.name}
                    </p>
                  )}
                </div>
              </div>

              <div className="flex gap-3">
                <button
                  type="submit"
                  className="btn btn-primary flex-1"
                >
                  Upload Report
                </button>
                <button
                  type="button"
                  onClick={() => setShowUploadModal(false)}
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

export default LabReports;
