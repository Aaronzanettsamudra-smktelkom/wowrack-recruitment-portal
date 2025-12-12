export interface MPPRequest {
  id: string;
  title: string;
  department: string;
  requestedBy: string;
  quantity: number;
  salaryRange: string;
  priority: 'low' | 'medium' | 'high' | 'urgent';
  justification: string;
  status: 'pending' | 'approved' | 'rejected' | 'revision';
  submittedDate: string;
  hrFeedback?: string;
}

export interface Candidate {
  id: string;
  name: string;
  email: string;
  phone: string;
  position: string;
  department: string;
  aiScore: number;
  skills: string[];
  experience: number;
  appliedDate: string;
  stage: PipelineStage;
  source: string;
  resumeUrl: string;
  linkedIn?: string;
  timeline: TimelineEvent[];
}

export interface TimelineEvent {
  id: string;
  date: string;
  event: string;
  description: string;
  user?: string;
}

export type PipelineStage = 
  | 'applied' 
  | 'screening' 
  | 'contacted' 
  | 'hr-interview' 
  | 'user-interview' 
  | 'salary-negotiation' 
  | 'hired' 
  | 'rejected';

export interface Interview {
  id: string;
  candidateId: string;
  candidateName: string;
  position: string;
  scheduledDate: string;
  scheduledTime: string;
  duration: number;
  interviewers: string[];
  type: 'hr' | 'technical' | 'final';
  status: 'scheduled' | 'completed' | 'cancelled';
  meetingLink?: string;
}

export interface AnalyticsData {
  timeToHire: number;
  costPerHire: number;
  quarterlyData: { quarter: string; openings: number; fills: number }[];
  candidateSources: { source: string; count: number; percentage: number }[];
  rejectionReasons: { reason: string; count: number; percentage: number }[];
}

export const pipelineStages: { key: PipelineStage; label: string; color: string }[] = [
  { key: 'applied', label: 'Applied', color: 'bg-blue-500' },
  { key: 'screening', label: 'Screening', color: 'bg-purple-500' },
  { key: 'contacted', label: 'Contacted', color: 'bg-indigo-500' },
  { key: 'hr-interview', label: 'HR Interview', color: 'bg-cyan-500' },
  { key: 'user-interview', label: 'User Interview', color: 'bg-teal-500' },
  { key: 'salary-negotiation', label: 'Salary Negotiation', color: 'bg-amber-500' },
  { key: 'hired', label: 'Hired', color: 'bg-green-500' },
  { key: 'rejected', label: 'Rejected', color: 'bg-red-500' },
];

export const mockMPPRequests: MPPRequest[] = [
  {
    id: 'mpp-1',
    title: 'Senior Software Engineer',
    department: 'Engineering',
    requestedBy: 'John Smith',
    quantity: 2,
    salaryRange: '$120,000 - $150,000',
    priority: 'high',
    justification: 'Team expansion to support new product launch',
    status: 'pending',
    submittedDate: '2024-01-10',
  },
  {
    id: 'mpp-2',
    title: 'Marketing Manager',
    department: 'Marketing',
    requestedBy: 'Sarah Johnson',
    quantity: 1,
    salaryRange: '$80,000 - $100,000',
    priority: 'medium',
    justification: 'Replace departing team lead',
    status: 'pending',
    submittedDate: '2024-01-08',
  },
  {
    id: 'mpp-3',
    title: 'Data Analyst',
    department: 'Analytics',
    requestedBy: 'Mike Chen',
    quantity: 3,
    salaryRange: '$70,000 - $90,000',
    priority: 'urgent',
    justification: 'New analytics department setup',
    status: 'pending',
    submittedDate: '2024-01-05',
  },
  {
    id: 'mpp-4',
    title: 'UX Designer',
    department: 'Design',
    requestedBy: 'Emily Davis',
    quantity: 1,
    salaryRange: '$75,000 - $95,000',
    priority: 'low',
    justification: 'Design team enhancement',
    status: 'approved',
    submittedDate: '2024-01-02',
  },
];

