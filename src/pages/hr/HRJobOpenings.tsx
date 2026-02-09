import { useState, useMemo } from 'react';
import { jobs, departments, locations, jobTypes } from '@/lib/mockData';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Briefcase, MapPin, Clock, DollarSign, Search, Filter, CalendarDays, Eye, Pencil, ToggleRight } from 'lucide-react';

export default function HRJobOpenings() {
  const [search, setSearch] = useState('');
  const [departmentFilter, setDepartmentFilter] = useState('all');
  const [locationFilter, setLocationFilter] = useState('all');
  const [typeFilter, setTypeFilter] = useState('all');

  const filtered = useMemo(() => {
    return jobs.filter((job) => {
      const matchesSearch =
        job.title.toLowerCase().includes(search.toLowerCase()) ||
        job.department.toLowerCase().includes(search.toLowerCase());
      const matchesDept = departmentFilter === 'all' || job.department === departmentFilter;
      const matchesLoc = locationFilter === 'all' || job.location === locationFilter;
      const matchesType = typeFilter === 'all' || job.type === typeFilter;
      return matchesSearch && matchesDept && matchesLoc && matchesType;
    });
  }, [search, departmentFilter, locationFilter, typeFilter]);

  const clearFilters = () => {
    setSearch('');
    setDepartmentFilter('all');
    setLocationFilter('all');
    setTypeFilter('all');
  };

  const hasActiveFilters = search || departmentFilter !== 'all' || locationFilter !== 'all' || typeFilter !== 'all';

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold">Job Openings</h1>
          <p className="text-muted-foreground text-sm mt-1">
            Manage and monitor all active job postings
          </p>
        </div>
        <Badge variant="secondary" className="text-sm w-fit">
          {filtered.length} of {jobs.length} openings
        </Badge>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-col lg:flex-row gap-3">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search by title or department..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-9"
              />
            </div>
            <Select value={departmentFilter} onValueChange={setDepartmentFilter}>
              <SelectTrigger className="w-full lg:w-[180px]">
                <SelectValue placeholder="Department" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Departments</SelectItem>
                {departments.map((d) => (
                  <SelectItem key={d} value={d}>{d}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select value={locationFilter} onValueChange={setLocationFilter}>
              <SelectTrigger className="w-full lg:w-[180px]">
                <SelectValue placeholder="Location" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Locations</SelectItem>
                {locations.map((l) => (
                  <SelectItem key={l} value={l}>{l}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select value={typeFilter} onValueChange={setTypeFilter}>
              <SelectTrigger className="w-full lg:w-[160px]">
                <SelectValue placeholder="Job Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                {jobTypes.map((t) => (
                  <SelectItem key={t} value={t}>{t}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            {hasActiveFilters && (
              <Button variant="outline" onClick={clearFilters} size="sm" className="shrink-0">
                <Filter className="h-4 w-4 mr-1" />
                Clear
              </Button>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Job List */}
      {filtered.length === 0 ? (
        <Card>
          <CardContent className="py-12 text-center text-muted-foreground">
            <Briefcase className="h-10 w-10 mx-auto mb-3 opacity-40" />
            <p className="font-medium">No job openings found</p>
            <p className="text-sm mt-1">Try adjusting your filters</p>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-4">
          {filtered.map((job) => (
            <Card key={job.id} className="hover:shadow-md transition-shadow">
              <CardContent className="p-5">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div className="space-y-2 flex-1">
                    <div className="flex items-center gap-2 flex-wrap">
                      <h3 className="font-semibold text-lg">{job.title}</h3>
                      <Badge variant="outline">{job.type}</Badge>
                    </div>
                    <div className="flex flex-wrap gap-x-4 gap-y-1 text-sm text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <Briefcase className="h-3.5 w-3.5" />
                        {job.department}
                      </span>
                      <span className="flex items-center gap-1">
                        <MapPin className="h-3.5 w-3.5" />
                        {job.location}
                      </span>
                      <span className="flex items-center gap-1">
                        <DollarSign className="h-3.5 w-3.5" />
                        {job.salary}
                      </span>
                      <span className="flex items-center gap-1">
                        <CalendarDays className="h-3.5 w-3.5" />
                        {new Date(job.postedDate).toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' })}
                      </span>
                    </div>
                    <p className="text-sm text-muted-foreground line-clamp-1">{job.description}</p>
                  </div>
                  <div className="flex items-center gap-2 shrink-0">
                    <Button variant="outline" size="sm">
                      <Eye className="h-4 w-4 mr-1" />
                      View
                    </Button>
                    <Button variant="outline" size="sm">
                      <Pencil className="h-4 w-4 mr-1" />
                      Edit
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
