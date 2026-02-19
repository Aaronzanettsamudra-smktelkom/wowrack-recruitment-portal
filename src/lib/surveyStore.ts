import { useSyncExternalStore } from 'react';

export interface SurveyResponse {
  id: string;
  applicationId: string;
  candidateName: string;
  position: string;
  department: string;
  stage: 'Hired' | 'Rejected';
  submittedAt: string;
  overallRating: number;
  processRating: number;
  communicationRating: number;
  feedback: string;
  wouldRecommend: boolean;
  // Extended fields
  recruiterRating: number;
  interviewExperienceRating: number;
  fairnessRating: number;
  timeToHireRating: number;
  npsScore: number;
  highlights: string;
  improvements: string;
  applyAgain: boolean | null;
}

let surveys: SurveyResponse[] = [
  {
    id: 'survey-1',
    applicationId: '6',
    candidateName: 'Andi Prasetyo',
    position: 'DevOps Engineer',
    department: 'Engineering',
    stage: 'Hired',
    submittedAt: '2025-01-28',
    overallRating: 5,
    processRating: 4,
    communicationRating: 5,
    feedback: 'The recruitment process was smooth and professional. The team was very welcoming during the interviews.',
    wouldRecommend: true,
    recruiterRating: 5,
    interviewExperienceRating: 4,
    fairnessRating: 5,
    timeToHireRating: 4,
    npsScore: 9,
    highlights: 'Very responsive recruiter and structured interview process.',
    improvements: 'Could provide more timeline clarity between stages.',
    applyAgain: true,
  },
];

let listeners: Array<() => void> = [];

function emitChange() {
  listeners.forEach((l) => l());
}

export function getSurveys() {
  return surveys;
}

function subscribe(listener: () => void) {
  listeners = [...listeners, listener];
  return () => {
    listeners = listeners.filter((l) => l !== listener);
  };
}

export function addSurvey(survey: Omit<SurveyResponse, 'id' | 'submittedAt'>) {
  const newSurvey: SurveyResponse = {
    ...survey,
    id: `survey-${Date.now()}`,
    submittedAt: new Date().toISOString().split('T')[0],
  };
  surveys = [...surveys, newSurvey];
  emitChange();
}

export function hasSubmittedSurvey(applicationId: string): boolean {
  return surveys.some((s) => s.applicationId === applicationId);
}

export function useSurveys() {
  const data = useSyncExternalStore(subscribe, getSurveys, getSurveys);
  return { surveys: data, addSurvey, hasSubmittedSurvey };
}
