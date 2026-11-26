import { getAssetUrl } from '../utils/assetPath';

export const companyDetails = {
  name: 'NAVABHARATH TECHNOLOGIES',
  shortName: 'Navabharath',
  tagline: 'Smarter Solutions for Better Future',
  foundedYear: '2020',
  description: 'Navabharath Technologies is a Mysuru-based Software Company helping businesses adapt, grow, and stay secure in a digital-first world. We design practical IT solutions that simplify operations and support long-term growth. From custom web development and mobile applications to AI-driven automation and strategic digital marketing, we provide end-to-end services tailored to your unique goals.',
  
  // Official company details
  officialAddress: '#667/B 2nd Floor, Chitrabhanu Road Kuvempu Nagar, Mysore, Karnataka - 570023',
  address: '#667/B 2nd Floor, Chitrabhanu Road Kuvempu Nagar, Mysore, Karnataka - 570023',
  email: 'contact@navabharathtechnologies.com',
  supportEmail: 'contact@navabharathtechnologies.com',
  careersEmail: 'contact@navabharathtechnologies.com',
  phone: '+91-7996078472',
  phoneSecondary: '+91-8213128831',
  phones: ['+91-7996078472', '+91-8213128831'],
  tollFree: '+91-8213128831',
  cin: '[CIN: U72200KA2020PTC138942]',
  businessHours: 'Monday – Friday: 9:00 AM – 6:30 PM IST',

  socials: [
    { name: 'LinkedIn', url: 'https://linkedin.com', icon: 'Linkedin' },
    { name: 'Twitter / X', url: 'https://twitter.com', icon: 'Twitter' },
    { name: 'GitHub', url: 'https://github.com', icon: 'Github' },
    { name: 'Instagram', url: 'https://instagram.com', icon: 'Instagram' }
  ],

  // Key animated stats
  stats: [
    { label: 'Enterprise Projects Delivered', value: 180, suffix: '+', icon: 'Briefcase' },
    { label: 'Client Satisfaction Index', value: 99, suffix: '%', icon: 'Award' },
    { label: 'Dedicated Engineers & Specialists', value: 75, suffix: '+', icon: 'Users' },
    { label: 'Service Uptime Architecture', value: 99.9, suffix: '%', isDecimal: true, icon: 'Shield' }
  ],

  mission: 'To empower forward-thinking organizations worldwide through high-performance, resilient, and human-centered digital solutions that solve real enterprise challenges and foster sustainable technological innovation.',
  vision: 'To be the most trusted global engineering partner recognized for technical mastery, transparent collaboration, and creating transformative digital software architectures.',
  
  values: [
    {
      title: 'Architectural Excellence',
      desc: 'We never cut corners on engineering hygiene, security, or maintainability. Every system we construct is engineered to scale sustainably.',
      icon: 'ShieldCheck'
    },
    {
      title: 'Radical Transparency',
      desc: 'Clear communication, realistic estimates, open sprints, and direct collaboration. No jargon, no hidden fees, and zero guesswork.',
      icon: 'Eye'
    },
    {
      title: 'Client-Centric Agility',
      desc: 'Your business velocity is our metric of success. We adapt swiftly to changing market requirements with disciplined agile workflows.',
      icon: 'Zap'
    },
    {
      title: 'Relentless Innovation',
      desc: 'We explore modern frameworks, cloud architectures, and automated testing patterns to keep our clients ahead of their competition.',
      icon: 'Cpu'
    }
  ],

  journey: [
    {
      year: '2020',
      title: 'Founding & Inception',
      desc: 'Navabharath Technologies was established by engineering veterans with a vision to deliver dependable, high-integrity enterprise digital solutions.'
    },
    {
      year: '2022',
      title: 'Expansion into Full-Scale Cloud & DevOps',
      desc: 'Expanded technical capabilities to offer cloud-native microservices, automated CI/CD infrastructures, and mobile app engineering.'
    },
    {
      year: '2024',
      title: 'Enterprise FinTech & HealthTech Delivery',
      desc: 'Successfully delivered mission-critical HIPAA and banking-grade software platforms handling millions of secure daily transactions.'
    },
    {
      year: '2026',
      title: 'Global Delivery & AI-Driven Digital Solutions',
      desc: 'Scaling cross-border technology consulting, modernizing enterprise legacy stacks, and deploying advanced automated digital platforms.'
    }
  ],

  leadership: [
    {
      name: 'Dinesh J K',
      role: 'CEO & Founder',
      bio: 'Visionary technology entrepreneur dedicated to driving robust IT solutions, modern digital transformation, and fostering a culture of technical excellence.',
      image: getAssetUrl('/assets/dinesh-jk-ceo.jpg'),
      linkedin: 'https://linkedin.com'
    },
    {
      name: 'Ananya Deshmukh',
      role: 'Chief Technology Officer',
      bio: 'Former senior cloud architect with a passion for distributed systems, event-driven microservices, and high-throughput data engineering.',
      image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=400&auto=format&fit=crop',
      linkedin: 'https://linkedin.com'
    },
    {
      name: 'Vikramaditya Verma',
      role: 'Head of Product & UI/UX Strategy',
      bio: 'Pioneer of human-centered enterprise design systems, turning complex multi-step industrial software into delightful digital experiences.',
      image: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=400&auto=format&fit=crop',
      linkedin: 'https://linkedin.com'
    },
    {
      name: 'Pooja Sundaram',
      role: 'VP of Quality Assurance & Security',
      bio: 'Dedicated QA strategist specializing in automated regression, continuous reliability testing, and enterprise security compliance audits.',
      image: 'https://images.unsplash.com/photo-1580894732444-8ecded7900cd?q=80&w=400&auto=format&fit=crop',
      linkedin: 'https://linkedin.com'
    }
  ]
};

