import { useState } from 'react';
import {
  Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Progress } from '@/components/ui/progress';
import { Star, ChevronRight, ChevronLeft } from 'lucide-react';
import { cn } from '@/lib/utils';

interface SurveyDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  applicationId: string;
  position: string;
  department: string;
  stage: 'Hired' | 'Rejected';
  onSubmit: (data: {
    applicationId: string;
    position: string;
    department: string;
    stage: 'Hired' | 'Rejected';
    overallRating: number;
    processRating: number;
    communicationRating: number;
    feedback: string;
    wouldRecommend: boolean;
    candidateName: string;
    // Extended fields
    recruiterRating: number;
    interviewExperienceRating: number;
    fairnessRating: number;
    timeToHireRating: number;
    npsScore: number;
    highlights: string;
    improvements: string;
    applyAgain: boolean | null;
  }) => void;
}

function StarRating({ value, onChange, label, description }: {
  value: number;
  onChange: (v: number) => void;
  label: string;
  description?: string;
}) {
  const [hovered, setHovered] = useState(0);
  const labels = ['', 'Very Poor', 'Poor', 'Fair', 'Good', 'Excellent'];

  return (
    <div className="space-y-1.5">
      <div>
        <Label className="text-sm font-medium">{label}</Label>
        {description && <p className="text-xs text-muted-foreground mt-0.5">{description}</p>}
      </div>
      <div className="flex items-center gap-2">
        <div className="flex gap-1">
          {[1, 2, 3, 4, 5].map((star) => (
            <button
              key={star}
              type="button"
              onClick={() => onChange(star)}
              onMouseEnter={() => setHovered(star)}
              onMouseLeave={() => setHovered(0)}
              className="p-0.5 hover:scale-110 transition-transform"
            >
              <Star
                className={cn(
                  'h-6 w-6 transition-colors',
                  star <= (hovered || value)
                    ? 'fill-secondary text-secondary'
                    : 'text-muted-foreground/20'
                )}
              />
            </button>
          ))}
        </div>
        {(hovered || value) > 0 && (
          <span className="text-xs text-muted-foreground">{labels[hovered || value]}</span>
        )}
      </div>
    </div>
  );
}

function NPSSelector({ value, onChange }: { value: number; onChange: (v: number) => void }) {
  return (
    <div className="space-y-2">
      <Label className="text-sm font-medium">
        How likely are you to recommend others to apply to Wowrack? *
      </Label>
      <p className="text-xs text-muted-foreground">0 = Not at all likely, 10 = Extremely likely</p>
      <div className="flex flex-wrap gap-1.5 mt-2">
        {[0,1,2,3,4,5,6,7,8,9,10].map((n) => (
          <button
            key={n}
            type="button"
            onClick={() => onChange(n)}
            className={cn(
              'w-9 h-9 rounded-lg text-sm font-medium border transition-all',
              value === n
                ? n >= 9
                  ? 'bg-primary text-primary-foreground border-primary'
                  : n >= 7
                  ? 'bg-secondary text-secondary-foreground border-secondary'
                  : 'bg-destructive text-destructive-foreground border-destructive'
                : 'bg-background border-border hover:border-primary/50 text-foreground'
            )}
          >
            {n}
          </button>
        ))}
      </div>
      <div className="flex justify-between text-xs text-muted-foreground px-0.5">
        <span>Not likely</span>
        <span>Extremely likely</span>
      </div>
    </div>
  );
}

const STEPS = [
  { title: 'Recruiter & Process', subtitle: 'Rate your interactions with the hiring team' },
  { title: 'Interview Experience', subtitle: 'Share your interview experience' },
  { title: 'Overall Impression', subtitle: 'Your overall thoughts on the process' },
];

