import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';

// Components
import Navbar from './components/common/Navbar';
import Footer from './components/common/Footer';
import ScrollToTop from './components/common/ScrollToTop';
import Toast from './components/common/Toast';
import LoadingScreen from './components/common/LoadingScreen';
import CustomCursor from './components/common/CustomCursor';
import PageJourneyLink from './components/common/PageJourneyLink';

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

// Animated wrapper for routes with bidirectional vertical transitions
function AnimatedRoutes() {
  const location = useLocation();
  const direction = location.state?.direction || 'down';

  const variants = {
    initial: (dir) => ({
      opacity: 0,
      y: dir === 'down' ? 50 : -50,
    }),
    animate: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.35,
        ease: [0.22, 1, 0.36, 1],
      },
    },
    exit: (dir) => ({
      opacity: 0,
      y: dir === 'down' ? -50 : 50,
      transition: {
        duration: 0.25,
        ease: [0.22, 1, 0.36, 1],
      },
    }),
  };

  return (
    <AnimatePresence mode="wait" custom={direction}>
      <motion.main
        key={location.pathname}
        custom={direction}
        variants={variants}
        initial="initial"
        animate="animate"
        exit="exit"
        className="flex-1"
      >
        <Routes location={location} key={location.pathname}>
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
              <div className="min-h-[70vh] flex flex-col items-center justify-center text-center px-4 pt-28">
                <span className="text-6xl font-extrabold text-brand-yellow font-heading mb-4">404</span>
                <h1 className="text-2xl sm:text-3xl font-bold text-white mb-3">Page Not Found</h1>
                <p className="text-sm text-slate-300 max-w-md mb-8">
                  The page you requested is not available. Please return to the homepage or explore our services catalog.
                </p>
                <a
                  href="/"
                  className="px-6 py-3 rounded-xl bg-brand-yellow text-brand-navy font-bold text-xs uppercase tracking-wider hover:bg-brand-yellow-hover transition-colors"
                >
                  Return to Homepage
                </a>
              </div>
            }
          />
        </Routes>
      </motion.main>
    </AnimatePresence>
  );
}

export default function App() {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <NotificationProvider>
      <Router>
        <AnimatePresence>
          {isLoading && (
            <LoadingScreen onFinish={() => setIsLoading(false)} />
          )}
        </AnimatePresence>

        <div className="flex flex-col min-h-screen bg-brand-navy text-slate-100 selection:bg-brand-yellow selection:text-brand-navy">
          <CustomCursor />
          <ScrollToTop />
          <Navbar />
          <AnimatedRoutes />
          <PageJourneyLink />
          <Footer />
          <Toast />
        </div>
      </Router>
    </NotificationProvider>
  );
}
