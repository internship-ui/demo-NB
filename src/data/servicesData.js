export const servicesData = [
  {
    id: 'ai-solutions',
    title: 'AI Solutions',
    tagline: 'AI-powered automation, Machine Learning, AI Chatbots, intelligent data analysis and business process automation.',
    icon: 'Bot',
    shortDesc: 'Unlock operational efficiency with enterprise-grade machine learning models, autonomous AI agents, intelligent chatbots, and workflow automation tailored to your business.',
    fullDesc: 'Navabharath Technologies helps forward-thinking enterprises harness the transformative potential of Artificial Intelligence. From automating high-volume business workflows to deploying domain-trained conversational chatbots and predictive analytics engines, we engineer secure, scalable AI systems that deliver tangible ROI.',
    features: [
      'AI-Powered Business Process Automation',
      'Custom Machine Learning & Predictive Analytics Models',
      'Conversational AI Chatbots & 24/7 Virtual Assistants',
      'Intelligent Big Data Analysis & Trend Forecasting',
      'Natural Language Processing (NLP) & Computer Vision Pipelines'
    ],
    technologies: ['Python', 'TensorFlow', 'PyTorch', 'OpenAI API', 'LangChain', 'FastAPI', 'Docker'],
    deliverables: [
      'Trained & validated custom AI models',
      'Full API integrations with CRM & ERP systems',
      'Automated data ingestion & training pipelines',
      'Model performance monitoring & drift telemetry'
    ],
    stats: { label: 'Efficiency Improvement', value: '+75%' },
    benefits: [
      'Automate up to 80% of routine customer and administrative workflows',
      'Derive actionable business intelligence from previously siloed data',
      'Accelerate decision-making velocity with predictive forecasting',
      '24/7 autonomous operations without increasing workforce overhead'
    ],
    process: [
      { step: '01', title: 'Data Audit & Feasibility', desc: 'Evaluating dataset readiness, security boundaries, and architectural suitability.' },
      { step: '02', title: 'Model Design & Training', desc: 'Fine-tuning foundational models and engineering specialized domain logic.' },
      { step: '03', title: 'System Integration & Testing', desc: 'Connecting APIs, orchestrating event pipelines, and rigorous validation.' },
      { step: '04', title: 'Deployment & Continuous Learning', desc: 'Production rollout with automated drift monitoring and continuous tuning.' }
    ]
  },
  {
    id: 'cloud-solutions',
    title: 'Cloud Solutions',
    tagline: 'Cloud Migration, Cloud Infrastructure, Hosting, Security and Management.',
    icon: 'Cloud',
    shortDesc: 'Modernize your digital backbone with seamless cloud migrations, resilient multi-cloud infrastructure, high-availability hosting, and zero-trust security.',
    fullDesc: 'Migrate, optimize, and manage your cloud ecosystem with confidence. We design fault-tolerant, elastic cloud environments across AWS, Microsoft Azure, and Google Cloud, ensuring zero-downtime scalability, compliance certification, and disciplined FinOps cost management.',
    features: [
      'End-to-End Cloud Migration & Legacy Modernization',
      'Scalable Multi-Cloud Infrastructure (AWS, Azure, GCP)',
      'High-Performance Cloud Hosting & Auto-Scaling Clusters',
      'Zero-Trust Cloud Security & Compliance Audits (ISO, SOC 2)',
      '24/7 Managed Cloud Operations & FinOps Cost Optimization'
    ],
    technologies: ['AWS Cloud', 'Microsoft Azure', 'Google Cloud', 'Terraform', 'Kubernetes', 'Docker', 'Prometheus'],
    deliverables: [
      'Automated Infrastructure as Code (IaC) templates',
      'Multi-region failover and disaster recovery blueprints',
      'Cloud compliance certification and audit documentation',
      'Continuous FinOps monitoring dashboard'
    ],
    stats: { label: 'Cloud Cost Savings', value: '35% Avg' },
    benefits: [
      'Achieve 99.99% system availability with automated failover replication',
      'Reduce infrastructure expenditures through auto-scaling and spot provisioning',
      'Strengthen organizational defense posture with zero-trust network boundaries',
      'Accelerate deployment velocity with automated container pipelines'
    ],
    process: [
      { step: '01', title: 'Cloud Readiness Assessment', desc: 'Analyzing existing infrastructure, dependency mapping, and TCO projections.' },
      { step: '02', title: 'Architecture Blueprint', desc: 'Designing resilient, secure multi-region environments via Terraform.' },
      { step: '03', title: 'Phased Workload Migration', desc: 'Migrating applications and databases with minimal to zero production downtime.' },
      { step: '04', title: 'Ongoing Optimization & SRE', desc: '24/7 observability, security patches, and cost-efficiency tuning.' }
    ]
  },
  {
    id: 'mobile-app-development',
    title: 'Mobile App Development',
    tagline: 'Android, iOS, cross-platform apps, app UI/UX and maintenance.',
    icon: 'Smartphone',
    shortDesc: 'Develop intuitive, high-performance mobile applications engineered for native responsiveness, offline-first synchronization, and frictionless touch interactions.',
    fullDesc: 'We develop native and cross-platform mobile applications for iOS and Android that engage users and streamline operations. Leveraging React Native, Flutter, and native iOS/Android toolchains, our engineering teams ensure 60fps performance and high App Store ratings.',
    features: [
      'Native Android (Kotlin) & iOS (Swift) Mobile Apps',
      'High-Performance Cross-Platform Apps (React Native & Flutter)',
      'Human-Centered Mobile App UI/UX & Motion Design',
      'Secure API Integrations & Offline-First Data Sync',
      'App Store Optimization (ASO), Release & Ongoing Maintenance'
    ],
    technologies: ['React Native', 'Flutter', 'Swift', 'Kotlin', 'Firebase', 'SQLite', 'Fastlane'],
    deliverables: [
      'Production-ready iOS and Android app binaries',
      'Integrated mobile crash reporting and telemetry suite',
      'Complete Apple App Store & Google Play submission assistance',
      'Continuous maintenance and OS update patches'
    ],
    stats: { label: 'App Store Rating Avg', value: '4.8/5' },
    benefits: [
      'Single codebase efficiency with React Native & Flutter reducing TTM by 40%',
      'Fluid, touch-optimized user interfaces built for native 60fps responsiveness',
      'Offline-ready functionality ensuring uninterrupted user productivity',
      'Enterprise-grade local encryption and biometric authentication'
    ],
    process: [
      { step: '01', title: 'Mobile Strategy & UI/UX', desc: 'Wireframing user journeys, ergonomics, and interactive mobile prototyping.' },
      { step: '02', title: 'Agile Native & Hybrid Build', desc: 'Clean architecture coding with automated linting and component tests.' },
      { step: '03', title: 'Cross-Device QA & Stress Tests', desc: 'Testing across 50+ real physical phone and tablet hardware form factors.' },
      { step: '04', title: 'App Store Launch & Support', desc: 'Managing review submissions, ASO keywords, and telemetry maintenance.' }
    ]
  },
  {
    id: 'web-development',
    title: 'Web Development',
    tagline: 'custom websites, e-commerce, web applications, frontend and backend development.',
    icon: 'Globe',
    shortDesc: 'Build modern, high-speed corporate web platforms, enterprise web applications, and headless e-commerce storefronts engineered for speed, scale, and SEO.',
    fullDesc: 'We architect and build enterprise-grade web applications designed to support high concurrent traffic and drive business outcomes. Leveraging React, Next.js, and Node.js microservices, we guarantee accessible, lightning-fast, and resilient web experiences.',
    features: [
      'Custom Corporate Websites & Progressive Web Apps (PWAs)',
      'Scalable E-Commerce & Multi-Vendor Marketplaces',
      'Modern High-Performance Frontend (React, Next.js, Tailwind)',
      'Robust Backend Engineering & REST / GraphQL APIs (Node, Go)',
      'Core Web Vitals Optimization, Technical SEO & Cyber Hardening'
    ],
    technologies: ['React', 'Next.js', 'Node.js', 'TypeScript', 'PostgreSQL', 'GraphQL', 'Tailwind CSS'],
    deliverables: [
      'Production web code optimized for 95+ Core Web Vitals score',
      'CI/CD automated deployment pipelines with zero downtime',
      'Interactive documentation and Swagger API schemas',
      'Comprehensive security hardening (OWASP Top 10)'
    ],
    stats: { label: 'Performance Score', value: '98+' },
    benefits: [
      'Sub-second page load times that maximize search rankings and conversion',
      'Responsive design engineered seamlessly across desktop, tablet, and mobile',
      'Modular component architectures that scale easily with business growth',
      'Enterprise security standards protecting sensitive customer transactions'
    ],
    process: [
      { step: '01', title: 'Requirements & Architecture', desc: 'Defining system specifications, component architecture, and tech stack.' },
      { step: '02', title: 'Full Stack Development', desc: 'Sprints covering responsive UI components, microservices, and database APIs.' },
      { step: '03', title: 'End-to-End Automated QA', desc: 'Cross-browser compatibility, security audits, and load benchmark tests.' },
      { step: '04', title: 'Production Launch & CDN', desc: 'Zero-downtime deployment backed by global edge caching and monitoring.' }
    ]
  },
  {
    id: 'ui-ux-design',
    title: 'UI/UX Design',
    tagline: 'user research, wireframing, prototyping, website UI and mobile app UI.',
    icon: 'Palette',
    shortDesc: 'Craft aesthetically captivating, human-centered digital experiences and design systems that simplify complex workflows and accelerate customer engagement.',
    fullDesc: 'Great software starts with exceptional design. Our UI/UX specialists craft human-centered digital experiences that simplify complex workflows. We balance visual sophistication with usability, ensuring seamless interactions across all screen sizes.',
    features: [
      'Qualitative & Quantitative In-Depth User Research',
      'Low & High-Fidelity Wireframing & Information Architecture',
      'Interactive Clickable Prototypes & Motion Design (Figma)',
      'Responsive Website UI & Native Mobile App UI Design',
      'Scalable Enterprise Design Systems & WCAG 2.1 AA Accessibility'
    ],
    technologies: ['Figma', 'Adobe XD', 'Storybook', 'Design Tokens', 'Principle', 'WCAG 2.1'],
    deliverables: [
      'Production-ready Figma design system & component library',
      'Interactive clickable high-fidelity user journey prototypes',
      'Comprehensive design token tokens mapped to CSS properties',
      'Developer handoff specs with typography, colors, and layout tokens'
    ],
    stats: { label: 'User Retention Boost', value: '+42%' },
    benefits: [
      'Eliminate friction and user drop-off across critical product funnels',
      'Accelerate frontend engineering velocity by 3x with unified component tokens',
      'Ensure 100% WCAG 2.1 AA accessibility compliance across all user touchpoints',
      'Establish a cohesive, modern brand identity across digital product suites'
    ],
    process: [
      { step: '01', title: 'Discovery & User Research', desc: 'User interviews, competitive benchmarking, and journey mapping.' },
      { step: '02', title: 'Wireframes & Information Architecture', desc: 'Structural blueprints and low-fidelity UX flows.' },
      { step: '03', title: 'Visual UI & Interactive Prototype', desc: 'High-fidelity Figma mockups, micro-interactions, and motion design.' },
      { step: '04', title: 'Design System & Dev Handoff', desc: 'Component token export, Storybook setup, and engineer coordination.' }
    ]
  },
  {
    id: 'digital-marketing',
    title: 'Digital Marketing',
    tagline: 'SEO, social media marketing, content marketing, Google Ads and online brand promotion.',
    icon: 'Megaphone',
    shortDesc: 'Drive customer acquisition and outpace competitors with data-driven SEO campaigns, targeted Google & Meta ad funnels, and high-impact content strategies.',
    fullDesc: 'Accelerate your digital growth with comprehensive marketing strategies engineered to capture high-intent leads and drive measurable revenue. We combine technical search engine optimization, performance advertising, and compelling content to establish market leadership.',
    features: [
      'Strategic Search Engine Optimization (SEO & Technical Audits)',
      'High-Conversion Google Ads, SEM & Pay-Per-Click (PPC) Campaigns',
      'Impactful Social Media Marketing (SMM) & Community Growth',
      'B2B & B2C Thought-Leadership Content Marketing & Copywriting',
      'Conversion Rate Optimization (CRO), Brand Promotion & Analytics'
    ],
    technologies: ['Google Analytics 4', 'Google Ads', 'Meta Business Suite', 'SEMrush', 'Ahrefs', 'HubSpot'],
    deliverables: [
      'Comprehensive SEO technical audit and keyword strategy',
      'Optimized multi-channel paid ad campaigns (Google / LinkedIn / Meta)',
      'Monthly data analytics and ROI conversion reporting',
      'Content calendar and authoritative thought-leadership copy'
    ],
    stats: { label: 'Targeted Lead Growth', value: '3.8x' },
    benefits: [
      'Dominate search rankings for high-intent corporate keywords',
      'Maximize ROAS (Return On Ad Spend) with granular conversion tracking',
      'Build brand authority and trust across major social and industry platforms',
      'Continuous A/B testing that continually boosts landing page conversion rates'
    ],
    process: [
      { step: '01', title: 'Market Audit & Audience Discovery', desc: 'Analyzing competitors, search volumes, and customer buying intent.' },
      { step: '02', title: 'Multi-Channel Campaign Strategy', desc: 'Formulating SEO roadmaps, paid funnels, and creative ad copy.' },
      { step: '03', title: 'Execution & Conversion Setup', desc: 'Launching campaigns with pixel tracking and automated analytics.' },
      { step: '04', title: 'Continuous A/B Testing & Scaling', desc: 'Optimizing click-through rates, reducing CAC, and scaling winners.' }
    ]
  },
  {
    id: 'ivr-solutions',
    title: 'IVR Solutions',
    tagline: 'Interactive Voice Response, automated call routing, voice-based customer support, call management and custom IVR workflows.',
    icon: 'PhoneCall',
    shortDesc: 'Streamline customer communications with intelligent Interactive Voice Response systems, automated call routing, 24/7 self-service, and CRM telephony integration.',
    fullDesc: 'Transform your telecommunications with custom Interactive Voice Response (IVR) platforms. We build intelligent, multi-language voice workflows that route calls accurately, provide automated 24/7 client self-service, and integrate directly with your CRM and contact center software.',
    features: [
      'Multi-Level Interactive Voice Response (IVR) Architecture',
      'Automated Intelligent Call Routing & ACD (Auto Call Distribution)',
      '24/7 Voice-Based Customer Support & Self-Service Automation',
      'Real-Time Call Telemetry, Analytics, Recording & Quality Audits',
      'Custom Telephony Workflows, SIP Trunking & CRM Integrations'
    ],
    technologies: ['Twilio API', 'Asterisk PBX', 'FreePBX', 'WebRTC', 'Node.js', 'Python', 'AWS Connect'],
    deliverables: [
      'Configured multi-tier interactive voice response trees',
      'Automated telephony CRM and ticketing system webhook integrations',
      'Real-time supervisor call dashboard and audio log storage',
      'Telephony SLA uptime architecture and failover routing'
    ],
    stats: { label: 'Call Resolution Speed', value: '+65%' },
    benefits: [
      'Zero customer hold times with instant automated menu navigation',
      'Intelligent skill-based routing ensuring callers reach the right specialist',
      'Significant reduction in contact center operational overhead',
      'Detailed telemetry on call volume peaks, drop-off rates, and satisfaction'
    ],
    process: [
      { step: '01', title: 'Telephony Flow Assessment', desc: 'Mapping customer call journeys, key decision branches, and integration needs.' },
      { step: '02', title: 'IVR Flowchart & Voice Prompts', desc: 'Drafting clear audio scripts, multilingual menus, and automated prompts.' },
      { step: '03', title: 'Integration & Load Testing', desc: 'Connecting SIP trunks, CRM webhooks, and simulating high call concurrency.' },
      { step: '04', title: 'Deployment & Telemetry Tuning', desc: 'Live cutover with real-time call tracking and continuous menu refinement.' }
    ]
  }
];