export default function SurveyDialog({
  open, onOpenChange, applicationId, position, department, stage, onSubmit,
}: SurveyDialogProps) {
  const [step, setStep] = useState(0);

  // Step 1 – Recruiter & Process
  const [communicationRating, setCommunicationRating] = useState(0);
  const [recruiterRating, setRecruiterRating] = useState(0);
  const [timeToHireRating, setTimeToHireRating] = useState(0);

  // Step 2 – Interview Experience
  const [processRating, setProcessRating] = useState(0);
  const [interviewExperienceRating, setInterviewExperienceRating] = useState(0);
  const [fairnessRating, setFairnessRating] = useState(0);
  const [highlights, setHighlights] = useState('');

  // Step 3 – Overall
  const [overallRating, setOverallRating] = useState(0);
  const [npsScore, setNpsScore] = useState<number>(-1);
  const [wouldRecommend, setWouldRecommend] = useState('');
  const [applyAgain, setApplyAgain] = useState('');
  const [improvements, setImprovements] = useState('');
  const [feedback, setFeedback] = useState('');

  const reset = () => {
    setStep(0);
    setCommunicationRating(0); setRecruiterRating(0); setTimeToHireRating(0);
    setProcessRating(0); setInterviewExperienceRating(0); setFairnessRating(0);
    setHighlights(''); setOverallRating(0); setNpsScore(-1);
    setWouldRecommend(''); setApplyAgain(''); setImprovements(''); setFeedback('');
  };

  const step1Valid = communicationRating > 0 && recruiterRating > 0 && timeToHireRating > 0;
  const step2Valid = processRating > 0 && interviewExperienceRating > 0 && fairnessRating > 0;
  const step3Valid = overallRating > 0 && npsScore >= 0 && wouldRecommend !== '';

  const canProceed = [step1Valid, step2Valid, step3Valid][step];

  const handleSubmit = () => {
    if (!step3Valid) return;
    onSubmit({
      applicationId,
      position,
      department,
      stage,
      overallRating,
      processRating,
      communicationRating,
      feedback,
      wouldRecommend: wouldRecommend === 'yes',
      candidateName: 'Andi Prasetyo',
      recruiterRating,
      interviewExperienceRating,
      fairnessRating,
      timeToHireRating,
      npsScore,
      highlights,
      improvements,
      applyAgain: applyAgain === '' ? null : applyAgain === 'yes',
    });
    reset();
    onOpenChange(false);
  };

  const handleNext = () => {
    if (step < STEPS.length - 1) setStep(step + 1);
    else handleSubmit();
  };

  const handleBack = () => {
    if (step > 0) setStep(step - 1);
    else { reset(); onOpenChange(false); }
  };

  const progress = ((step + 1) / STEPS.length) * 100;

  return (
    <Dialog open={open} onOpenChange={(o) => { if (!o) { reset(); onOpenChange(false); } }}>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle>Candidate Experience Survey</DialogTitle>
          <DialogDescription>
            <span className="font-medium text-foreground">{position}</span>
            {' '}· {stage === 'Hired' ? '🎉 Congratulations on your offer!' : 'Thank you for your time.'}
          </DialogDescription>
        </DialogHeader>

        {/* Progress */}
        <div className="space-y-1.5">
          <div className="flex justify-between text-xs text-muted-foreground">
            <span className="font-medium text-foreground">{STEPS[step].title}</span>
            <span>Step {step + 1} of {STEPS.length}</span>
          </div>
          <Progress value={progress} className="h-1.5" />
          <p className="text-xs text-muted-foreground">{STEPS[step].subtitle}</p>
        </div>

        {/* Step 1 – Recruiter & Process */}
        {step === 0 && (
          <div className="space-y-5 py-2">
            <StarRating
              label="Recruiter Responsiveness *"
              description="How promptly did the recruiter communicate with you?"
              value={recruiterRating}
              onChange={setRecruiterRating}
            />
            <StarRating
              label="Communication Quality *"
              description="Were instructions, requirements, and next steps communicated clearly?"
              value={communicationRating}
              onChange={setCommunicationRating}
            />
            <StarRating
              label="Speed of the Process *"
              description="How satisfied are you with the overall timeline from application to decision?"
              value={timeToHireRating}
              onChange={setTimeToHireRating}
            />
          </div>
        )}

        {/* Step 2 – Interview Experience */}
        {step === 1 && (
          <div className="space-y-5 py-2">
            <StarRating
              label="Interview Structure *"
              description="Were the interview stages well-organized and relevant to the role?"
              value={processRating}
              onChange={setProcessRating}
            />
            <StarRating
              label="Interviewer Quality *"
              description="How professional and prepared were the interviewers?"
              value={interviewExperienceRating}
              onChange={setInterviewExperienceRating}
            />
            <StarRating
              label="Process Fairness & Transparency *"
              description="Did you feel the process was fair and unbiased?"
              value={fairnessRating}
              onChange={setFairnessRating}
            />
            <div className="space-y-2">
              <Label htmlFor="highlights" className="text-sm font-medium">What stood out positively?</Label>
              <Textarea
                id="highlights"
                placeholder="e.g. The interviewers were very knowledgeable and welcoming..."
                value={highlights}
                onChange={(e) => setHighlights(e.target.value)}
                rows={3}
              />
            </div>
          </div>
        )}

        {/* Step 3 – Overall */}
        {step === 2 && (
          <div className="space-y-5 py-2">
            <StarRating
              label="Overall Experience *"
              description="Your overall impression of the entire recruitment process"
              value={overallRating}
              onChange={setOverallRating}
            />

            <NPSSelector value={npsScore} onChange={setNpsScore} />

            <div className="space-y-2">
              <Label className="text-sm font-medium">Would you recommend others to apply here? *</Label>
              <RadioGroup value={wouldRecommend} onValueChange={setWouldRecommend} className="flex gap-6">
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="yes" id="rec-yes" />
                  <Label htmlFor="rec-yes" className="font-normal">Yes</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="no" id="rec-no" />
                  <Label htmlFor="rec-no" className="font-normal">No</Label>
                </div>
              </RadioGroup>
            </div>

            <div className="space-y-2">
              <Label className="text-sm font-medium">Would you apply to Wowrack again in the future?</Label>
              <RadioGroup value={applyAgain} onValueChange={setApplyAgain} className="flex gap-6">
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="yes" id="again-yes" />
                  <Label htmlFor="again-yes" className="font-normal">Yes</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="no" id="again-no" />
                  <Label htmlFor="again-no" className="font-normal">No</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="maybe" id="again-maybe" />
                  <Label htmlFor="again-maybe" className="font-normal">Maybe</Label>
                </div>
              </RadioGroup>
            </div>

            <div className="space-y-2">
              <Label htmlFor="improvements" className="text-sm font-medium">What could we improve?</Label>
              <Textarea
                id="improvements"
                placeholder="e.g. Clearer timeline updates, more structured interview questions..."
                value={improvements}
                onChange={(e) => setImprovements(e.target.value)}
                rows={2}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="feedback" className="text-sm font-medium">Any additional comments?</Label>
              <Textarea
                id="feedback"
                placeholder="Anything else you'd like to share..."
                value={feedback}
                onChange={(e) => setFeedback(e.target.value)}
                rows={2}
              />
            </div>
          </div>
        )}

        <DialogFooter className="gap-2 sm:gap-0">
          <Button variant="outline" onClick={handleBack} className="gap-1">
            <ChevronLeft className="h-4 w-4" />
            {step === 0 ? 'Cancel' : 'Back'}
          </Button>
          <Button onClick={handleNext} disabled={!canProceed} className="gap-1">
            {step < STEPS.length - 1 ? (
              <>Next <ChevronRight className="h-4 w-4" /></>
            ) : (
              'Submit Survey'
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
