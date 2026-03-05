import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { UserProvider } from './context/UserContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Services from './pages/Services';
import About from './pages/About';
import Contact from './pages/Contact';
import Booking from './pages/Booking';
import AdminDashboard from './pages/AdminDashboard';
import Login from './pages/Login';

import ProtectedRoute from './components/ProtectedRoute';
import { Toaster } from 'react-hot-toast';
import WhatsAppButton from './components/WhatsAppButton';
import Training from './pages/Training';

import Gallery from './pages/Gallery';

function App() {
  return (
    <Router>
      <UserProvider>
        <div className="flex flex-col min-h-screen bg-rose-50/30">
          <Navbar />
          <main className="flex-grow">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/services" element={<Services />} />
              <Route path="/training" element={<Training />} />
              <Route path="/gallery" element={<Gallery />} />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/booking" element={<Booking />} />
              <Route path="/admin/login" element={<Login />} />
              <Route
                path="/admin"
                element={
                  <ProtectedRoute>
                    <AdminDashboard />
                  </ProtectedRoute>
                }
              />

            </Routes>
          </main>
          <WhatsAppButton />
          <Footer />
          <Toaster position="bottom-right" />
        </div>
      </UserProvider>
    </Router>
  );
}

export default App;
