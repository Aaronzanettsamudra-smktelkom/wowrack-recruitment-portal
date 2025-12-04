export const departments = [
  "Engineering",
  "Design",
  "Product",
  "Marketing",
  "Sales",
  "Human Resources",
  "Finance",
  "Operations",
];

export const locations = [
  "San Francisco, CA",
  "New York, NY",
  "London, UK",
  "Singapore",
  "Remote",
  "Berlin, Germany",
];

export const jobTypes = ["Full-time", "Part-time", "Contract", "Internship"];

export interface Job {
  id: string;
  title: string;
  department: string;
  location: string;
  type: string;
  salary: string;
  postedDate: string;
  description: string;
  responsibilities: string[];
  requirements: string[];
  benefits: string[];
}

export const jobs: Job[] = [
  {
    id: "1",
    title: "Senior Frontend Engineer",
    department: "Engineering",
    location: "San Francisco, CA",
    type: "Full-time",
    salary: "$150,000 - $200,000",
    postedDate: "2024-11-28",
    description: "Join our engineering team to build beautiful, performant user interfaces that millions of people use every day.",
    responsibilities: [
      "Design and implement responsive web applications using React and TypeScript",
      "Collaborate with designers to translate mockups into pixel-perfect interfaces",
      "Optimize application performance and ensure cross-browser compatibility",
      "Mentor junior developers and conduct code reviews",
      "Contribute to architectural decisions and technical roadmap",
    ],
    requirements: [
      "5+ years of experience with modern JavaScript frameworks (React preferred)",
      "Strong proficiency in TypeScript, HTML5, and CSS3",
      "Experience with state management solutions (Redux, Zustand, etc.)",
      "Familiarity with testing frameworks (Jest, Cypress)",
      "Excellent communication and collaboration skills",
    ],
    benefits: [
      "Competitive salary and equity package",
      "Comprehensive health, dental, and vision insurance",
      "Flexible work arrangements and unlimited PTO",
      "Professional development budget",
      "Home office setup allowance",
    ],
  },
  {
    id: "2",
    title: "Product Designer",
    department: "Design",
    location: "New York, NY",
    type: "Full-time",
    salary: "$120,000 - $160,000",
    postedDate: "2024-11-25",
    description: "Shape the future of our product experience by creating intuitive, beautiful designs that delight users.",
    responsibilities: [
      "Lead end-to-end design for major product features",
      "Create wireframes, prototypes, and high-fidelity designs",
      "Conduct user research and usability testing",
      "Build and maintain our design system",
      "Collaborate closely with engineering and product teams",
    ],
    requirements: [
      "4+ years of product design experience",
      "Proficiency in Figma and prototyping tools",
      "Strong portfolio demonstrating UX problem-solving",
      "Experience with design systems",
      "Excellent visual design skills",
    ],
    benefits: [
      "Competitive compensation package",
      "Health and wellness benefits",
      "Learning and development opportunities",
      "Creative workspace",
      "Regular team events",
    ],
  },
  {
    id: "3",
    title: "Backend Engineer",
    department: "Engineering",
    location: "Remote",
    type: "Full-time",
    salary: "$140,000 - $180,000",
    postedDate: "2024-11-30",
    description: "Build scalable backend systems that power our platform and serve millions of requests daily.",
    responsibilities: [
      "Design and develop RESTful APIs and microservices",
      "Optimize database queries and system performance",
      "Implement security best practices",
      "Write comprehensive tests and documentation",
      "Participate in on-call rotations",
    ],
    requirements: [
      "4+ years of backend development experience",
      "Proficiency in Node.js, Python, or Go",
      "Experience with SQL and NoSQL databases",
      "Knowledge of cloud platforms (AWS, GCP, or Azure)",
      "Understanding of distributed systems",
    ],
    benefits: [
      "Fully remote position",
      "Competitive salary",
      "Equipment allowance",
      "Flexible hours",
      "Annual retreat",
    ],
  },
  {
    id: "4",
    title: "Marketing Manager",
    department: "Marketing",
    location: "London, UK",
    type: "Full-time",
    salary: "£70,000 - £90,000",
    postedDate: "2024-11-20",
    description: "Drive our marketing strategy and grow brand awareness across key markets.",
    responsibilities: [
      "Develop and execute marketing campaigns",
      "Manage marketing budget and ROI tracking",
      "Lead content strategy and creation",
      "Analyze market trends and competitor activities",
      "Collaborate with sales and product teams",
    ],
    requirements: [
      "5+ years of B2B marketing experience",
      "Proven track record of successful campaigns",
      "Strong analytical and project management skills",
      "Experience with marketing automation tools",
      "Excellent written and verbal communication",
    ],
    benefits: [
      "Competitive package",
      "Central London office",
      "Private healthcare",
      "Pension scheme",
      "Travel opportunities",
    ],
  },
  {
    id: "5",
    title: "Data Analyst Intern",
    department: "Product",
    location: "Singapore",
    type: "Internship",
    salary: "$3,000 - $4,000/month",
    postedDate: "2024-12-01",
    description: "Learn from the best and gain hands-on experience with real data projects.",
    responsibilities: [
      "Analyze user behavior and product metrics",
      "Create dashboards and reports",
      "Support A/B testing initiatives",
      "Present findings to stakeholders",
      "Learn data tools and methodologies",
    ],
    requirements: [
      "Currently pursuing degree in Data Science, Statistics, or related field",
      "Basic knowledge of SQL and Python",
      "Strong analytical mindset",
      "Eagerness to learn",
      "Good communication skills",
    ],
    benefits: [
      "Mentorship program",
      "Return offer opportunity",
      "Flexible schedule",
      "Team lunches",
      "Learning resources",
    ],
  },
  {
    id: "6",
    title: "HR Business Partner",
    department: "Human Resources",
    location: "Berlin, Germany",
    type: "Full-time",
    salary: "€65,000 - €85,000",
    postedDate: "2024-11-22",
    description: "Partner with leadership to build a world-class culture and employee experience.",
    responsibilities: [
      "Provide strategic HR support to business units",
      "Drive talent development initiatives",
      "Handle employee relations matters",
      "Lead performance management processes",
      "Implement HR policies and programs",
    ],
    requirements: [
      "5+ years of HR experience",
      "Experience as HR Business Partner or similar role",
      "Knowledge of German labor law",
      "Fluent in English and German",
      "Strong interpersonal skills",
    ],
    benefits: [
      "Competitive salary",
      "30 days vacation",
      "Public transport allowance",
      "Health insurance",
      "Professional development",
    ],
  },
];

