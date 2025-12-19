export interface CandidateApplication {
  id: string;
  position: string;
  department: string;
  appliedDate: string;
  aiScore: number;
  currentStage: 'Under Review' | 'Interview' | 'Rejected' | 'Hired' | 'Screening' | 'Salary Negotiation';
  nextStep: string;
}

export interface CandidateProfile {
  id: string;
  fullName: string;
  email: string;
  phone: string;
  address: string;
  linkedinUrl: string;
  avatarUrl: string;
  resumeFileName: string | null;
  resumeUploadDate: string | null;
}

export const mockCandidateProfile: CandidateProfile = {
  id: '1',
  fullName: 'Andi Prasetyo',
  email: 'andi.prasetyo@email.com',
  phone: '+62 812 3456 7890',
  address: 'Jakarta Selatan, DKI Jakarta',
  linkedinUrl: 'https://linkedin.com/in/andiprasetyo',
  avatarUrl: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
  resumeFileName: 'Andi_Prasetyo_CV.pdf',
  resumeUploadDate: '2025-01-15',
};

export const mockCandidateApplications: CandidateApplication[] = [
  {
    id: '1',
    position: 'Senior Software Engineer',
    department: 'Engineering',
    appliedDate: '2025-01-10',
    aiScore: 87,
    currentStage: 'Interview',
    nextStep: 'Technical Interview pada 20 Januari',
  },
  {
    id: '2',
    position: 'Product Manager',
    department: 'Product',
    appliedDate: '2025-01-08',
    aiScore: 72,
    currentStage: 'Under Review',
    nextStep: 'Menunggu screening HR',
  },
  {
    id: '3',
    position: 'UX Designer',
    department: 'Design',
    appliedDate: '2024-12-15',
    aiScore: 65,
    currentStage: 'Rejected',
    nextStep: 'Lamaran ditutup',
  },
  {
    id: '4',
    position: 'Data Analyst',
    department: 'Analytics',
    appliedDate: '2024-11-20',
    aiScore: 91,
    currentStage: 'Hired',
    nextStep: 'Onboarding dimulai 1 Februari',
  },
  {
    id: '5',
    position: 'Marketing Specialist',
    department: 'Marketing',
    appliedDate: '2025-01-12',
    aiScore: 78,
    currentStage: 'Screening',
    nextStep: 'Phone screening terjadwal',
  },
];

export const getApplicationStatusCounts = () => {
  const counts = {
    underReview: 0,
    interview: 0,
    rejected: 0,
    hired: 0,
  };

  mockCandidateApplications.forEach((app) => {
    switch (app.currentStage) {
      case 'Under Review':
      case 'Screening':
        counts.underReview++;
        break;
      case 'Interview':
      case 'Salary Negotiation':
        counts.interview++;
        break;
      case 'Rejected':
        counts.rejected++;
        break;
      case 'Hired':
        counts.hired++;
        break;
    }
  });

  return counts;
};