export const mockCandidates: Candidate[] = [
  {
    id: 'cand-1',
    name: 'Alice Johnson',
    email: 'alice.johnson@email.com',
    phone: '+1 555-0101',
    position: 'Senior Software Engineer',
    department: 'Engineering',
    aiScore: 92,
    skills: ['React', 'TypeScript', 'Node.js', 'AWS'],
    experience: 6,
    appliedDate: '2024-01-12',
    stage: 'hr-interview',
    source: 'LinkedIn',
    resumeUrl: '/resumes/alice-johnson.pdf',
    linkedIn: 'https://linkedin.com/in/alicejohnson',
    timeline: [
      { id: 't1', date: '2024-01-12', event: 'Applied', description: 'Submitted application via LinkedIn' },
      { id: 't2', date: '2024-01-13', event: 'AI Screening', description: 'AI Score: 92/100' },
      { id: 't3', date: '2024-01-14', event: 'Moved to Screening', description: 'Passed initial requirements', user: 'HR Team' },
      { id: 't4', date: '2024-01-15', event: 'Phone Screen', description: 'Completed 30-min phone screen', user: 'Jane HR' },
      { id: 't5', date: '2024-01-16', event: 'HR Interview Scheduled', description: 'Interview set for Jan 18', user: 'Jane HR' },
    ],
  },
  {
    id: 'cand-2',
    name: 'Bob Williams',
    email: 'bob.williams@email.com',
    phone: '+1 555-0102',
    position: 'Senior Software Engineer',
    department: 'Engineering',
    aiScore: 88,
    skills: ['Python', 'Django', 'PostgreSQL', 'Docker'],
    experience: 5,
    appliedDate: '2024-01-11',
    stage: 'screening',
    source: 'Indeed',
    resumeUrl: '/resumes/bob-williams.pdf',
    timeline: [
      { id: 't1', date: '2024-01-11', event: 'Applied', description: 'Submitted application via Indeed' },
      { id: 't2', date: '2024-01-12', event: 'AI Screening', description: 'AI Score: 88/100' },
      { id: 't3', date: '2024-01-13', event: 'Moved to Screening', description: 'Under review', user: 'HR Team' },
    ],
  },
  {
    id: 'cand-3',
    name: 'Carol Martinez',
    email: 'carol.martinez@email.com',
    phone: '+1 555-0103',
    position: 'Marketing Manager',
    department: 'Marketing',
    aiScore: 85,
    skills: ['Digital Marketing', 'SEO', 'Analytics', 'Content Strategy'],
    experience: 7,
    appliedDate: '2024-01-10',
    stage: 'user-interview',
    source: 'Referral',
    resumeUrl: '/resumes/carol-martinez.pdf',
    linkedIn: 'https://linkedin.com/in/carolmartinez',
    timeline: [
      { id: 't1', date: '2024-01-10', event: 'Applied', description: 'Referred by current employee' },
      { id: 't2', date: '2024-01-11', event: 'AI Screening', description: 'AI Score: 85/100' },
      { id: 't3', date: '2024-01-12', event: 'HR Interview', description: 'Completed HR interview', user: 'Jane HR' },
      { id: 't4', date: '2024-01-14', event: 'User Interview Scheduled', description: 'Technical round scheduled', user: 'Sarah Johnson' },
    ],
  },
  {
    id: 'cand-4',
    name: 'David Lee',
    email: 'david.lee@email.com',
    phone: '+1 555-0104',
    position: 'Data Analyst',
    department: 'Analytics',
    aiScore: 78,
    skills: ['SQL', 'Python', 'Tableau', 'Excel'],
    experience: 3,
    appliedDate: '2024-01-09',
    stage: 'applied',
    source: 'Company Website',
    resumeUrl: '/resumes/david-lee.pdf',
    timeline: [
      { id: 't1', date: '2024-01-09', event: 'Applied', description: 'Submitted via company website' },
      { id: 't2', date: '2024-01-10', event: 'AI Screening', description: 'AI Score: 78/100' },
    ],
  },
  {
    id: 'cand-5',
    name: 'Eva Brown',
    email: 'eva.brown@email.com',
    phone: '+1 555-0105',
    position: 'UX Designer',
    department: 'Design',
    aiScore: 94,
    skills: ['Figma', 'User Research', 'Prototyping', 'Design Systems'],
    experience: 4,
    appliedDate: '2024-01-08',
    stage: 'salary-negotiation',
    source: 'LinkedIn',
    resumeUrl: '/resumes/eva-brown.pdf',
    linkedIn: 'https://linkedin.com/in/evabrown',
    timeline: [
      { id: 't1', date: '2024-01-08', event: 'Applied', description: 'Submitted via LinkedIn' },
      { id: 't2', date: '2024-01-09', event: 'AI Screening', description: 'AI Score: 94/100' },
      { id: 't3', date: '2024-01-10', event: 'HR Interview', description: 'Excellent cultural fit', user: 'Jane HR' },
      { id: 't4', date: '2024-01-12', event: 'Portfolio Review', description: 'Outstanding portfolio', user: 'Emily Davis' },
      { id: 't5', date: '2024-01-14', event: 'Offer Extended', description: 'Negotiating salary terms', user: 'HR Team' },
    ],
  },
  {
    id: 'cand-6',
    name: 'Frank Garcia',
    email: 'frank.garcia@email.com',
    phone: '+1 555-0106',
    position: 'Senior Software Engineer',
    department: 'Engineering',
    aiScore: 72,
    skills: ['Java', 'Spring Boot', 'Kubernetes'],
    experience: 8,
    appliedDate: '2024-01-07',
    stage: 'rejected',
    source: 'Indeed',
    resumeUrl: '/resumes/frank-garcia.pdf',
    timeline: [
      { id: 't1', date: '2024-01-07', event: 'Applied', description: 'Submitted via Indeed' },
      { id: 't2', date: '2024-01-08', event: 'AI Screening', description: 'AI Score: 72/100' },
      { id: 't3', date: '2024-01-09', event: 'Rejected', description: 'Skills mismatch for current role', user: 'HR Team' },
    ],
  },
  {
    id: 'cand-7',
    name: 'Grace Kim',
    email: 'grace.kim@email.com',
    phone: '+1 555-0107',
    position: 'Data Analyst',
    department: 'Analytics',
    aiScore: 89,
    skills: ['R', 'Python', 'Machine Learning', 'Statistics'],
    experience: 4,
    appliedDate: '2024-01-06',
    stage: 'hired',
    source: 'Referral',
    resumeUrl: '/resumes/grace-kim.pdf',
    linkedIn: 'https://linkedin.com/in/gracekim',
    timeline: [
      { id: 't1', date: '2024-01-06', event: 'Applied', description: 'Referred by analytics team' },
      { id: 't2', date: '2024-01-07', event: 'AI Screening', description: 'AI Score: 89/100' },
      { id: 't3', date: '2024-01-08', event: 'HR Interview', description: 'Strong candidate', user: 'Jane HR' },
      { id: 't4', date: '2024-01-10', event: 'Technical Interview', description: 'Passed with flying colors', user: 'Mike Chen' },
      { id: 't5', date: '2024-01-12', event: 'Offer Accepted', description: 'Starting Feb 1', user: 'HR Team' },
    ],
  },
  {
    id: 'cand-8',
    name: 'Henry Wilson',
    email: 'henry.wilson@email.com',
    phone: '+1 555-0108',
    position: 'Marketing Manager',
    department: 'Marketing',
    aiScore: 81,
    skills: ['Brand Management', 'Campaign Planning', 'Team Leadership'],
    experience: 9,
    appliedDate: '2024-01-05',
    stage: 'contacted',
    source: 'LinkedIn',
    resumeUrl: '/resumes/henry-wilson.pdf',
    timeline: [
      { id: 't1', date: '2024-01-05', event: 'Applied', description: 'Submitted via LinkedIn' },
      { id: 't2', date: '2024-01-06', event: 'AI Screening', description: 'AI Score: 81/100' },
      { id: 't3', date: '2024-01-07', event: 'Initial Contact', description: 'Email sent for phone screen', user: 'Jane HR' },
    ],
  },
];

