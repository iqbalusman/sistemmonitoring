import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import {
  Thermometer,
  Droplets,
  Wifi,
  WifiOff,
  Download,
  AlertTriangle,
  CheckCircle,
  Link as LinkIcon
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import SensorChart from '@/components/SensorChart';
import DataLogger from '@/components/DataLogger';
import { Link } from 'react-router-dom';
import { supabase } from '@/lib/customsupabaseClient'; // ✅ tambahkan ini

const Monitoring = () => {
  const [sensorData, setSensorData] = useState({
    temperature: 0,
    humidity: 0,
    timestamp: new Date(),
  });

  const [isConnected, setIsConnected] = useState(true);
  const [dataHistory, setDataHistory] = useState([]);
  const { toast } = useToast();
  const [isLive, setIsLive] = useState(true);

  useEffect(() => {
    const supabaseConfigured = true;
    setIsLive(supabaseConfigured);

    if (supabaseConfigured) {
      const interval = setInterval(async () => {
        const { data, error } = await supabase
          .from('sensor_data')
          .select('*')
          .order('created_at', { ascending: false })
          .limit(1);

        if (error) {
          console.error('Error fetching data from Supabase:', error.message);
          setIsConnected(false);
          return;
        }

        if (data && data.length > 0) {
          const latest = data[0];
          const formatted = {
            temperature: latest.temperature,
            humidity: latest.humidity,
            timestamp: new Date(latest.created_at),
          };

          setSensorData(formatted);
          setIsConnected(true);
          setDataHistory(prev => [...prev, formatted].slice(-50));
        }
      }, 5000);

      return () => clearInterval(interval);
    } else {
      const interval = setInterval(() => {
        const baseTemp = 25;
        const baseHumidity = 65;
        const tempVariation = (Math.random() - 0.5) * 4;
        const humidityVariation = (Math.random() - 0.5) * 10;

        const newData = {
          temperature: Math.round((baseTemp + tempVariation) * 10) / 10,
          humidity: Math.round((baseHumidity + humidityVariation) * 10) / 10,
          timestamp: new Date(),
          status: 'connected',
        };

        setSensorData(newData);
        setIsConnected(true);
        setDataHistory(prev => [...prev, newData].slice(-50));
      }, 2000);
      return () => clearInterval(interval);
    }
  }, [isLive]);

  const getTemperatureStatus = (temp) => {
    if (!isLive && temp === 0) return { status: 'idle', color: 'text-gray-600', bg: 'bg-gray-100' };
    if (temp < 20) return { status: 'low', color: 'text-blue-600', bg: 'bg-blue-100' };
    if (temp > 30) return { status: 'high', color: 'text-red-600', bg: 'bg-red-100' };
    return { status: 'optimal', color: 'text-green-600', bg: 'bg-green-100' };
  };

  const getHumidityStatus = (humidity) => {
    if (!isLive && humidity === 0) return { status: 'idle', color: 'text-gray-600', bg: 'bg-gray-100' };
    if (humidity < 50) return { status: 'low', color: 'text-orange-600', bg: 'bg-orange-100' };
    if (humidity > 80) return { status: 'high', color: 'text-blue-600', bg: 'bg-blue-100' };
    return { status: 'optimal', color: 'text-green-600', bg: 'bg-green-100' };
  };

  const handleExportData = () => {
    if (dataHistory.length === 0) {
      toast({
        title: "Tidak Ada Data",
        description: "Belum ada data untuk diekspor.",
        variant: "destructive"
      });
      return;
    }

    const csvContent = [
      'Timestamp,Temperature(°C),Humidity(%)',
      ...dataHistory.map(data =>
        `${new Date(data.timestamp).toISOString()},${data.temperature},${data.humidity}`
      )
    ].join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `hidroponik-data-${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    window.URL.revokeObjectURL(url);
    toast({
      title: "Data Berhasil Diekspor",
      description: "File CSV telah diunduh.",
    });
  };

  const tempStatus = getTemperatureStatus(sensorData.temperature);
  const humidityStatus = getHumidityStatus(sensorData.humidity);


  return (
    <>
      <Helmet>
        <title>Monitoring Real-time - HidroponikIoT</title>
        <meta name="description" content="Dashboard monitoring real-time untuk sistem hidroponik IoT. Pantau suhu dan kelembaban dari sensor DHT22 dengan grafik data logger." />
      </Helmet>

      <div className="pt-20 pb-12 min-h-screen bg-gradient-to-br from-green-50 to-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">Dashboard Monitoring</h1>
            <p className="text-xl text-gray-600 mb-8">
              {isLive ? 'Data real-time dari perangkat ESP32 Anda.' : 'Menampilkan data simulasi. Hubungkan perangkat Anda untuk data live.'}
            </p>
            <div className="flex items-center justify-center space-x-4 mb-6">
              <div className={`flex items-center space-x-2 px-4 py-2 rounded-full ${isConnected ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                {isConnected ? <Wifi className="h-4 w-4" /> : <WifiOff className="h-4 w-4" />}
                <span className="font-medium">
                  {isConnected ? 'Terhubung' : 'Terputus'}
                </span>
                {isLive ? <span className="text-xs font-bold">(LIVE)</span> : <span className="text-xs font-bold">(SIMULASI)</span>}
              </div>
              <Button onClick={handleExportData} variant="outline" size="sm" className="border-blue-500 text-blue-700 hover:bg-blue-50">
                <Download className="h-4 w-4 mr-2" />
                Export CSV
              </Button>
            </div>
             {!isLive && (
              <motion.div 
                initial={{ opacity: 0, y: 10 }} 
                animate={{ opacity: 1, y: 0 }} 
                className="glass-effect p-4 rounded-xl max-w-2xl mx-auto"
              >
                <div className="flex items-center justify-center">
                  <LinkIcon className="h-5 w-5 mr-3 text-indigo-600"/>
                  <p className="text-gray-700">
                    Ingin melihat data dari perangkat Anda? Ikuti {' '}
                    <Link to="/connection-guide" className="font-bold text-indigo-600 hover:underline">
                      Panduan Koneksi
                    </Link>
                    .
                  </p>
                </div>
              </motion.div>
            )}
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8 mb-12">
            <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6, delay: 0.1 }} className="glass-effect p-8 rounded-2xl shadow-xl">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center space-x-3">
                  <div className="p-3 bg-red-500 rounded-xl"><Thermometer className="h-8 w-8 text-white" /></div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-800">Suhu</h3>
                    <p className="text-gray-600">Sensor DHT22</p>
                  </div>
                </div>
                <div className={`px-3 py-1 rounded-full ${tempStatus.bg}`}>
                  <span className={`text-sm font-medium ${tempStatus.color}`}>
                    {tempStatus.status === 'optimal' ? 'Optimal' : tempStatus.status === 'high' ? 'Tinggi' : tempStatus.status === 'low' ? 'Rendah' : 'N/A'}
                  </span>
                </div>
              </div>
              <div className="text-center">
                <div className="text-5xl font-bold text-gray-800 mb-2">
                  {sensorData.temperature.toFixed(1)}°C
                </div>
                <div className="text-gray-600">
                  {isLive ? `Diperbarui: ${sensorData.timestamp.toLocaleTimeString('id-ID')}` : 'Menunggu data live...'}
                </div>
              </div>
              <div className="mt-6 p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center space-x-2 text-sm text-gray-600">
                  {tempStatus.status === 'optimal' ? <CheckCircle className="h-4 w-4 text-green-500" /> : <AlertTriangle className="h-4 w-4 text-orange-500" />}
                  <span>Range optimal: 20-30°C</span>
                </div>
              </div>
            </motion.div>

            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6, delay: 0.2 }} className="glass-effect p-8 rounded-2xl shadow-xl">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center space-x-3">
                  <div className="p-3 bg-blue-500 rounded-xl"><Droplets className="h-8 w-8 text-white" /></div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-800">Kelembaban</h3>
                    <p className="text-gray-600">Sensor DHT22</p>
                  </div>
                </div>
                <div className={`px-3 py-1 rounded-full ${humidityStatus.bg}`}>
                  <span className={`text-sm font-medium ${humidityStatus.color}`}>
                    {humidityStatus.status === 'optimal' ? 'Optimal' : humidityStatus.status === 'high' ? 'Tinggi' : humidityStatus.status === 'low' ? 'Rendah' : 'N/A'}
                  </span>
                </div>
              </div>
              <div className="text-center">
                <div className="text-5xl font-bold text-gray-800 mb-2">
                  {sensorData.humidity.toFixed(1)}%
                </div>
                <div className="text-gray-600">
                   {isLive ? `Diperbarui: ${sensorData.timestamp.toLocaleTimeString('id-ID')}` : 'Menunggu data live...'}
                </div>
              </div>
              <div className="mt-6 p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center space-x-2 text-sm text-gray-600">
                  {humidityStatus.status === 'optimal' ? <CheckCircle className="h-4 w-4 text-green-500" /> : <AlertTriangle className="h-4 w-4 text-orange-500" />}
                  <span>Range optimal: 50-80%</span>
                </div>
              </div>
            </motion.div>
          </div>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.3 }} className="space-y-8">
            <SensorChart data={dataHistory} isLive={isLive} />
            <DataLogger data={dataHistory} isLive={isLive} />
          </motion.div>
        </div>
      </div>
    </>
  );
};

export default Monitoring;