import { useState, useMemo } from 'react';
import { useSurveys, SurveyResponse } from '@/lib/surveyStore';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from '@/components/ui/table';
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from '@/components/ui/select';
import {
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription,
} from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Search, Star, Eye, ClipboardList, ThumbsUp, ThumbsDown, TrendingUp } from 'lucide-react';
import { cn } from '@/lib/utils';

function Stars({ count }: { count: number }) {
  return (
    <div className="flex gap-0.5">
      {[1, 2, 3, 4, 5].map((s) => (
        <Star
          key={s}
          className={cn('h-3.5 w-3.5', s <= count ? 'fill-secondary text-secondary' : 'text-muted-foreground/20')}
        />
      ))}
    </div>
  );
}

export default function HRSurveys() {
  const { surveys } = useSurveys();
  const [search, setSearch] = useState('');
  const [stageFilter, setStageFilter] = useState<string>('all');
  const [selected, setSelected] = useState<SurveyResponse | null>(null);

  const filtered = useMemo(() => {
    let result = [...surveys];
    if (search) {
      const q = search.toLowerCase();
      result = result.filter(
        (s) =>
          s.candidateName.toLowerCase().includes(q) ||
          s.position.toLowerCase().includes(q) ||
          s.department.toLowerCase().includes(q)
      );
    }
    if (stageFilter !== 'all') {
      result = result.filter((s) => s.stage === stageFilter);
    }
    return result;
  }, [surveys, search, stageFilter]);

  const avgOverall = surveys.length
    ? (surveys.reduce((sum, s) => sum + s.overallRating, 0) / surveys.length).toFixed(1)
    : '0';
  const avgNps = surveys.length
    ? (surveys.reduce((sum, s) => sum + (s.npsScore ?? 0), 0) / surveys.length).toFixed(1)
    : '0';
  const recommendRate = surveys.length
    ? Math.round((surveys.filter((s) => s.wouldRecommend).length / surveys.length) * 100)
    : 0;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl lg:text-3xl font-bold">Candidate Surveys</h1>
        <p className="text-muted-foreground mt-1">Review feedback from hired and rejected candidates</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4 flex items-center gap-3">
            <div className="p-2 rounded-lg bg-primary/10">
              <ClipboardList className="h-5 w-5 text-primary" />
            </div>
            <div>
              <p className="text-2xl font-bold">{surveys.length}</p>
              <p className="text-xs text-muted-foreground">Total Responses</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 flex items-center gap-3">
            <div className="p-2 rounded-lg bg-secondary/10">
              <Star className="h-5 w-5 text-secondary" />
            </div>
            <div>
              <p className="text-2xl font-bold">{avgOverall}</p>
              <p className="text-xs text-muted-foreground">Avg. Rating</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 flex items-center gap-3">
            <div className="p-2 rounded-lg bg-primary/10">
              <TrendingUp className="h-5 w-5 text-primary" />
            </div>
            <div>
              <p className="text-2xl font-bold">{avgNps}</p>
              <p className="text-xs text-muted-foreground">Avg. NPS Score</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 flex items-center gap-3">
            <div className="p-2 rounded-lg bg-primary/10">
              <ThumbsUp className="h-5 w-5 text-primary" />
            </div>
            <div>
              <p className="text-2xl font-bold">{recommendRate}%</p>
              <p className="text-xs text-muted-foreground">Would Recommend</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input placeholder="Search by name, position, department..." value={search} onChange={(e) => setSearch(e.target.value)} className="pl-10" />
        </div>
        <Select value={stageFilter} onValueChange={setStageFilter}>
          <SelectTrigger className="w-full sm:w-[180px]">
            <SelectValue placeholder="Filter by outcome" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Outcomes</SelectItem>
            <SelectItem value="Hired">Hired</SelectItem>
            <SelectItem value="Rejected">Rejected</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Table */}
      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Candidate</TableHead>
                <TableHead>Position</TableHead>
                <TableHead>Outcome</TableHead>
                <TableHead>Overall</TableHead>
                <TableHead>Recommend</TableHead>
                <TableHead>Date</TableHead>
                <TableHead className="text-right">Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filtered.map((s) => (
                <TableRow key={s.id}>
                  <TableCell className="font-medium">{s.candidateName}</TableCell>
                  <TableCell>
                    <div>
                      <p className="text-sm">{s.position}</p>
                      <p className="text-xs text-muted-foreground">{s.department}</p>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant={s.stage === 'Hired' ? 'default' : 'destructive'} className="text-xs">
                      {s.stage}
                    </Badge>
                  </TableCell>
                  <TableCell><Stars count={s.overallRating} /></TableCell>
                  <TableCell>
                    {s.wouldRecommend ? (
                      <ThumbsUp className="h-4 w-4 text-primary" />
                    ) : (
                      <ThumbsDown className="h-4 w-4 text-destructive" />
                    )}
                  </TableCell>
                  <TableCell className="text-sm text-muted-foreground">
                    {new Date(s.submittedAt).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })}
                  </TableCell>
                  <TableCell className="text-right">
                    <Button variant="ghost" size="sm" onClick={() => setSelected(s)}>
                      <Eye className="h-4 w-4 mr-1" /> View
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
              {filtered.length === 0 && (
                <TableRow>
                  <TableCell colSpan={7} className="text-center py-8 text-muted-foreground">
                    No survey responses found
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Detail Dialog */}
      <Dialog open={!!selected} onOpenChange={() => setSelected(null)}>
        <DialogContent className="max-w-lg max-h-[85vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Survey Response</DialogTitle>
            <DialogDescription>{selected?.candidateName} — {selected?.position}</DialogDescription>
          </DialogHeader>
          {selected && (
            <div className="space-y-4 py-2">
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Outcome</span>
                <Badge variant={selected.stage === 'Hired' ? 'default' : 'destructive'}>{selected.stage}</Badge>
              </div>

              <Separator />
              <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Recruiter & Process</p>
              <div className="space-y-2.5">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Recruiter Responsiveness</span>
                  <Stars count={selected.recruiterRating ?? 0} />
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Communication Quality</span>
                  <Stars count={selected.communicationRating} />
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Speed of Process</span>
                  <Stars count={selected.timeToHireRating ?? 0} />
                </div>
              </div>

              <Separator />
              <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Interview Experience</p>
              <div className="space-y-2.5">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Interview Structure</span>
                  <Stars count={selected.processRating} />
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Interviewer Quality</span>
                  <Stars count={selected.interviewExperienceRating ?? 0} />
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Process Fairness</span>
                  <Stars count={selected.fairnessRating ?? 0} />
                </div>
              </div>
              {selected.highlights && (
                <div className="space-y-1">
                  <span className="text-xs text-muted-foreground">What stood out positively</span>
                  <p className="text-sm bg-muted/50 rounded-lg p-3">{selected.highlights}</p>
                </div>
              )}

              <Separator />
              <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Overall Impression</p>
              <div className="space-y-2.5">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Overall Experience</span>
                  <Stars count={selected.overallRating} />
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">NPS Score</span>
                  <span className="text-sm font-semibold">{selected.npsScore ?? '—'} / 10</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Would Recommend</span>
                  {selected.wouldRecommend ? (
                    <span className="text-primary text-sm font-medium flex items-center gap-1"><ThumbsUp className="h-3.5 w-3.5" /> Yes</span>
                  ) : (
                    <span className="text-destructive text-sm font-medium flex items-center gap-1"><ThumbsDown className="h-3.5 w-3.5" /> No</span>
                  )}
                </div>
                {selected.applyAgain !== null && selected.applyAgain !== undefined && (
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Would Apply Again</span>
                    <span className="text-sm font-medium capitalize">
                      {selected.applyAgain === true ? 'Yes' : selected.applyAgain === false ? 'No' : 'Maybe'}
                    </span>
                  </div>
                )}
              </div>
              {selected.improvements && (
                <div className="space-y-1">
                  <span className="text-xs text-muted-foreground">Suggested Improvements</span>
                  <p className="text-sm bg-muted/50 rounded-lg p-3">{selected.improvements}</p>
                </div>
              )}
              {selected.feedback && (
                <div className="space-y-1">
                  <span className="text-xs text-muted-foreground">Additional Comments</span>
                  <p className="text-sm bg-muted/50 rounded-lg p-3">{selected.feedback}</p>
                </div>
              )}
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