export const mockInterviews: Interview[] = [
  {
    id: 'int-1',
    candidateId: 'cand-1',
    candidateName: 'Alice Johnson',
    position: 'Senior Software Engineer',
    scheduledDate: '2024-01-18',
    scheduledTime: '10:00',
    duration: 60,
    interviewers: ['Jane HR', 'John Smith'],
    type: 'hr',
    status: 'scheduled',
    meetingLink: 'https://teams.microsoft.com/meet/123',
  },
  {
    id: 'int-2',
    candidateId: 'cand-3',
    candidateName: 'Carol Martinez',
    position: 'Marketing Manager',
    scheduledDate: '2024-01-19',
    scheduledTime: '14:00',
    duration: 45,
    interviewers: ['Sarah Johnson', 'Tom Marketing'],
    type: 'technical',
    status: 'scheduled',
    meetingLink: 'https://teams.microsoft.com/meet/456',
  },
  {
    id: 'int-3',
    candidateId: 'cand-5',
    candidateName: 'Eva Brown',
    position: 'UX Designer',
    scheduledDate: '2024-01-17',
    scheduledTime: '11:00',
    duration: 30,
    interviewers: ['Emily Davis'],
    type: 'final',
    status: 'completed',
  },
];

export const mockAnalytics: AnalyticsData = {
  timeToHire: 28,
  costPerHire: 4500,
  quarterlyData: [
    { quarter: 'Q1 2023', openings: 15, fills: 12 },
    { quarter: 'Q2 2023', openings: 20, fills: 18 },
    { quarter: 'Q3 2023', openings: 25, fills: 20 },
    { quarter: 'Q4 2023', openings: 18, fills: 16 },
    { quarter: 'Q1 2024', openings: 22, fills: 8 },
  ],
  candidateSources: [
    { source: 'LinkedIn', count: 145, percentage: 35 },
    { source: 'Indeed', count: 98, percentage: 24 },
    { source: 'Referral', count: 82, percentage: 20 },
    { source: 'Company Website', count: 54, percentage: 13 },
    { source: 'Job Fairs', count: 33, percentage: 8 },
  ],
  rejectionReasons: [
    { reason: 'Skills Mismatch', count: 45, percentage: 30 },
    { reason: 'Experience Level', count: 38, percentage: 25 },
    { reason: 'Salary Expectations', count: 30, percentage: 20 },
    { reason: 'Cultural Fit', count: 23, percentage: 15 },
    { reason: 'Failed Technical', count: 15, percentage: 10 },
  ],
};

export const availableTimeSlots = [
  '09:00', '09:30', '10:00', '10:30', '11:00', '11:30',
  '13:00', '13:30', '14:00', '14:30', '15:00', '15:30', '16:00', '16:30',
];

export const mockCalendarAvailability = {
  '2024-01-18': ['09:00', '10:30', '14:00', '15:30'],
  '2024-01-19': ['09:30', '11:00', '13:00', '14:30', '16:00'],
  '2024-01-20': ['10:00', '11:30', '13:30', '15:00'],
  '2024-01-22': ['09:00', '10:00', '11:00', '14:00', '15:00', '16:00'],
  '2024-01-23': ['09:30', '10:30', '13:00', '14:30'],
};
