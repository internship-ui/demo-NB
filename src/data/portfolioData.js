import { getAssetUrl } from '../utils/assetPath';

// =======================================================================
// 1. CLIENT PORTFOLIO (External Client Partnerships & Services)
// =======================================================================
export const clientPortfolioData = [
  {
    id: 'dr-madhuram-chowdry',
    title: 'Dr. Madhuram Chowdry',
    category: 'Healthcare',
    clientDomain: 'Healthcare',
    badge: 'HEALTHCARE',
    image: getAssetUrl('/portfolio/dr-madhuram-card.png'),
    bannerImage: getAssetUrl('/portfolio/dr-madhuram-banner.png'),
    logoImage: getAssetUrl('/portfolio/dr-madhuram-logo.png'),
    shortDesc: 'Website and social media support for a trusted orthopedic care specialist.',
    fullDesc: 'Comprehensive website maintenance and organic social media marketing management for Dr. Madhuram Chowdry, a trusted Knee Replacement Surgeon and Orthopedic Specialist practicing at AR Hospital, New Kantharaj Urs Road, Mysuru.',
    challenge: 'Establishing a credible, high-visibility digital presence for specialized knee replacement and orthopedic surgeries, while making appointment inquiries seamless for regional patients.',
    solution: 'Engineered continuous website maintenance with mobile-first performance, localized medical SEO, and strategic social media campaigns spotlighting surgical excellence and patient recovery journeys.',
    results: [
      '3x increase in patient direct consultation inquiries through digital channels',
      '99.9% website uptime with lightning-fast mobile responsiveness',
      'Consistent organic follower growth and high engagement in Mysuru'
    ],
    tags: ['Website Maintenance', 'Social Media Management'],
    year: '2025',
    link: 'https://www.drmadhuramchowdryortho.com'
  },
  {
    id: 'jisha-prime-ortho-care',
    title: 'Jisha Prime Ortho Care',
    category: 'Healthcare',
    clientDomain: 'Healthcare',
    badge: 'HEALTHCARE',
    image: getAssetUrl('/portfolio/jisha-prime-card.png'),
    bannerImage: getAssetUrl('/portfolio/jisha-prime-banner.png'),
    logoImage: getAssetUrl('/portfolio/jisha-prime-logo.png'),
    shortDesc: 'Digital presence management for an orthopedic and spine care brand.',
    fullDesc: 'Complete digital presence and strategic brand management for Jisha Prime Orthopaedic and Spine Care, led by National Board Accredited minimally invasive and endoscopic spine surgeons at Sayyaji Rao Road, Mandi Mohalla, Mysore.',
    challenge: 'Educating regional patients on the advantages of minimally invasive endoscopic spine surgery and driving qualified appointment bookings through digital touchpoints.',
    solution: 'Implemented proactive website support, structured WhatsApp appointment dispatch, and educational social media content breaking down spine wellness, treatments, and patient case studies.',
    results: [
      '45% uplift in online appointment consultations within first quarter',
      'Top-tier local search visibility across Mysore for endoscopic spine care',
      'Frictionless multi-channel patient interaction via automated WhatsApp routing'
    ],
    tags: ['Website Maintenance', 'Social Media Management'],
    year: '2025',
    link: '#case-study'
  },
  {
    id: 'shettys-dental-clinic',
    title: "Shetty's Hi-Tech Multispeciality Dental Clinic",
    category: 'Healthcare',
    clientDomain: 'Healthcare',
    badge: 'HEALTHCARE',
    image: getAssetUrl('/portfolio/shettys-dental-card.png'),
    bannerImage: getAssetUrl('/portfolio/shettys-dental-banner.png'),
    logoImage: getAssetUrl('/portfolio/shettys-dental-logo.png'),
    shortDesc: 'Token booking application for smooth clinic appointment handling.',
    fullDesc: "Custom token booking and patient appointment queue management application engineered for Shetty's Hi-Tech Multispeciality Dental Clinic, Mysuru. The system streamlines walk-in appointments, minimizes waiting hall crowding, and automates operatory chair assignments.",
    challenge: 'Long patient waiting times, crowded clinic reception during peak doctor hours, and manual paper tokens resulting in scheduling overlap.',
    solution: 'Developed an automated digital Token Booking Application featuring live queue progression, SMS/WhatsApp appointment alerts, and an intuitive reception tablet dashboard for receptionists and dental specialists.',
    results: [
      '72% reduction in patient waiting room congestion',
      'Real-time token queue tracking on patients’ mobile devices',
      'Flawless daily appointment scheduling across multiple dental chairs'
    ],
    tags: ['Token Booking Application'],
    year: '2025',
    link: '#case-study'
  },
  {
    id: 'navabharatha-sustainable',
    title: 'Navabharatha Sustainable Organisation',
    category: 'Sustainable Organisation',
    clientDomain: 'Sustainable Organisation',
    badge: 'SUSTAINABLE ORGANISATION',
    image: getAssetUrl('/portfolio/navabharatha-sustainable-card.png'),
    bannerImage: getAssetUrl('/portfolio/navabharatha-sustainable-banner.png'),
    logoImage: getAssetUrl('/portfolio/navabharatha-sustainable-logo.png'),
    shortDesc: 'Website and social media support for a sustainability-focused organisation.',
    fullDesc: 'End-to-end digital communications, web maintenance, and sustainability advocacy management for Navabharatha Sustainable Organisation for Consistency, dedicated to operational efficiency and environmental awareness in Mysore, Karnataka.',
    challenge: 'Expanding public outreach and community participation for sustainable initiatives, green campaigns, and organizational transparency across online channels.',
    solution: 'Designed robust website maintenance protocols, responsive impact reporting pages, and engaging social media campaigns emphasizing efficiency, consistency, and community development.',
    results: [
      '120% growth in community digital outreach and volunteer signups',
      'Continuous, reliable web platform uptime hosting environmental initiatives',
      'Elevated social brand equity and engagement among regional stakeholders'
    ],
    tags: ['Website Maintenance', 'Social Media Management'],
    year: '2024',
    link: 'https://www.navabharatha.com'
  },
  {
    id: 'nidhi-fresh-basket',
    title: 'Nidhi Fresh Basket',
    category: 'Fresh Produce',
    clientDomain: 'Fresh Produce',
    badge: 'FRESH PRODUCE',
    image: getAssetUrl('/portfolio/nidhi-fresh-basket-card.png'),
    bannerImage: getAssetUrl('/portfolio/nidhi-fresh-basket-banner.png'),
    logoImage: getAssetUrl('/portfolio/nidhi-fresh-basket-logo.png'),
    shortDesc: 'Digital support for a fresh produce and grocery brand.',
    fullDesc: 'Comprehensive digital support, localized social media marketing, and web maintenance for Nidhi Fresh Basket, delivering handpicked farm-fresh fruits, vegetables, and daily essentials across Kuvempunagar, Mysore.',
    challenge: 'Connecting daily farm-fresh harvests directly with urban households, competing with quick-commerce platforms, and maintaining customer ordering consistency.',
    solution: 'Executed hyper-local social media promotions, instant WhatsApp order click-to-chat workflows, and daily freshness catalog updates to drive repeat grocery orders.',
    results: [
      '2.8x increase in direct home delivery grocery orders via WhatsApp & web',
      'Consistent daily neighborhood reach across Kuvempunagar residential zones',
      'Zero-downtime website uptime ensuring continuous product catalog availability'
    ],
    tags: ['Website Maintenance', 'Social Media Management'],
    year: '2025',
    link: 'https://www.nidhifreshbasket.com'
  }
];

