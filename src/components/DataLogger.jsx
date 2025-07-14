import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Database, 
  Calendar, 
  Filter, 
  Search,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';
import { Button } from '@/components/ui/button';

const DataLogger = ({ data, isLive }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const itemsPerPage = 10;

  // Filter data based on search and status
  const filteredData = data.filter(item => {
    const timestamp = new Date(item.timestamp);
    const matchesSearch = searchTerm === '' || 
      timestamp.toLocaleString('id-ID').toLowerCase().includes(searchTerm.toLowerCase());
    
    // Status is currently simulated or will come from Supabase. For now, all are 'connected' in simulation.
    const status = item.status || 'connected';
    const matchesStatus = filterStatus === 'all' || status === filterStatus;
    
    return matchesSearch && matchesStatus;
  });

  // Pagination
  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentData = filteredData.slice(startIndex, endIndex).sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));


  const getStatusBadge = (status) => {
    if (status === 'connected') {
      return (
        <span className="px-2 py-1 bg-green-100 text-green-700 rounded-full text-xs font-medium">
          Terkirim
        </span>
      );
    }
    return (
      <span className="px-2 py-1 bg-green-100 text-gray-700 rounded-full text-xs font-medium">
        Sukses
      </span>
    );
  };

  const getTemperatureColor = (temp) => {
    if (temp < 20) return 'text-blue-600';
    if (temp > 30) return 'text-red-600';
    return 'text-green-600';
  };

  const getHumidityColor = (humidity) => {
    if (humidity < 50) return 'text-orange-600';
    if (humidity > 80) return 'text-blue-600';
    return 'text-green-600';
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="glass-effect p-8 rounded-2xl shadow-xl"
    >
      <div className="flex items-center space-x-3 mb-8">
        <div className="p-3 bg-indigo-500 rounded-xl">
          <Database className="h-6 w-6 text-white" />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-gray-800">Data Logger</h2>
          <p className="text-gray-600">Riwayat pembacaan sensor DHT22</p>
        </div>
      </div>

      {/* Filters and Search */}
      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <div className="flex-1">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <input
              type="text"
              placeholder="Cari berdasarkan waktu..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            />
          </div>
        </div>
      </div>

      {/* Data Table */}
      {currentData.length > 0 ? (
        <>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-3 px-4 font-semibold text-gray-700">
                    <div className="flex items-center space-x-2">
                      <Calendar className="h-4 w-4" />
                      <span>Waktu</span>
                    </div>
                  </th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-700">Suhu (°C)</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-700">Kelembaban (%)</th>
                  {isLive && <th className="text-left py-3 px-4 font-semibold text-gray-700">Status</th>}
                </tr>
              </thead>
              <tbody>
                {currentData.map((item, index) => (
                  <motion.tr
                    key={startIndex + index}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.3, delay: index * 0.05 }}
                    className="border-b border-gray-100 hover:bg-gray-50 transition-colors"
                  >
                    <td className="py-3 px-4 text-gray-600">
                      {new Date(item.timestamp).toLocaleString('id-ID')}
                    </td>
                    <td className={`py-3 px-4 font-semibold ${getTemperatureColor(item.temperature)}`}>
                      {item.temperature.toFixed(1)}°C
                    </td>
                    <td className={`py-3 px-4 font-semibold ${getHumidityColor(item.humidity)}`}>
                      {item.humidity.toFixed(1)}%
                    </td>
                    {isLive && <td className="py-3 px-4">{getStatusBadge(item.status)}</td>}
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex items-center justify-between mt-6">
              <div className="text-sm text-gray-600">
                Menampilkan {startIndex + 1}-{Math.min(endIndex, filteredData.length)} dari {filteredData.length} data
              </div>
              
              <div className="flex items-center space-x-2">
                <Button variant="outline" size="sm" onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))} disabled={currentPage === 1} className="border-gray-300">
                  <ChevronLeft className="h-4 w-4" />
                </Button>
                
                <span className="text-sm font-medium text-gray-700">
                  Hal {currentPage} dari {totalPages}
                </span>
                
                <Button variant="outline" size="sm" onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))} disabled={currentPage === totalPages} className="border-gray-300">
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
            </div>
          )}
        </>
      ) : (
        <div className="text-center py-12">
          <Database className="h-16 w-16 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-500 text-lg">
            {data.length === 0 ? 'Belum ada data' : 'Tidak ada data yang sesuai filter'}
          </p>
          <p className="text-gray-400 text-sm">
            {isLive ? 'Pastikan perangkat Anda mengirim data.' : 'Data simulasi akan muncul di sini.'}
          </p>
        </div>
      )}
    </motion.div>
  );
};

export default DataLogger;