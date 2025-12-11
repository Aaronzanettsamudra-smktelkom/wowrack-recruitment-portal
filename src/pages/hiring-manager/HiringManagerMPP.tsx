import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { FileText, Send } from "lucide-react";

interface MPPFormData {
  title: string;
  jobRequirement: string;
  quantity: number;
  salaryMin: number;
  salaryMax: number;
  priority: 'high' | 'medium' | 'low';
  justification: string;
}

const initialFormData: MPPFormData = {
  title: '',
  jobRequirement: '',
  quantity: 1,
  salaryMin: 0,
  salaryMax: 0,
  priority: 'medium',
  justification: '',
};

export default function HiringManagerMPP() {
  const [formData, setFormData] = useState<MPPFormData>(initialFormData);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === 'quantity' || name === 'salaryMin' || name === 'salaryMax' 
        ? Number(value) 
        : value,
    }));
  };

  const handlePriorityChange = (value: string) => {
    setFormData((prev) => ({
      ...prev,
      priority: value as 'high' | 'medium' | 'low',
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.title || !formData.jobRequirement || !formData.justification) {
      toast({
        title: "Validation Error",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
      return;
    }

    if (formData.salaryMin > formData.salaryMax) {
      toast({
        title: "Validation Error",
        description: "Minimum salary cannot exceed maximum salary.",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);
    
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500));
    
    toast({
      title: "MPP Request Submitted",
      description: "Your manpower planning request has been sent to HR for approval.",
    });
    
    setFormData(initialFormData);
    setIsSubmitting(false);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Manpower Planning Request</h1>
        <p className="text-muted-foreground">Submit a new position request for HR approval</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5" />
            New MPP Request
          </CardTitle>
          <CardDescription>
            Fill out the form below to request a new position for your department
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="title">Position Title *</Label>
                <Input
                  id="title"
                  name="title"
                  value={formData.title}
                  onChange={handleInputChange}
                  placeholder="e.g., Senior Software Engineer"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="quantity">Quantity *</Label>
                <Input
                  id="quantity"
                  name="quantity"
                  type="number"
                  min="1"
                  value={formData.quantity}
                  onChange={handleInputChange}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="jobRequirement">Job Requirements *</Label>
              <Textarea
                id="jobRequirement"
                name="jobRequirement"
                value={formData.jobRequirement}
                onChange={handleInputChange}
                placeholder="Describe the required skills, experience, and qualifications..."
                rows={4}
              />
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              <div className="space-y-2">
                <Label htmlFor="salaryMin">Salary Range (Min)</Label>
                <Input
                  id="salaryMin"
                  name="salaryMin"
                  type="number"
                  min="0"
                  value={formData.salaryMin}
                  onChange={handleInputChange}
                  placeholder="e.g., 50000"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="salaryMax">Salary Range (Max)</Label>
                <Input
                  id="salaryMax"
                  name="salaryMax"
                  type="number"
                  min="0"
                  value={formData.salaryMax}
                  onChange={handleInputChange}
                  placeholder="e.g., 80000"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="priority">Priority *</Label>
                <Select value={formData.priority} onValueChange={handlePriorityChange}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select priority" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="high">High</SelectItem>
                    <SelectItem value="medium">Medium</SelectItem>
                    <SelectItem value="low">Low</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="justification">Justification *</Label>
              <Textarea
                id="justification"
                name="justification"
                value={formData.justification}
                onChange={handleInputChange}
                placeholder="Explain why this position is needed..."
                rows={4}
              />
            </div>

            <div className="flex justify-end">
              <Button type="submit" disabled={isSubmitting} size="lg">
                {isSubmitting ? (
                  "Submitting..."
                ) : (
                  <>
                    <Send className="h-4 w-4 mr-2" />
                    Submit Request
                  </>
                )}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
