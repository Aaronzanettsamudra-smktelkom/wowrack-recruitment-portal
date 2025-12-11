export interface Requisition {
  id: string;
  title: string;
  department: string;
  quantity: number;
  filled: number;
  status: 'open' | 'closed' | 'pending';
  priority: 'high' | 'medium' | 'low';
  createdAt: string;
}

export interface ForwardedCandidate {
  id: string;
  name: string;
  position: string;
  requisitionId: string;
  aiScore: number;
  forwardedDate: string;
  status: 'pending_review' | 'interview_scheduled' | 'interviewed' | 'rejected' | 'hired';
  interviewFeedback?: string;
  interviewScore?: number;
}

export interface MPPRequest {
  id: string;
  title: string;
  jobRequirement: string;
  quantity: number;
  salaryMin: number;
  salaryMax: number;
  priority: 'high' | 'medium' | 'low';
  justification: string;
  status: 'pending' | 'approved' | 'rejected' | 'revision_requested';
  submittedAt: string;
  feedback?: string;
}

export interface HeadcountData {
  department: string;
  headcount: number;
  vacancy: number;
}

export const mockHeadcountData: HeadcountData[] = [
  { department: 'Engineering', headcount: 45, vacancy: 8 },
  { department: 'Marketing', headcount: 20, vacancy: 3 },
  { department: 'Sales', headcount: 35, vacancy: 5 },
  { department: 'HR', headcount: 12, vacancy: 2 },
  { department: 'Finance', headcount: 18, vacancy: 1 },
];

export const mockRequisitions: Requisition[] = [
  {
    id: 'REQ001',
    title: 'Senior Software Engineer',
    department: 'Engineering',
    quantity: 3,
    filled: 1,
    status: 'open',
    priority: 'high',
    createdAt: '2024-01-15',
  },
  {
    id: 'REQ002',
    title: 'Product Manager',
    department: 'Engineering',
    quantity: 1,
    filled: 0,
    status: 'open',
    priority: 'medium',
    createdAt: '2024-01-20',
  },
  {
    id: 'REQ003',
    title: 'Marketing Specialist',
    department: 'Marketing',
    quantity: 2,
    filled: 1,
    status: 'open',
    priority: 'low',
    createdAt: '2024-01-25',
  },
  {
    id: 'REQ004',
    title: 'Sales Representative',
    department: 'Sales',
    quantity: 5,
    filled: 3,
    status: 'open',
    priority: 'high',
    createdAt: '2024-02-01',
  },
];

export const mockForwardedCandidates: ForwardedCandidate[] = [
  {
    id: 'FC001',
    name: 'Alice Johnson',
    position: 'Senior Software Engineer',
    requisitionId: 'REQ001',
    aiScore: 92,
    forwardedDate: '2024-02-10',
    status: 'pending_review',
  },
  {
    id: 'FC002',
    name: 'Bob Smith',
    position: 'Senior Software Engineer',
    requisitionId: 'REQ001',
    aiScore: 88,
    forwardedDate: '2024-02-11',
    status: 'interview_scheduled',
  },
  {
    id: 'FC003',
    name: 'Carol Williams',
    position: 'Product Manager',
    requisitionId: 'REQ002',
    aiScore: 85,
    forwardedDate: '2024-02-12',
    status: 'interviewed',
    interviewFeedback: 'Strong analytical skills, good cultural fit.',
    interviewScore: 4,
  },
  {
    id: 'FC004',
    name: 'David Brown',
    position: 'Marketing Specialist',
    requisitionId: 'REQ003',
    aiScore: 78,
    forwardedDate: '2024-02-13',
    status: 'pending_review',
  },
  {
    id: 'FC005',
    name: 'Eva Martinez',
    position: 'Sales Representative',
    requisitionId: 'REQ004',
    aiScore: 91,
    forwardedDate: '2024-02-14',
    status: 'hired',
    interviewFeedback: 'Excellent communication, proven track record.',
    interviewScore: 5,
  },
];

export const mockMPPRequests: MPPRequest[] = [
  {
    id: 'MPP001',
    title: 'Backend Developer',
    jobRequirement: '5+ years experience in Node.js, PostgreSQL, and cloud services.',
    quantity: 2,
    salaryMin: 80000,
    salaryMax: 120000,
    priority: 'high',
    justification: 'Team expansion needed for new product launch.',
    status: 'rejected',
    submittedAt: '2024-01-10',
    feedback: 'Budget constraints. Please revise salary range or reduce quantity.',
  },
  {
    id: 'MPP002',
    title: 'UX Designer',
    jobRequirement: '3+ years experience in Figma, user research, and prototyping.',
    quantity: 1,
    salaryMin: 60000,
    salaryMax: 80000,
    priority: 'medium',
    justification: 'Current designer overloaded with projects.',
    status: 'revision_requested',
    submittedAt: '2024-01-15',
    feedback: 'Please provide more details on project timelines and workload distribution.',
  },
  {
    id: 'MPP003',
    title: 'DevOps Engineer',
    jobRequirement: '4+ years experience in AWS, Docker, Kubernetes.',
    quantity: 1,
    salaryMin: 90000,
    salaryMax: 130000,
    priority: 'high',
    justification: 'Critical for infrastructure scaling.',
    status: 'approved',
    submittedAt: '2024-01-20',
  },
];

export const getPipelineSummary = () => {
  const summary = {
    pendingReview: 0,
    interviewScheduled: 0,
    interviewed: 0,
    hired: 0,
    rejected: 0,
  };

  mockForwardedCandidates.forEach((candidate) => {
    switch (candidate.status) {
      case 'pending_review':
        summary.pendingReview++;
        break;
      case 'interview_scheduled':
        summary.interviewScheduled++;
        break;
      case 'interviewed':
        summary.interviewed++;
        break;
      case 'hired':
        summary.hired++;
        break;
      case 'rejected':
        summary.rejected++;
        break;
    }
  });

  return summary;
};
