import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '../contexts/ThemeContext';
import { useAuth } from '../contexts/AuthContext';
import { 
  Heart, 
  Activity, 
  Thermometer, 
  Weight, 
  Plus, 
  Search, 
  Filter,
  Download,
  Share2,
  Edit,
  Trash2,
  Eye,
  TrendingUp,
  TrendingDown
} from 'lucide-react';
import toast from 'react-hot-toast';

const HealthRecords = () => {
  const { isDarkMode } = useTheme();
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('overview');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [showAddModal, setShowAddModal] = useState(false);
  const [selectedRecord, setSelectedRecord] = useState(null);

  // Mock data for health records
  const [healthRecords] = useState([
    {
      id: 1,
      type: 'Blood Pressure',
      value: '120/80',
      unit: 'mmHg',
      date: '2024-01-15',
      status: 'normal',
      trend: 'stable',
      notes: 'Regular checkup - within normal range'
    },
    {
      id: 2,
      type: 'Heart Rate',
      value: '72',
      unit: 'bpm',
      date: '2024-01-15',
      status: 'normal',
      trend: 'stable',
      notes: 'Resting heart rate - good'
    },
    {
      id: 3,
      type: 'Blood Sugar',
      value: '95',
      unit: 'mg/dL',
      date: '2024-01-10',
      status: 'normal',
      trend: 'improving',
      notes: 'Fasting glucose - improved from last reading'
    },
    {
      id: 4,
      type: 'Weight',
      value: '70',
      unit: 'kg',
      date: '2024-01-08',
      status: 'normal',
      trend: 'decreasing',
      notes: 'Lost 2kg this month - good progress'
    },
    {
      id: 5,
      type: 'Temperature',
      value: '98.6',
      unit: '°F',
      date: '2024-01-05',
      status: 'normal',
      trend: 'stable',
      notes: 'Normal body temperature'
    }
  ]);

  const filteredRecords = healthRecords.filter(record => {
    const matchesSearch = record.type.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = selectedFilter === 'all' || record.status === selectedFilter;
    
    return matchesSearch && matchesFilter;
  });

  const getStatusColor = (status) => {
    switch (status) {
      case 'normal': return 'text-green-600 bg-green-100 dark:bg-green-900';
      case 'elevated': return 'text-yellow-600 bg-yellow-100 dark:bg-yellow-900';
      case 'high': return 'text-red-600 bg-red-100 dark:bg-red-900';
      case 'low': return 'text-blue-600 bg-blue-100 dark:bg-blue-900';
      default: return 'text-gray-600 bg-gray-100 dark:bg-gray-700';
    }
  };

  const getTrendIcon = (trend) => {
    switch (trend) {
      case 'improving': return <TrendingUp className="w-4 h-4 text-green-600" />;
      case 'decreasing': return <TrendingDown className="w-4 h-4 text-blue-600" />;
      case 'stable': return <Activity className="w-4 h-4 text-gray-600" />;
      default: return <Activity className="w-4 h-4 text-gray-600" />;
    }
  };

  const getTypeIcon = (type) => {
    switch (type) {
      case 'Blood Pressure': return <Heart className="w-5 h-5" />;
      case 'Heart Rate': return <Activity className="w-5 h-5" />;
      case 'Blood Sugar': return <Thermometer className="w-5 h-5" />;
      case 'Weight': return <Weight className="w-5 h-5" />;
      case 'Temperature': return <Thermometer className="w-5 h-5" />;
      default: return <Activity className="w-5 h-5" />;
    }
  };

  const handleShare = (record) => {
    const text = `${record.type}: ${record.value} ${record.unit} - ${record.date}`;
    const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(text)}`;
    window.open(whatsappUrl, '_blank');
    toast.success('Sharing health record...');
  };

  const handleDownload = (record) => {
    toast.success('Downloading health record...');
  };

  const handleViewDetails = (record) => {
    setSelectedRecord(record);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-100 dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-6xl mx-auto"
        >
          {/* Header */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                Health Records
              </h1>
              <p className="text-gray-600 dark:text-gray-300">
                Track and monitor your vital signs and health metrics
              </p>
            </div>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setShowAddModal(true)}
              className="bg-primary-600 hover:bg-primary-700 text-white px-6 py-3 rounded-lg flex items-center gap-2 transition-colors"
            >
              <Plus size={20} />
              Add Record
            </motion.button>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <motion.div
              whileHover={{ y: -5 }}
              className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Total Records</p>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">{healthRecords.length}</p>
                </div>
                <div className="p-3 bg-blue-100 dark:bg-blue-900 rounded-lg">
                  <Activity className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                </div>
              </div>
            </motion.div>

            <motion.div
              whileHover={{ y: -5 }}
              className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Normal</p>
                  <p className="text-2xl font-bold text-green-600">{healthRecords.filter(r => r.status === 'normal').length}</p>
                </div>
                <div className="p-3 bg-green-100 dark:bg-green-900 rounded-lg">
                  <Heart className="w-6 h-6 text-green-600 dark:text-green-400" />
                </div>
              </div>
            </motion.div>

            <motion.div
              whileHover={{ y: -5 }}
              className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">This Month</p>
                  <p className="text-2xl font-bold text-purple-600">{healthRecords.filter(r => new Date(r.date).getMonth() === new Date().getMonth()).length}</p>
                </div>
                <div className="p-3 bg-purple-100 dark:bg-purple-900 rounded-lg">
                  <TrendingUp className="w-6 h-6 text-purple-600 dark:text-purple-400" />
                </div>
              </div>
            </motion.div>

            <motion.div
              whileHover={{ y: -5 }}
              className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Improving</p>
                  <p className="text-2xl font-bold text-blue-600">{healthRecords.filter(r => r.trend === 'improving').length}</p>
                </div>
                <div className="p-3 bg-blue-100 dark:bg-blue-900 rounded-lg">
                  <TrendingUp className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                </div>
              </div>
            </motion.div>
          </div>

          {/* Search and Filters */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 mb-8">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                  <input
                    type="text"
                    placeholder="Search health records..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  />
                </div>
              </div>
              <div className="flex gap-4">
                <select
                  value={selectedFilter}
                  onChange={(e) => setSelectedFilter(e.target.value)}
                  className="px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                >
                  <option value="all">All Status</option>
                  <option value="normal">Normal</option>
                  <option value="elevated">Elevated</option>
                  <option value="high">High</option>
                  <option value="low">Low</option>
                </select>
              </div>
            </div>

            {/* Tabs */}
            <div className="flex gap-4 mt-6">
              {['overview', 'vitals', 'lab-results', 'medications'].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                    activeTab === tab
                      ? 'bg-primary-600 text-white'
                      : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                  }`}
                >
                  {tab.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
                </button>
              ))}
            </div>
          </div>

          {/* Health Records List */}
          <div className="grid gap-6">
            {filteredRecords.map((record) => (
              <motion.div
                key={record.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                whileHover={{ y: -2 }}
                className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6"
              >
                <div className="flex flex-col lg:flex-row justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-blue-100 dark:bg-blue-900 rounded-lg">
                          {getTypeIcon(record.type)}
                        </div>
                        <div>
                          <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                            {record.type}
                          </h3>
                          <div className="flex items-center gap-4 text-sm text-gray-500 dark:text-gray-400">
                            <span>{record.date}</span>
                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(record.status)}`}>
                              {record.status}
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        {getTrendIcon(record.trend)}
                        <span className="text-sm text-gray-500 dark:text-gray-400">{record.trend}</span>
                      </div>
                    </div>

                    <div className="mb-4">
                      <div className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                        {record.value} <span className="text-lg text-gray-500 dark:text-gray-400">{record.unit}</span>
                      </div>
                      {record.notes && (
                        <p className="text-gray-600 dark:text-gray-300">{record.notes}</p>
                      )}
                    </div>
                  </div>

                  <div className="flex flex-col gap-2">
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => handleViewDetails(record)}
                      className="flex items-center gap-2 px-4 py-2 bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 rounded-lg hover:bg-blue-200 dark:hover:bg-blue-800 transition-colors"
                    >
                      <Eye size={16} />
                      View Details
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => handleDownload(record)}
                      className="flex items-center gap-2 px-4 py-2 bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300 rounded-lg hover:bg-green-200 dark:hover:bg-green-800 transition-colors"
                    >
                      <Download size={16} />
                      Download
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => handleShare(record)}
                      className="flex items-center gap-2 px-4 py-2 bg-purple-100 dark:bg-purple-900 text-purple-700 dark:text-purple-300 rounded-lg hover:bg-purple-200 dark:hover:bg-purple-800 transition-colors"
                    >
                      <Share2 size={16} />
                      Share
                    </motion.button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {filteredRecords.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-12"
            >
              <Activity className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                No health records found
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                {searchTerm ? 'Try adjusting your search terms.' : 'Add your first health record to get started.'}
              </p>
            </motion.div>
          )}
        </motion.div>
      </div>

      {/* Health Record Details Modal */}
      {selectedRecord && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="bg-white dark:bg-gray-800 rounded-xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
          >
            <div className="p-6">
              <div className="flex justify-between items-start mb-6">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                  Health Record Details
                </h2>
                <button
                  onClick={() => setSelectedRecord(null)}
                  className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                >
                  ✕
                </button>
              </div>

              <div className="space-y-6">
                <div className="bg-gray-50 dark:bg-gray-700 p-6 rounded-lg text-center">
                  <div className="text-4xl font-bold text-gray-900 dark:text-white mb-2">
                    {selectedRecord.value} <span className="text-xl text-gray-500 dark:text-gray-400">{selectedRecord.unit}</span>
                  </div>
                  <div className="text-lg font-medium text-gray-700 dark:text-gray-300">{selectedRecord.type}</div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
                    <div className="text-sm text-gray-500 dark:text-gray-400">Status</div>
                    <div className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(selectedRecord.status)}`}>
                      {selectedRecord.status}
                    </div>
                  </div>
                  <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
                    <div className="text-sm text-gray-500 dark:text-gray-400">Trend</div>
                    <div className="flex items-center gap-1">
                      {getTrendIcon(selectedRecord.trend)}
                      <span className="text-sm font-medium">{selectedRecord.trend}</span>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                    Date Recorded
                  </h3>
                  <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
                    <p className="text-gray-700 dark:text-gray-300">{new Date(selectedRecord.date).toLocaleDateString()}</p>
                  </div>
                </div>

                {selectedRecord.notes && (
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                      Notes
                    </h3>
                    <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
                      <p className="text-gray-700 dark:text-gray-300">{selectedRecord.notes}</p>
                    </div>
                  </div>
                )}

                <div className="flex gap-3 pt-4">
                  <button
                    onClick={() => handleDownload(selectedRecord)}
                    className="flex-1 bg-primary-600 hover:bg-primary-700 text-white py-3 rounded-lg font-medium transition-colors"
                  >
                    Download PDF
                  </button>
                  <button
                    onClick={() => handleShare(selectedRecord)}
                    className="flex-1 bg-green-600 hover:bg-green-700 text-white py-3 rounded-lg font-medium transition-colors"
                  >
                    Share
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default HealthRecords;