export interface NewsArticle {
  id: string;
  title: string;
  excerpt: string;
  image: string;
  date: string;
  category: string;
}

export const newsArticles: NewsArticle[] = [
  {
    id: "1",
    title: "Celebrating Our 10th Anniversary",
    excerpt: "A decade of innovation, growth, and building an amazing team together.",
    image: "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=600&h=400&fit=crop",
    date: "2024-12-01",
    category: "Company",
  },
  {
    id: "2",
    title: "Remote Work: Our Hybrid Approach",
    excerpt: "How we balance flexibility with collaboration in our modern workplace.",
    image: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=600&h=400&fit=crop",
    date: "2024-11-28",
    category: "Culture",
  },
  {
    id: "3",
    title: "Meet Our Engineering Team",
    excerpt: "Get to know the talented engineers building our products.",
    image: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=600&h=400&fit=crop",
    date: "2024-11-25",
    category: "Team",
  },
  {
    id: "4",
    title: "Sustainability Initiatives 2024",
    excerpt: "Our commitment to environmental responsibility and green practices.",
    image: "https://images.unsplash.com/photo-1497436072909-60f360e1d4b1?w=600&h=400&fit=crop",
    date: "2024-11-20",
    category: "Sustainability",
  },
];

export interface Application {
  id: string;
  jobTitle: string;
  appliedDate: string;
  aiScore: number;
  stage: "Applied" | "Screening" | "HR Interview" | "Technical Interview" | "Final Interview" | "Offer" | "Hired" | "Rejected";
  nextStep: string;
}

