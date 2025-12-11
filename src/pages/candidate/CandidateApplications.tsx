import { mockCandidateApplications } from '@/lib/mockCandidateData';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Progress } from '@/components/ui/progress';

export default function CandidateApplications() {
  const getStageColor = (stage: string) => {
    switch (stage) {
      case 'Hired':
        return 'bg-green-500/10 text-green-600';
      case 'Rejected':
        return 'bg-destructive/10 text-destructive';
      case 'Interview':
      case 'Salary Negotiation':
        return 'bg-blue-500/10 text-blue-600';
      default:
        return 'bg-amber-500/10 text-amber-600';
    }
  };

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-600';
    if (score >= 60) return 'text-amber-600';
    return 'text-destructive';
  };

  return (
    <div className="p-6 lg:p-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold">My Applications</h1>
        <p className="text-muted-foreground mt-1">View all your job applications</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Applications ({mockCandidateApplications.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Position</TableHead>
                  <TableHead>Applied Date</TableHead>
                  <TableHead>AI Score</TableHead>
                  <TableHead>Current Stage</TableHead>
                  <TableHead>Next Step</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {mockCandidateApplications.map((app) => (
                  <TableRow key={app.id}>
                    <TableCell>
                      <div>
                        <p className="font-medium">{app.position}</p>
                        <p className="text-sm text-muted-foreground">{app.department}</p>
                      </div>
                    </TableCell>
                    <TableCell className="text-muted-foreground">
                      {new Date(app.appliedDate).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'short',
                        day: 'numeric',
                      })}
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Progress value={app.aiScore} className="w-16 h-2" />
                        <span className={`text-sm font-medium ${getScoreColor(app.aiScore)}`}>
                          {app.aiScore}%
                        </span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <span
                        className={`inline-flex px-2.5 py-1 rounded-full text-xs font-medium ${getStageColor(
                          app.currentStage
                        )}`}
                      >
                        {app.currentStage}
                      </span>
                    </TableCell>
                    <TableCell className="text-sm text-muted-foreground max-w-[200px]">
                      {app.nextStep}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
