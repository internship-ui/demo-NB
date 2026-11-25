import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';

// Components
import Navbar from './components/common/Navbar';
import Footer from './components/common/Footer';
import ScrollToTop from './components/common/ScrollToTop';
import Toast from './components/common/Toast';
import PageJourneyLink from './components/common/PageJourneyLink';
import CustomCursor from './components/common/CustomCursor';

// Pages
import Home from './pages/Home';
import About from './pages/About';
import Services from './pages/Services';
import ServiceDetail from './pages/ServiceDetail';
import Portfolio from './pages/Portfolio';
import Resources from './pages/Resources';
import Careers from './pages/Careers';
import Contact from './pages/Contact';

// Context
import { NotificationProvider } from './context/NotificationContext';

export default function App() {
  return (
    <NotificationProvider>
      <Router basename={import.meta.env.BASE_URL}>
        <CustomCursor />
        <div className="flex flex-col min-h-screen bg-brand-light text-slate-700 selection:bg-brand-royal/20 selection:text-brand-navy">
          <ScrollToTop />
          <Navbar />
          
          <main className="flex-1">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/services" element={<Services />} />
              <Route path="/services/:serviceId" element={<ServiceDetail />} />
              <Route path="/portfolio" element={<Portfolio />} />
              <Route path="/resources" element={<Resources />} />
              <Route path="/careers" element={<Careers />} />
              <Route path="/contact" element={<Contact />} />

              {/* Catch-all 404 route */}
              <Route
                path="*"
                element={
                  <div className="min-h-[70vh] flex flex-col items-center justify-center text-center px-4 pt-28 bg-brand-light">
                    <span className="text-6xl font-extrabold text-brand-royal font-heading mb-4">404</span>
                    <h1 className="text-2xl sm:text-3xl font-bold text-brand-navy mb-3">Page Not Found</h1>
                    <p className="text-sm text-slate-600 max-w-md mb-8">
                      The page you requested is not available. Please return to the homepage or explore our services catalog.
                    </p>
                    <Link
                      to="/"
                      className="px-6 py-3 rounded-xl bg-brand-royal text-white font-bold text-xs uppercase tracking-wider hover:bg-brand-navy shadow-md transition-colors"
                    >
                      Return to Homepage
                    </Link>
                  </div>
                }
              />
            </Routes>
          </main>

          <PageJourneyLink />
          <Footer />
          <Toast />
        </div>
      </Router>
    </NotificationProvider>
  );
}
