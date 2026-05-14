const APP_CONFIG = {
  API_BASE_URL: window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1'
    ? 'http://localhost:5000/api'
    : '/api',
  SITE_NAME: 'NextGen Digital Academy',
  CONTACT_EMAIL: 'info@nextgendigitalacademy.com',
  WHATSAPP: '+92 300 1234567',
};

const COURSES = [
  {
    id: 'digital-marketing',
    title: 'Digital Marketing Mastery',
    description: 'Learn SEO, social media marketing, Google Ads, content strategy, and analytics to grow any business online.',
    level: 'beginner',
    duration: '8 Weeks',
    price: 'PKR 15,000',
    icon: '&#128200;',
    color: '#6366f1',
    topics: [
      'Search Engine Optimization (SEO)',
      'Social Media Marketing (Facebook, Instagram, TikTok)',
      'Google Ads & PPC Campaigns',
      'Content Marketing Strategy',
      'Email Marketing',
      'Analytics & Reporting'
    ]
  },
  {
    id: 'freelancing',
    title: 'Freelancing & Remote Work',
    description: 'Build a profitable freelancing career on Upwork, Fiverr, and other platforms. Learn proposals, pricing, and client management.',
    level: 'beginner',
    duration: '6 Weeks',
    price: 'PKR 12,000',
    icon: '&#128188;',
    color: '#22c55e',
    topics: [
      'Setting Up Freelance Profiles',
      'Writing Winning Proposals',
      'Pricing & Rate Setting',
      'Client Communication',
      'Time Management',
      'Building Long-Term Clients'
    ]
  },
  {
    id: 'web-development',
    title: 'Web Development Bootcamp',
    description: 'From HTML/CSS to JavaScript and React. Build modern, responsive websites and web applications from scratch.',
    level: 'intermediate',
    duration: '12 Weeks',
    price: 'PKR 25,000',
    icon: '&#128187;',
    color: '#f59e0b',
    topics: [
      'HTML5 & CSS3 Fundamentals',
      'JavaScript ES6+',
      'React.js & Components',
      'Responsive Design',
      'Version Control with Git',
      'Deploying Web Applications'
    ]
  },
  {
    id: 'graphic-design',
    title: 'Graphic Design Essentials',
    description: 'Master Canva, Photoshop, and design principles to create stunning visuals for brands and social media.',
    level: 'beginner',
    duration: '6 Weeks',
    price: 'PKR 10,000',
    icon: '&#127912;',
    color: '#ec4899',
    topics: [
      'Design Principles & Color Theory',
      'Canva for Social Media',
      'Adobe Photoshop Basics',
      'Logo & Brand Identity',
      'Social Media Graphics',
      'Print Design Basics'
    ]
  },
  {
    id: 'ecommerce',
    title: 'E-Commerce & Dropshipping',
    description: 'Launch your own online store. Learn Shopify, product sourcing, dropshipping, and proven sales strategies.',
    level: 'intermediate',
    duration: '8 Weeks',
    price: 'PKR 18,000',
    icon: '&#128722;',
    color: '#14b8a6',
    topics: [
      'Shopify Store Setup',
      'Product Research & Sourcing',
      'Dropshipping Business Model',
      'Payment Gateways',
      'Facebook & Instagram Ads for E-Commerce',
      'Order Fulfillment & Customer Service'
    ]
  },
  {
    id: 'video-editing',
    title: 'Video Editing & Content Creation',
    description: 'Create professional videos for YouTube, TikTok, and social media using modern editing tools and techniques.',
    level: 'beginner',
    duration: '6 Weeks',
    price: 'PKR 12,000',
    icon: '&#127916;',
    color: '#ef4444',
    topics: [
      'Video Editing Fundamentals',
      'CapCut & DaVinci Resolve',
      'YouTube Content Strategy',
      'TikTok & Reels Creation',
      'Thumbnails & Titles',
      'Monetization Strategies'
    ]
  }
];
