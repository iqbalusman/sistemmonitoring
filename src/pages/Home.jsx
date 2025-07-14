
import React from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { 
  Thermometer, 
  Droplets, 
  Wifi, 
  Smartphone, 
  BarChart3, 
  Shield,
  ArrowRight,
  Leaf,
  Zap,
  Globe
} from 'lucide-react';
import { Button } from '@/components/ui/button';

const Home = () => {
  const features = [
    {
      icon: Thermometer,
      title: 'Monitoring Suhu',
      description: 'Pantau suhu lingkungan secara real-time dengan sensor DHT22 yang akurat'
    },
    {
      icon: Droplets,
      title: 'Kelembaban Udara',
      description: 'Kontrol kelembaban optimal untuk pertumbuhan tanaman hidroponik'
    },
    {
      icon: Wifi,
      title: 'Konektivitas IoT',
      description: 'Terhubung melalui ESP32 dengan koneksi WiFi yang stabil'
    },
    {
      icon: BarChart3,
      title: 'Data Logger',
      description: 'Simpan dan analisis data historis untuk optimasi pertanian'
    },
    {
      icon: Smartphone,
      title: 'Akses Mobile',
      description: 'Interface responsif yang dapat diakses dari berbagai perangkat'
    },
    {
      icon: Shield,
      title: 'Sistem Reliable',
      description: 'Monitoring 24/7 dengan sistem yang handal dan terpercaya'
    }
  ];


  
  const stats = [
    { number: '24/7', label: 'Monitoring' },
    { number: '±0.5°C', label: 'Akurasi Suhu' },
    { number: '±2%', label: 'Akurasi Kelembaban' },
    { number: '1s', label: 'Update Rate' }
  ];

  return (
    <>
      <Helmet>
        <title>HidroponikIoT - Sistem Monitoring Pertanian Hidroponik Berbasis IoT</title>
        <meta name="description" content="Sistem monitoring profesional untuk pertanian hidroponik dengan sensor DHT22 dan mikrokontroler ESP32. Pantau suhu dan kelembaban secara real-time." />
      </Helmet>

      <div className="pt-16">
        {/* Hero Section */}
        <section className="relative min-h-screen flex items-center justify-center overflow-hidden nature-pattern">
          <div className="absolute inset-0 bg-gradient-to-br from-green-50/80 to-blue-50/80"></div>
          
          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="space-y-8"
            >
              <div className="flex justify-center mb-8">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                  className="p-6 bg-gradient-to-br from-green-400 to-green-600 rounded-full shadow-2xl"
                >
                  <Leaf className="h-16 w-16 text-white" />
                </motion.div>
              </div>

              <h1 className="text-5xl md:text-7xl font-bold text-gray-800 leading-tight">
                Sistem Monitoring
                <span className="block bg-gradient-to-r from-blue-500 to-purple-600 text-white px-4 py-2 roundedblock gradient-bg bg-clip-text text-transparent">
                  Hidroponik IoT
                </span>
              </h1>

              <p className="text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
                Pantau suhu dan kelembaban tanaman hidroponik Anda secara real-time dengan 
                teknologi sensor DHT22 dan mikrokontroler YD-ESP32-23
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <Link to="/monitoring">
                  <Button size="lg" className="gradient-bg text-white px-8 py-4 text-lg font-semibold shadow-xl hover:shadow-2xl transition-all duration-300 group">
                    Mulai Monitoring
                    <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </Link>
                <Link to="/contact">
                  <Button variant="outline" size="lg" className="px-8 py-4 text-lg font-semibold border-2 border-green-500 text-green-700 hover:bg-green-50">
                    Hubungi Kami
                  </Button>
                </Link>
              </div>
            </motion.div>
          </div>

          {/* Floating Elements */}
          <div className="absolute top-20 left-10 floating">
            <div className="p-3 bg-green-100 rounded-full shadow-lg">
              <Thermometer className="h-6 w-6 text-green-600" />
            </div>
          </div>
          <div className="absolute top-40 right-20 floating" style={{ animationDelay: '1s' }}>
            <div className="p-3 bg-blue-100 rounded-full shadow-lg">
              <Droplets className="h-6 w-6 text-blue-600" />
            </div>
          </div>
          <div className="absolute bottom-40 left-20 floating" style={{ animationDelay: '2s' }}>
            <div className="p-3 bg-purple-100 rounded-full shadow-lg">
              <Wifi className="h-6 w-6 text-purple-600" />
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {stats.map((stat, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="text-center"
                >
                  <div className="text-4xl md:text-5xl font-bold gradient-bg bg-clip-text text-white mb-2">
                    {stat.number}
                  </div>
                  <div className="text-gray-600 font-medium">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-20 bg-gradient-to-br from-green-50 to-blue-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6">
                Fitur Unggulan
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Teknologi canggih untuk monitoring pertanian hidroponik yang efisien dan akurat
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {features.map((feature, index) => {
                const Icon = feature.icon;
                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    whileHover={{ y: -5 }}
                    className="glass-effect p-8 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300"
                  >
                    <div className="p-4 bg-green-500 rounded-xl w-fit mb-6">
                      <Icon className="h-8 w-8 text-white" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-800 mb-4">{feature.title}</h3>
                    <p className="text-gray-600 leading-relaxed">{feature.description}</p>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Technology Section */}
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
              >
                <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6">
                  Teknologi IoT Terdepan
                </h2>
                <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                  Menggunakan sensor DHT22 yang presisi dan mikrokontroler YD-ESP32-23 
                  untuk konektivitas yang handal dan monitoring yang akurat.
                </p>
                
                <div className="space-y-6">
                  <div className="flex items-center space-x-4">
                    <div className="p-3 bg-green-100 rounded-lg">
                      <Zap className="h-6 w-6 text-green-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-800">Sensor DHT22</h3>
                      <p className="text-gray-600">Akurasi tinggi untuk suhu dan kelembaban</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-4">
                    <div className="p-3 bg-blue-100 rounded-lg">
                      <Globe className="h-6 w-6 text-blue-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-800">YD-ESP32-23</h3>
                      <p className="text-gray-600">Mikrokontroler dengan WiFi terintegrasi</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-4">
                    <div className="p-3 bg-purple-100 rounded-lg">
                      <BarChart3 className="h-6 w-6 text-purple-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-800">Real-time Dashboard</h3>
                      <p className="text-gray-600">Interface modern untuk monitoring data</p>
                    </div>
                  </div>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                className="relative"
              >
                <div className="relative z-10">
                  <img  
                    alt="Sistem hidroponik IoT dengan sensor dan monitoring"
                    className="w-full h-96 object-cover rounded-2xl shadow-2xl"
                   src="https://images.unsplash.com/photo-1614846027182-cecfee3a427b" />
                </div>
                <div className="absolute -top-4 -right-4 w-full h-full bg-gradient-to-br from-green-400 to-blue-400 rounded-2xl -z-10"></div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 gradient-bg">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="space-y-8"
            >
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
                Siap Memulai Monitoring?
              </h2>
              <p className="text-xl text-green-100 mb-8 leading-relaxed">
                Bergabunglah dengan revolusi pertanian digital dan tingkatkan 
                produktivitas hidroponik Anda dengan teknologi IoT terdepan.
              </p>
              <Link to="/monitoring">
                <Button 
                  size="lg" 
                  variant="secondary"
                  className="px-8 py-4 text-lg font-semibold bg-white text-green-700 hover:bg-green-50 shadow-xl hover:shadow-2xl transition-all duration-300"
                >
                  Mulai Sekarang
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
            </motion.div>
          </div>
        </section>
      </div>
    </>
  );
};

export default Home;