export const candidateApplications: Application[] = [
  {
    id: "app-1",
    jobTitle: "Senior Frontend Engineer",
    appliedDate: "2024-11-28",
    aiScore: 92,
    stage: "Technical Interview",
    nextStep: "Technical interview on Dec 10, 2024",
  },
  {
    id: "app-2",
    jobTitle: "Product Designer",
    appliedDate: "2024-11-15",
    aiScore: 78,
    stage: "Rejected",
    nextStep: "Application closed",
  },
  {
    id: "app-3",
    jobTitle: "Backend Engineer",
    appliedDate: "2024-12-01",
    aiScore: 88,
    stage: "Screening",
    nextStep: "Resume under review",
  },
];

export interface Candidate {
  id: string;
  name: string;
  email: string;
  phone: string;
  position: string;
  aiScore: number;
  experience: number;
  skills: string[];
  stage: string;
  appliedDate: string;
  source: string;
}

export const candidates: Candidate[] = [
  {
    id: "c1",
    name: "Sarah Johnson",
    email: "sarah.j@email.com",
    phone: "+1 555-0101",
    position: "Senior Frontend Engineer",
    aiScore: 92,
    experience: 6,
    skills: ["React", "TypeScript", "Node.js", "CSS"],
    stage: "Technical Interview",
    appliedDate: "2024-11-28",
    source: "LinkedIn",
  },
  {
    id: "c2",
    name: "Michael Chen",
    email: "m.chen@email.com",
    phone: "+1 555-0102",
    position: "Backend Engineer",
    aiScore: 88,
    experience: 5,
    skills: ["Python", "Django", "PostgreSQL", "AWS"],
    stage: "HR Interview",
    appliedDate: "2024-11-30",
    source: "Referral",
  },
  {
    id: "c3",
    name: "Emily Davis",
    email: "emily.d@email.com",
    phone: "+1 555-0103",
    position: "Product Designer",
    aiScore: 85,
    experience: 4,
    skills: ["Figma", "UX Research", "Prototyping", "Design Systems"],
    stage: "Screening",
    appliedDate: "2024-12-01",
    source: "Company Website",
  },
  {
    id: "c4",
    name: "James Wilson",
    email: "j.wilson@email.com",
    phone: "+1 555-0104",
    position: "Senior Frontend Engineer",
    aiScore: 75,
    experience: 3,
    skills: ["React", "JavaScript", "HTML", "CSS"],
    stage: "Applied",
    appliedDate: "2024-12-02",
    source: "Indeed",
  },
];

export interface Requisition {
  id: string;
  title: string;
  department: string;
  quantity: number;
  priority: "Low" | "Medium" | "High" | "Critical";
  status: "Pending" | "Approved" | "Rejected" | "Revision Requested";
  requestedBy: string;
  requestedDate: string;
  salaryRange: string;
  justification: string;
}

export const requisitions: Requisition[] = [
  {
    id: "req-1",
    title: "Senior Frontend Engineer",
    department: "Engineering",
    quantity: 2,
    priority: "High",
    status: "Approved",
    requestedBy: "John Smith",
    requestedDate: "2024-11-15",
    salaryRange: "$150,000 - $200,000",
    justification: "Team expansion to support new product features",
  },
  {
    id: "req-2",
    title: "Product Designer",
    department: "Design",
    quantity: 1,
    priority: "Medium",
    status: "Pending",
    requestedBy: "Lisa Anderson",
    requestedDate: "2024-11-28",
    salaryRange: "$120,000 - $160,000",
    justification: "Replace departing team member",
  },
  {
    id: "req-3",
    title: "DevOps Engineer",
    department: "Engineering",
    quantity: 1,
    priority: "Critical",
    status: "Revision Requested",
    requestedBy: "John Smith",
    requestedDate: "2024-11-20",
    salaryRange: "$140,000 - $180,000",
    justification: "Critical infrastructure needs - awaiting budget clarification",
  },
];
