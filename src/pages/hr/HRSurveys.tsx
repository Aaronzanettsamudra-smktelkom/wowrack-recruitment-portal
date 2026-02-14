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
import { Search, Star, Eye, ClipboardList, ThumbsUp, ThumbsDown } from 'lucide-react';
import { cn } from '@/lib/utils';

function Stars({ count }: { count: number }) {
  return (
    <div className="flex gap-0.5">
      {[1, 2, 3, 4, 5].map((s) => (
        <Star
          key={s}
          className={cn('h-3.5 w-3.5', s <= count ? 'fill-amber-400 text-amber-400' : 'text-muted-foreground/20')}
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
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
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
            <div className="p-2 rounded-lg bg-amber-500/10">
              <Star className="h-5 w-5 text-amber-500" />
            </div>
            <div>
              <p className="text-2xl font-bold">{avgOverall}</p>
              <p className="text-xs text-muted-foreground">Avg. Overall Rating</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 flex items-center gap-3">
            <div className="p-2 rounded-lg bg-green-500/10">
              <ThumbsUp className="h-5 w-5 text-green-500" />
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
                      <ThumbsUp className="h-4 w-4 text-green-500" />
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
        <DialogContent className="max-w-md">
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
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Overall Experience</span>
                <Stars count={selected.overallRating} />
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Recruitment Process</span>
                <Stars count={selected.processRating} />
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Communication</span>
                <Stars count={selected.communicationRating} />
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Would Recommend</span>
                {selected.wouldRecommend ? (
                  <span className="text-green-600 text-sm font-medium flex items-center gap-1"><ThumbsUp className="h-3.5 w-3.5" /> Yes</span>
                ) : (
                  <span className="text-destructive text-sm font-medium flex items-center gap-1"><ThumbsDown className="h-3.5 w-3.5" /> No</span>
                )}
              </div>
              {selected.feedback && (
                <div className="space-y-1">
                  <span className="text-sm text-muted-foreground">Additional Feedback</span>
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
