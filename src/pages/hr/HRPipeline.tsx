import { useState, useMemo } from 'react';
import { 
  User, 
  GripVertical,
  Star,
  Mail,
  MoreVertical,
  ChevronLeft,
  ChevronRight,
  Briefcase,
  Filter,
  Search,
  X
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { useToast } from '@/hooks/use-toast';
import { mockCandidates, Candidate, PipelineStage, pipelineStages } from '@/lib/mockHRData';

interface JobOpening {
  position: string;
  department: string;
  candidateCount: number;
}

export default function HRPipeline() {
  const [candidates, setCandidates] = useState<Candidate[]>(mockCandidates);
  const [rejectCandidate, setRejectCandidate] = useState<Candidate | null>(null);
  const [selectedJob, setSelectedJob] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [sourceFilter, setSourceFilter] = useState<string>('all');
  const [scoreFilter, setScoreFilter] = useState<string>('all');
  const { toast } = useToast();

  // Derive unique job openings from candidates
  const jobOpenings = useMemo<JobOpening[]>(() => {
    const jobMap = new Map<string, JobOpening>();
    candidates.forEach((c) => {
      if (!jobMap.has(c.position)) {
        jobMap.set(c.position, { position: c.position, department: c.department, candidateCount: 0 });
      }
      jobMap.get(c.position)!.candidateCount++;
    });
    return Array.from(jobMap.values());
  }, [candidates]);

  // Unique sources for filter
  const sources = useMemo(() => {
    const s = new Set(candidates.map((c) => c.source));
    return Array.from(s);
  }, [candidates]);

  // Filtered candidates
  const filteredCandidates = useMemo(() => {
    if (!selectedJob) return [];
    let result = candidates.filter((c) => c.position === selectedJob);
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      result = result.filter((c) => c.name.toLowerCase().includes(q) || c.email.toLowerCase().includes(q));
    }
    if (sourceFilter !== 'all') {
      result = result.filter((c) => c.source === sourceFilter);
    }
    if (scoreFilter === 'high') {
      result = result.filter((c) => c.aiScore >= 85);
    } else if (scoreFilter === 'medium') {
      result = result.filter((c) => c.aiScore >= 70 && c.aiScore < 85);
    } else if (scoreFilter === 'low') {
      result = result.filter((c) => c.aiScore < 70);
    }
    return result;
  }, [selectedJob, candidates, searchQuery, sourceFilter, scoreFilter]);

  const getCandidatesByStage = (stage: PipelineStage) => {
    const stageCandidates = filteredCandidates.filter(c => c.stage === stage);
    if (stage === 'applied') {
      return stageCandidates.sort((a, b) => b.aiScore - a.aiScore);
    }
    return stageCandidates;
  };

  const moveCandidate = (candidateId: string, newStage: PipelineStage) => {
    setCandidates(prev => prev.map(c => 
      c.id === candidateId ? { ...c, stage: newStage } : c
    ));

    const candidate = candidates.find(c => c.id === candidateId);
    const stageInfo = pipelineStages.find(s => s.key === newStage);

    if (newStage === 'rejected') {
      toast({
        title: 'Candidate Rejected',
        description: `Auto-rejection email sent to ${candidate?.name}`,
      });
    } else {
      toast({
        title: 'Candidate Moved',
        description: `${candidate?.name} moved to ${stageInfo?.label}`,
      });
    }
  };

  const handleReject = () => {
    if (rejectCandidate) {
      moveCandidate(rejectCandidate.id, 'rejected');
      setRejectCandidate(null);
    }
  };

  const getNextStage = (currentStage: PipelineStage): PipelineStage | null => {
    const currentIndex = pipelineStages.findIndex(s => s.key === currentStage);
    if (currentIndex < pipelineStages.length - 2) {
      return pipelineStages[currentIndex + 1].key;
    }
    return null;
  };

  const getPreviousStage = (currentStage: PipelineStage): PipelineStage | null => {
    const currentIndex = pipelineStages.findIndex(s => s.key === currentStage);
    if (currentIndex > 0) {
      return pipelineStages[currentIndex - 1].key;
    }
    return null;
  };

  const clearFilters = () => {
    setSearchQuery('');
    setSourceFilter('all');
    setScoreFilter('all');
  };

  const hasActiveFilters = searchQuery || sourceFilter !== 'all' || scoreFilter !== 'all';

  // Job selection view
  if (!selectedJob) {
    return (
      <div className="p-6 lg:p-8 space-y-6">
        <div>
          <h1 className="text-2xl lg:text-3xl font-bold">Hiring Pipeline</h1>
          <p className="text-muted-foreground mt-1">Select a job opening to view its candidate pipeline</p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {jobOpenings.map((job) => (
            <Card
              key={job.position}
              className="cursor-pointer hover:shadow-md hover:border-primary/50 transition-all"
              onClick={() => setSelectedJob(job.position)}
            >
              <CardContent className="p-6">
                <div className="flex items-start gap-3">
                  <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <Briefcase className="h-5 w-5 text-primary" />
                  </div>
                  <div className="min-w-0">
                    <h3 className="font-semibold text-sm">{job.position}</h3>
                    <p className="text-xs text-muted-foreground mt-0.5">{job.department}</p>
                    <Badge variant="secondary" className="mt-2 text-xs">
                      {job.candidateCount} candidate{job.candidateCount !== 1 ? 's' : ''}
                    </Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  // Pipeline view for selected job
  return (
    <div className="p-6 lg:p-8 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="flex items-center gap-3">
          <Button variant="ghost" size="icon" onClick={() => { setSelectedJob(null); clearFilters(); }}>
            <ChevronLeft className="h-5 w-5" />
          </Button>
          <div>
            <h1 className="text-2xl lg:text-3xl font-bold">{selectedJob}</h1>
            <p className="text-muted-foreground mt-1">
              {filteredCandidates.length} candidate{filteredCandidates.length !== 1 ? 's' : ''} in pipeline
            </p>
          </div>
        </div>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center">
            <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
              <Filter className="h-4 w-4" />
              Filters
            </div>
            <div className="flex flex-wrap gap-3 flex-1">
              <div className="relative w-full sm:w-56">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search candidate..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-9 h-9"
                />
              </div>
              <Select value={sourceFilter} onValueChange={setSourceFilter}>
                <SelectTrigger className="w-full sm:w-40 h-9">
                  <SelectValue placeholder="Source" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Sources</SelectItem>
                  {sources.map((s) => (
                    <SelectItem key={s} value={s}>{s}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Select value={scoreFilter} onValueChange={setScoreFilter}>
                <SelectTrigger className="w-full sm:w-40 h-9">
                  <SelectValue placeholder="AI Score" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Scores</SelectItem>
                  <SelectItem value="high">High (85+)</SelectItem>
                  <SelectItem value="medium">Medium (70-84)</SelectItem>
                  <SelectItem value="low">Low (&lt;70)</SelectItem>
                </SelectContent>
              </Select>
              {hasActiveFilters && (
                <Button variant="ghost" size="sm" onClick={clearFilters} className="h-9">
                  <X className="h-4 w-4 mr-1" />
                  Clear
                </Button>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Kanban Board */}
      <ScrollArea className="w-full pb-4">
        <div className="flex gap-4 min-w-max">
          {pipelineStages.map((stage) => {
            const stageCandidates = getCandidatesByStage(stage.key);
            return (
              <div key={stage.key} className="w-80 flex-shrink-0">
                <Card className="h-full">
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-sm font-medium flex items-center gap-2">
                        <div className={`h-3 w-3 rounded-full ${stage.color}`} />
                        {stage.label}
                      </CardTitle>
                      <Badge variant="secondary">{stageCandidates.length}</Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <ScrollArea className="h-[calc(100vh-380px)]">
                      <div className="space-y-3 pr-4">
                        {stageCandidates.map((candidate) => (
                          <Card 
                            key={candidate.id} 
                            className="cursor-grab active:cursor-grabbing hover:shadow-md transition-shadow"
                          >
                            <CardContent className="p-4">
                              <div className="flex items-start justify-between mb-2">
                                <div className="flex items-center gap-2">
                                  <GripVertical className="h-4 w-4 text-muted-foreground" />
                                  <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
                                    <span className="text-xs font-medium text-primary">
                                      {candidate.name.split(' ').map(n => n[0]).join('')}
                                    </span>
                                  </div>
                                </div>
                                <DropdownMenu>
                                  <DropdownMenuTrigger asChild>
                                    <Button variant="ghost" size="icon" className="h-8 w-8">
                                      <MoreVertical className="h-4 w-4" />
                                    </Button>
                                  </DropdownMenuTrigger>
                                  <DropdownMenuContent align="end">
                                    {getPreviousStage(candidate.stage) && (
                                      <DropdownMenuItem onClick={() => moveCandidate(candidate.id, getPreviousStage(candidate.stage)!)}>
                                        <ChevronLeft className="h-4 w-4 mr-2" />
                                        Move to {pipelineStages.find(s => s.key === getPreviousStage(candidate.stage))?.label}
                                      </DropdownMenuItem>
                                    )}
                                    {getNextStage(candidate.stage) && (
                                      <DropdownMenuItem onClick={() => moveCandidate(candidate.id, getNextStage(candidate.stage)!)}>
                                        <ChevronRight className="h-4 w-4 mr-2" />
                                        Move to {pipelineStages.find(s => s.key === getNextStage(candidate.stage))?.label}
                                      </DropdownMenuItem>
                                    )}
                                    <DropdownMenuItem>
                                      <Mail className="h-4 w-4 mr-2" />
                                      Send Email
                                    </DropdownMenuItem>
                                    {candidate.stage !== 'rejected' && candidate.stage !== 'hired' && (
                                      <DropdownMenuItem 
                                        className="text-red-600"
                                        onClick={() => setRejectCandidate(candidate)}
                                      >
                                        Reject Candidate
                                      </DropdownMenuItem>
                                    )}
                                  </DropdownMenuContent>
                                </DropdownMenu>
                              </div>

                              <div className="ml-6">
                                <p className="font-medium text-sm">{candidate.name}</p>
                                <p className="text-xs text-muted-foreground">{candidate.source}</p>
                                
                                <div className="flex items-center gap-2 mt-2">
                                  <div className="flex items-center gap-1">
                                    <Star className="h-3 w-3 text-amber-500" />
                                    <span className="text-xs font-medium">{candidate.aiScore}</span>
                                  </div>
                                  <span className="text-xs text-muted-foreground">
                                    {candidate.experience}y exp
                                  </span>
                                </div>

                                <div className="flex flex-wrap gap-1 mt-2">
                                  {candidate.skills.slice(0, 2).map((skill) => (
                                    <Badge key={skill} variant="outline" className="text-[10px] px-1.5 py-0">
                                      {skill}
                                    </Badge>
                                  ))}
                                </div>

                                <p className="text-[10px] text-muted-foreground mt-2">
                                  Applied: {candidate.appliedDate}
                                </p>
                              </div>
                            </CardContent>
                          </Card>
                        ))}

                        {stageCandidates.length === 0 && (
                          <div className="py-8 text-center text-muted-foreground">
                            <User className="h-8 w-8 mx-auto mb-2 opacity-50" />
                            <p className="text-sm">No candidates</p>
                          </div>
                        )}
                      </div>
                    </ScrollArea>
                  </CardContent>
                </Card>
              </div>
            );
          })}
        </div>
        <ScrollBar orientation="horizontal" />
      </ScrollArea>

      {/* Rejection Confirmation Dialog */}
      <AlertDialog open={!!rejectCandidate} onOpenChange={() => setRejectCandidate(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Reject Candidate</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to reject {rejectCandidate?.name}? 
              An automatic rejection email will be sent to the candidate.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleReject} className="bg-red-600 hover:bg-red-700">
              Reject & Send Email
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
