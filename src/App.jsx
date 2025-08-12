import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import { Toaster } from '@/components/ui/toaster';

import Home from '@/pages/Home';
import Contact from '@/pages/Contact';
import IrigasiTetes from '@/pages/IrigasiTetes';
import Hidroponik from '@/pages/Hidroponik';
import Berandairigasi from '@/pages/Berandairigasi';
// import Monitoring from '@/pages/Monitoring'; // kalau mau, silakan aktifkan

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-white text-green-800">
        <Routes>
          <Route path="/" element={<Home />} />
          {/* <Route path="/monitoring" element={<Monitoring />} /> */}
          <Route path="/monitoring/irigasi-tetes" element={<IrigasiTetes />} />
          <Route path="/monitoring/hidroponik" element={<Hidroponik />} />
          <Route path="/berandairigasi" element={<Berandairigasi />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
        <Toaster />
      </div>
    </Router>
  );
}

export default App;
