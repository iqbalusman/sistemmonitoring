import React from 'react';
import { motion } from 'framer-motion';
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer 
} from 'recharts';
import { TrendingUp, BarChart3 } from 'lucide-react';

const SensorChart = ({ data, isLive }) => {
  // Prepare chart data
  const chartData = data.slice(-20).map((item, index) => ({
    time: new Date(item.timestamp).toLocaleTimeString('id-ID', { 
      hour: '2-digit', 
      minute: '2-digit',
      second: '2-digit'
    }),
    temperature: item.temperature,
    humidity: item.humidity,
    index: index
  }));

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-4 border border-gray-200 rounded-lg shadow-lg">
          <p className="font-medium text-gray-800 mb-2">{`Waktu: ${label}`}</p>
          {payload.map((entry, index) => (
            <p key={index} style={{ color: entry.color }} className="text-sm">
              {entry.name}: {entry.value}
              {entry.dataKey === 'temperature' ? '°C' : '%'}
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="glass-effect p-8 rounded-2xl shadow-xl"
    >
      <div className="flex items-center space-x-3 mb-8">
        <div className="p-3 bg-purple-500 rounded-xl">
          <TrendingUp className="h-6 w-6 text-white" />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-gray-800">Grafik Real-time</h2>
          <p className="text-gray-600">Data 20 pembacaan terakhir</p>
        </div>
      </div>

      {chartData.length > 0 ? (
        <div className="chart-container p-6">
          <ResponsiveContainer width="100%" height={400}>
            <LineChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e0e7ff" />
              <XAxis 
                dataKey="time" 
                stroke="#6b7280"
                fontSize={12}
                angle={-45}
                textAnchor="end"
                height={80}
              />
              <YAxis 
                yAxisId="temp"
                orientation="left"
                stroke="#ef4444"
                fontSize={12}
                label={{ value: 'Suhu (°C)', angle: -90, position: 'insideLeft' }}
              />
              <YAxis 
                yAxisId="humidity"
                orientation="right"
                stroke="#3b82f6"
                fontSize={12}
                label={{ value: 'Kelembaban (%)', angle: 90, position: 'insideRight' }}
              />
              <Tooltip content={<CustomTooltip />} />
              <Legend />
              <Line
                yAxisId="temp"
                type="monotone"
                dataKey="temperature"
                stroke="#ef4444"
                strokeWidth={3}
                dot={{ fill: '#ef4444', strokeWidth: 2, r: 4 }}
                activeDot={{ r: 6, stroke: '#ef4444', strokeWidth: 2 }}
                name="Suhu"
              />
              <Line
                yAxisId="humidity"
                type="monotone"
                dataKey="humidity"
                stroke="#3b82f6"
                strokeWidth={3}
                dot={{ fill: '#3b82f6', strokeWidth: 2, r: 4 }}
                activeDot={{ r: 6, stroke: '#3b82f6', strokeWidth: 2 }}
                name="Kelembaban"
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      ) : (
        <div className="text-center py-12">
          <BarChart3 className="h-16 w-16 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-500 text-lg">{isLive ? 'Menunggu data dari ESP32...' : 'Menunggu data simulasi...'}</p>
          <p className="text-gray-400 text-sm">{isLive ? 'Pastikan perangkat Anda mengirim data ke Supabase.' : 'Data simulasi akan muncul sebentar lagi.'}</p>
        </div>
      )}

      {/* Chart Info */}
      <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="text-center p-4 bg-red-50 rounded-lg">
          <div className="text-2xl font-bold text-red-600">
            {chartData.length > 0 ? `${chartData[chartData.length - 1]?.temperature}°C` : '--'}
          </div>
          <div className="text-sm text-red-700">Suhu Terkini</div>
        </div>
        <div className="text-center p-4 bg-blue-50 rounded-lg">
          <div className="text-2xl font-bold text-blue-600">
            {chartData.length > 0 ? `${chartData[chartData.length - 1]?.humidity}%` : '--'}
          </div>
          <div className="text-sm text-blue-700">Kelembaban Terkini</div>
        </div>
        <div className="text-center p-4 bg-green-50 rounded-lg">
          <div className="text-2xl font-bold text-green-600">
            {chartData.length > 0 ? 
              Math.max(...chartData.map(d => d.temperature)).toFixed(1) : '--'}°C
          </div>
          <div className="text-sm text-green-700">Suhu Maksimal</div>
        </div>
        <div className="text-center p-4 bg-purple-50 rounded-lg">
          <div className="text-2xl font-bold text-purple-600">
            {chartData.length > 0 ? 
              Math.max(...chartData.map(d => d.humidity)).toFixed(1) : '--'}%
          </div>
          <div className="text-sm text-purple-700">Kelembaban Maksimal</div>
        </div>
      </div>
    </motion.div>
  );
};

export default SensorChart;