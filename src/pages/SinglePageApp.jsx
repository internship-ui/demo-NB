import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

// Continuous Vertical Sections in sequential order
import Home from './Home';
import About from './About';
import Services from './Services';
import Portfolio from './Portfolio';
import Resources from './Resources';
import Careers from './Careers';
import Contact from './Contact';

export default function SinglePageApp({ initialSection = null }) {
  const location = useLocation();

  useEffect(() => {
    const targetId = initialSection || (location.hash ? location.hash.replace('#', '') : null);
    if (targetId && targetId !== 'home') {
      const timer = setTimeout(() => {
        const el = document.getElementById(targetId);
        if (el) {
          el.scrollIntoView({ behavior: 'smooth' });
        }
      }, 150);
      return () => clearTimeout(timer);
    } else if (targetId === 'home') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [location.hash, initialSection, location.pathname]);

  return (
    <div className="relative w-full overflow-hidden bg-brand-light">
      {/* 1. Home Section */}
      <section id="home" className="scroll-mt-20 relative">
        <Home />
      </section>

      {/* 2. About Us Section */}
      <section id="about" className="scroll-mt-20 relative border-t border-brand-silver/30">
        <About />
      </section>

      {/* 3. Services Section */}
      <section id="services" className="scroll-mt-20 relative border-t border-brand-silver/30">
        <Services />
      </section>

      {/* 4. Portfolio Section */}
      <section id="portfolio" className="scroll-mt-20 relative border-t border-brand-silver/30">
        <Portfolio showLoader={false} />
      </section>

      {/* 5. Resources Section */}
      <section id="resources" className="scroll-mt-20 relative border-t border-brand-silver/30">
        <Resources />
      </section>

      {/* 6. Careers Section */}
      <section id="careers" className="scroll-mt-20 relative border-t border-brand-silver/30">
        <Careers />
      </section>

      {/* 7. Contact Us Section */}
      <section id="contact" className="scroll-mt-20 relative border-t border-brand-silver/30">
        <Contact />
      </section>
    </div>
  );
}