export const clientPortfolioCategories = [
  'All',
  'Healthcare',
  'Sustainable Organisation',
  'Fresh Produce'
];

// =======================================================================
// 2. OUR PROJECTS (Proprietary Products & In-House Platforms)
// =======================================================================
export const ourProjectsData = [
  {
    id: 'jkd-mart',
    title: 'JKD Mart',
    category: 'E-Commerce & Retail',
    clientDomain: 'E-Commerce & Retail',
    badge: 'RETAIL & E-COMMERCE',
    image: getAssetUrl('/portfolio/jkd-mart-banner.svg'),
    bannerImage: getAssetUrl('/portfolio/jkd-mart-banner.svg'),
    logoImage: getAssetUrl('/portfolio/jkd-mart-logo.svg'),
    shortDesc: 'Full-stack digital mart and multi-category retail e-commerce platform.',
    fullDesc: 'Navabharath Technologies designed and deployed JKD Mart, a modern omnichannel supermarket and digital retail marketplace. The platform connects consumers with daily essentials, groceries, and consumer packaged goods through instant order dispatch and localized delivery workflows.',
    challenge: 'Transitioning traditional retail supermarket operations into a seamless online ordering system capable of managing live inventory sync, multi-category catalogs, and high-frequency neighborhood deliveries.',
    solution: 'Engineered a progressive web app and digital ordering engine featuring dynamic catalog filtering, real-time stock telemetry, integrated digital payment gateways (UPI, cards, net banking), and automated WhatsApp delivery notifications.',
    results: [
      '3.4x boost in online grocery and daily essential orders',
      'Sub-second catalog browsing and mobile checkout velocity',
      'Automated inventory management eliminating stock-out discrepancies'
    ],
    tags: ['E-Commerce Platform', 'Website Development', 'Inventory Integration'],
    year: '2025',
    link: '#case-study'
  },
  {
    id: 'vyapara',
    title: 'Vyapara',
    category: 'Business Software',
    clientDomain: 'Business Software',
    badge: 'BUSINESS SOFTWARE',
    image: getAssetUrl('/portfolio/vyapara-banner.svg'),
    bannerImage: getAssetUrl('/portfolio/vyapara-banner.svg'),
    logoImage: getAssetUrl('/portfolio/vyapara-logo.svg'),
    shortDesc: 'Intelligent business management, billing, and retail trade solution.',
    fullDesc: 'Vyapara is an all-in-one digital business management and automated billing platform developed by Navabharath Technologies. Built for regional merchants, wholesalers, and retail distributors, it simplifies GST billing, ledger accounting, stock tracking, and supplier communications.',
    challenge: 'Small and medium business owners struggled with complex, bloated enterprise ERPs that were difficult to operate on mobile devices and lacked simple regional language invoicing.',
    solution: 'Built a lightweight, high-performance web and mobile application with fast point-of-sale (POS) barcode scanning, one-click GST tax invoices, customer balance tracking, and automated payment reminder dispatch.',
    results: [
      'Over 500+ daily business transactions processed per retail counter',
      '65% reduction in daily accounting reconciliation time',
      'Seamless offline-capable transaction caching for uninterrupted billing'
    ],
    tags: ['Business Management App', 'Billing & POS', 'Software Development'],
    year: '2025',
    link: '#case-study'
  },
  {
    id: 'tokens-boy',
    title: 'Tokens Boy',
    category: 'Smart Applications',
    clientDomain: 'Smart Applications',
    badge: 'QUEUE APPLICATION',
    image: getAssetUrl('/portfolio/tokens-boy-banner.svg'),
    bannerImage: getAssetUrl('/portfolio/tokens-boy-banner.svg'),
    logoImage: getAssetUrl('/portfolio/tokens-boy-logo.svg'),
    shortDesc: 'Smart token booking and automated queue management platform.',
    fullDesc: 'Tokens Boy is an automated digital token allocation and patient/customer queue orchestration system engineered by Navabharath Technologies. It allows clinics, diagnostic centers, and service establishments to manage appointments with real-time queue visibility.',
    challenge: 'Overcrowded waiting lounges, ambiguous queue positions, and patient frustration caused by unorganized walk-ins and manual paper token slips.',
    solution: 'Engineered a cloud-synchronized token booking platform with QR-code scanning, real-time position countdowns sent via SMS/WhatsApp, and front-desk reception management consoles.',
    results: [
      '75% drop in physical reception congestion and waiting room idle time',
      'Real-time token tracking accessible straight from customer smartphones',
      'Zero lost appointments through automated advance SMS alerts'
    ],
    tags: ['Token Booking Application', 'Queue Management', 'Mobile Solutions'],
    year: '2025',
    link: '#case-study'
  }
];

// Unified exports for compatibility
export const portfolioData = [...clientPortfolioData, ...ourProjectsData];
export const portfolioCategories = clientPortfolioCategories;
