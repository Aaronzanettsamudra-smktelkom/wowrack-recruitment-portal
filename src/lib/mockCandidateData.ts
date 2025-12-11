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
  fullName: 'John Doe',
  email: 'john.doe@email.com',
  phone: '+62 812 3456 7890',
  address: 'Jakarta, Indonesia',
  linkedinUrl: 'https://linkedin.com/in/johndoe',
  avatarUrl: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
  resumeFileName: 'John_Doe_Resume.pdf',
  resumeUploadDate: '2024-01-15',
};

export const mockCandidateApplications: CandidateApplication[] = [
  {
    id: '1',
    position: 'Senior Software Engineer',
    department: 'Engineering',
    appliedDate: '2024-01-10',
    aiScore: 87,
    currentStage: 'Interview',
    nextStep: 'Technical Interview on Jan 20',
  },
  {
    id: '2',
    position: 'Product Manager',
    department: 'Product',
    appliedDate: '2024-01-08',
    aiScore: 72,
    currentStage: 'Under Review',
    nextStep: 'Waiting for HR screening',
  },
  {
    id: '3',
    position: 'UX Designer',
    department: 'Design',
    appliedDate: '2023-12-15',
    aiScore: 65,
    currentStage: 'Rejected',
    nextStep: 'Application closed',
  },
  {
    id: '4',
    position: 'Data Analyst',
    department: 'Analytics',
    appliedDate: '2023-11-20',
    aiScore: 91,
    currentStage: 'Hired',
    nextStep: 'Onboarding starts Feb 1',
  },
  {
    id: '5',
    position: 'Marketing Specialist',
    department: 'Marketing',
    appliedDate: '2024-01-12',
    aiScore: 78,
    currentStage: 'Screening',
    nextStep: 'Phone screening scheduled',
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
