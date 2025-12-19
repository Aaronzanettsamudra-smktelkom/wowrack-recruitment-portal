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
    createdAt: '2025-01-15',
  },
  {
    id: 'REQ002',
    title: 'Product Manager',
    department: 'Engineering',
    quantity: 1,
    filled: 0,
    status: 'open',
    priority: 'medium',
    createdAt: '2025-01-20',
  },
  {
    id: 'REQ003',
    title: 'Marketing Specialist',
    department: 'Marketing',
    quantity: 2,
    filled: 1,
    status: 'open',
    priority: 'low',
    createdAt: '2025-01-25',
  },
  {
    id: 'REQ004',
    title: 'Sales Representative',
    department: 'Sales',
    quantity: 5,
    filled: 3,
    status: 'open',
    priority: 'high',
    createdAt: '2025-02-01',
  },
];

export const mockForwardedCandidates: ForwardedCandidate[] = [
  {
    id: 'FC001',
    name: 'Ratna Sari Dewi',
    position: 'Senior Software Engineer',
    requisitionId: 'REQ001',
    aiScore: 92,
    forwardedDate: '2025-02-10',
    status: 'pending_review',
  },
  {
    id: 'FC002',
    name: 'Agus Hermawan',
    position: 'Senior Software Engineer',
    requisitionId: 'REQ001',
    aiScore: 88,
    forwardedDate: '2025-02-11',
    status: 'interview_scheduled',
  },
  {
    id: 'FC003',
    name: 'Lina Kusuma',
    position: 'Product Manager',
    requisitionId: 'REQ002',
    aiScore: 85,
    forwardedDate: '2025-02-12',
    status: 'interviewed',
    interviewFeedback: 'Kemampuan analitis kuat, cocok dengan budaya perusahaan.',
    interviewScore: 4,
  },
  {
    id: 'FC004',
    name: 'Dimas Putra',
    position: 'Marketing Specialist',
    requisitionId: 'REQ003',
    aiScore: 78,
    forwardedDate: '2025-02-13',
    status: 'pending_review',
  },
  {
    id: 'FC005',
    name: 'Maya Indah',
    position: 'Sales Representative',
    requisitionId: 'REQ004',
    aiScore: 91,
    forwardedDate: '2025-02-14',
    status: 'hired',
    interviewFeedback: 'Komunikasi sangat baik, rekam jejak terbukti.',
    interviewScore: 5,
  },
];

export const mockMPPRequests: MPPRequest[] = [
  {
    id: 'MPP001',
    title: 'Backend Developer',
    jobRequirement: 'Pengalaman 5+ tahun di Node.js, PostgreSQL, dan layanan cloud.',
    quantity: 2,
    salaryMin: 15000000,
    salaryMax: 25000000,
    priority: 'high',
    justification: 'Ekspansi tim diperlukan untuk peluncuran produk baru.',
    status: 'rejected',
    submittedAt: '2025-01-10',
    feedback: 'Kendala anggaran. Mohon revisi kisaran gaji atau kurangi jumlah.',
  },
  {
    id: 'MPP002',
    title: 'UX Designer',
    jobRequirement: 'Pengalaman 3+ tahun di Figma, riset pengguna, dan prototyping.',
    quantity: 1,
    salaryMin: 12000000,
    salaryMax: 18000000,
    priority: 'medium',
    justification: 'Designer saat ini kelebihan beban proyek.',
    status: 'revision_requested',
    submittedAt: '2025-01-15',
    feedback: 'Mohon berikan detail lebih lanjut tentang timeline proyek dan distribusi beban kerja.',
  },
  {
    id: 'MPP003',
    title: 'DevOps Engineer',
    jobRequirement: 'Pengalaman 4+ tahun di AWS, Docker, Kubernetes.',
    quantity: 1,
    salaryMin: 18000000,
    salaryMax: 28000000,
    priority: 'high',
    justification: 'Kritis untuk scaling infrastruktur.',
    status: 'approved',
    submittedAt: '2025-01-20',
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
