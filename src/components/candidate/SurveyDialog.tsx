import { useState } from 'react';
import {
  Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Star } from 'lucide-react';
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
  }) => void;
}

function StarRating({ value, onChange, label }: { value: number; onChange: (v: number) => void; label: string }) {
  return (
    <div className="space-y-1.5">
      <Label className="text-sm font-medium">{label}</Label>
      <div className="flex gap-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            type="button"
            onClick={() => onChange(star)}
            className="p-0.5 hover:scale-110 transition-transform"
          >
            <Star
              className={cn(
                'h-6 w-6 transition-colors',
                star <= value ? 'fill-amber-400 text-amber-400' : 'text-muted-foreground/30'
              )}
            />
          </button>
        ))}
      </div>
    </div>
  );
}

export default function SurveyDialog({ open, onOpenChange, applicationId, position, department, stage, onSubmit }: SurveyDialogProps) {
  const [overallRating, setOverallRating] = useState(0);
  const [processRating, setProcessRating] = useState(0);
  const [communicationRating, setCommunicationRating] = useState(0);
  const [feedback, setFeedback] = useState('');
  const [wouldRecommend, setWouldRecommend] = useState<string>('');

  const handleSubmit = () => {
    if (!overallRating || !processRating || !communicationRating || !wouldRecommend) return;
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
      candidateName: 'Andi Prasetyo', // from mock auth
    });
    // Reset
    setOverallRating(0);
    setProcessRating(0);
    setCommunicationRating(0);
    setFeedback('');
    setWouldRecommend('');
    onOpenChange(false);
  };

  const isValid = overallRating > 0 && processRating > 0 && communicationRating > 0 && wouldRecommend !== '';

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Candidate Experience Survey</DialogTitle>
          <DialogDescription>
            Share your feedback about the recruitment process for <span className="font-medium text-foreground">{position}</span>.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-5 py-2">
          <StarRating label="Overall Experience *" value={overallRating} onChange={setOverallRating} />
          <StarRating label="Recruitment Process *" value={processRating} onChange={setProcessRating} />
          <StarRating label="Communication Quality *" value={communicationRating} onChange={setCommunicationRating} />

          <div className="space-y-2">
            <Label className="text-sm font-medium">Would you recommend others to apply here? *</Label>
            <RadioGroup value={wouldRecommend} onValueChange={setWouldRecommend}>
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
            <Label htmlFor="feedback" className="text-sm font-medium">Additional Feedback</Label>
            <Textarea
              id="feedback"
              placeholder="Share any additional thoughts about your experience..."
              value={feedback}
              onChange={(e) => setFeedback(e.target.value)}
              rows={3}
            />
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>Cancel</Button>
          <Button onClick={handleSubmit} disabled={!isValid}>Submit Survey</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
