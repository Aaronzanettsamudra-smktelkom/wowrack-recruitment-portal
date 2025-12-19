import { useState } from 'react';
import { 
  Plus, 
  Pencil, 
  Trash2, 
  Search,
  Eye,
  Calendar,
  User,
  Image
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
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

interface CultureContent {
  id: string;
  title: string;
  description: string;
  content: string;
  category: string;
  author: string;
  createdDate: string;
  status: 'draft' | 'published' | 'archived';
  imageUrl: string;
  views: number;
}

const initialCultureContent: CultureContent[] = [
  {
    id: 'culture-1',
    title: 'Company Values: Innovation First',
    description: 'Exploring our commitment to innovation and continuous improvement.',
    content: 'At TechCorp Indonesia, innovation is at the heart of everything we do...',
    category: 'Values',
    author: 'Culture Team',
    createdDate: '2025-01-12',
    status: 'published',
    imageUrl: '/placeholder.svg',
    views: 3200,
  },
  {
    id: 'culture-2',
    title: 'Employee Wellness Program 2025',
    description: 'Comprehensive wellness initiatives for all employees.',
    content: 'Our employee wellness program includes mental health support, fitness subsidies...',
    category: 'Wellness',
    author: 'HR Wellness',
    createdDate: '2025-01-08',
    status: 'published',
    imageUrl: '/placeholder.svg',
    views: 1850,
  },
  {
    id: 'culture-3',
    title: 'Diversity & Inclusion Report Q4 2024',
    description: 'Progress update on our D&I initiatives and goals.',
    content: 'We are proud to share our diversity and inclusion progress...',
    category: 'D&I',
    author: 'D&I Committee',
    createdDate: '2025-01-05',
    status: 'published',
    imageUrl: '/placeholder.svg',
    views: 980,
  },
  {
    id: 'culture-4',
    title: 'Team Building Activities Calendar',
    description: 'Upcoming team activities and social events.',
    content: 'Check out our exciting lineup of team building activities...',
    category: 'Events',
    author: 'Employee Engagement',
    createdDate: '2025-01-02',
    status: 'published',
    imageUrl: '/placeholder.svg',
    views: 2450,
  },
  {
    id: 'culture-5',
    title: 'Leadership Development Program',
    description: 'New leadership training initiative for high-potential employees.',
    content: 'We are launching a comprehensive leadership development program...',
    category: 'Development',
    author: 'L&D Team',
    createdDate: '2025-01-15',
    status: 'draft',
    imageUrl: '/placeholder.svg',
    views: 0,
  },
];

const categories = ['Values', 'Wellness', 'D&I', 'Events', 'Development', 'Recognition', 'Other'];

export default function HRCultureManagement() {
  const [cultureContent, setCultureContent] = useState<CultureContent[]>(initialCultureContent);
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState<string>('all');
  const [showDialog, setShowDialog] = useState(false);
  const [editingContent, setEditingContent] = useState<CultureContent | null>(null);
  const [deleteContent, setDeleteContent] = useState<CultureContent | null>(null);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    content: '',
    category: '',
    author: '',
    createdDate: '',
    status: 'draft' as 'draft' | 'published' | 'archived',
    imageUrl: '/placeholder.svg',
  });
  const { toast } = useToast();

  const filteredContent = cultureContent.filter(item => {
    const matchesSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         item.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = categoryFilter === 'all' || item.category === categoryFilter;
    return matchesSearch && matchesCategory;
  });

  const openCreateDialog = () => {
    setEditingContent(null);
    setFormData({
      title: '',
      description: '',
      content: '',
      category: '',
      author: '',
      createdDate: new Date().toISOString().split('T')[0],
      status: 'draft',
      imageUrl: '/placeholder.svg',
    });
    setShowDialog(true);
  };

  const openEditDialog = (item: CultureContent) => {
    setEditingContent(item);
    setFormData({
      title: item.title,
      description: item.description,
      content: item.content,
      category: item.category,
      author: item.author,
      createdDate: item.createdDate,
      status: item.status,
      imageUrl: item.imageUrl,
    });
    setShowDialog(true);
  };

  const handleSave = () => {
    if (!formData.title || !formData.description || !formData.category) {
      toast({
        title: 'Validation Error',
        description: 'Please fill in all required fields.',
        variant: 'destructive',
      });
      return;
    }

    if (editingContent) {
      setCultureContent(prev => prev.map(item => 
        item.id === editingContent.id 
          ? { ...item, ...formData }
          : item
      ));
      toast({
        title: 'Content Updated',
        description: 'The culture content has been updated successfully.',
      });
    } else {
      const newContent: CultureContent = {
        id: `culture-${Date.now()}`,
        ...formData,
        views: 0,
      };
      setCultureContent(prev => [newContent, ...prev]);
      toast({
        title: 'Content Created',
        description: 'The culture content has been created successfully.',
      });
    }
    setShowDialog(false);
  };

  const handleDelete = () => {
    if (deleteContent) {
      setCultureContent(prev => prev.filter(item => item.id !== deleteContent.id));
      toast({
        title: 'Content Deleted',
        description: 'The culture content has been deleted.',
      });
      setDeleteContent(null);
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'published':
        return <Badge className="bg-green-500">Published</Badge>;
      case 'draft':
        return <Badge variant="secondary">Draft</Badge>;
      case 'archived':
        return <Badge variant="outline">Archived</Badge>;
      default:
        return <Badge>{status}</Badge>;
    }
  };

  const getCategoryColor = (category: string) => {
    const colors: Record<string, string> = {
      'Values': 'bg-blue-100 text-blue-800',
      'Wellness': 'bg-green-100 text-green-800',
      'D&I': 'bg-purple-100 text-purple-800',
      'Events': 'bg-amber-100 text-amber-800',
      'Development': 'bg-cyan-100 text-cyan-800',
      'Recognition': 'bg-pink-100 text-pink-800',
    };
    return colors[category] || 'bg-gray-100 text-gray-800';
  };

  return (
    <div className="p-6 lg:p-8 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl lg:text-3xl font-bold">Culture Management</h1>
          <p className="text-muted-foreground mt-1">Manage company culture content and initiatives</p>
        </div>
        <Button onClick={openCreateDialog}>
          <Plus className="h-4 w-4 mr-2" />
          Create Content
        </Button>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search culture content..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={categoryFilter} onValueChange={setCategoryFilter}>
              <SelectTrigger className="w-full sm:w-40">
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                {categories.map((cat) => (
                  <SelectItem key={cat} value={cat}>{cat}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Culture Content Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredContent.map((item) => (
          <Card key={item.id} className="hover:shadow-md transition-shadow">
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between gap-2">
                <div className="flex-1">
                  <Badge className={getCategoryColor(item.category)}>{item.category}</Badge>
                  <CardTitle className="text-lg mt-2 line-clamp-2">{item.title}</CardTitle>
                </div>
                {getStatusBadge(item.status)}
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground line-clamp-2 mb-4">
                {item.description}
              </p>
              
              <div className="flex items-center gap-4 text-xs text-muted-foreground mb-4">
                <div className="flex items-center gap-1">
                  <User className="h-3 w-3" />
                  {item.author}
                </div>
                <div className="flex items-center gap-1">
                  <Calendar className="h-3 w-3" />
                  {item.createdDate}
                </div>
                <div className="flex items-center gap-1">
                  <Eye className="h-3 w-3" />
                  {item.views.toLocaleString()}
                </div>
              </div>

              <div className="flex justify-end gap-2">
                <Button variant="ghost" size="sm" onClick={() => openEditDialog(item)}>
                  <Pencil className="h-4 w-4 mr-1" />
                  Edit
                </Button>
                <Button variant="ghost" size="sm" onClick={() => setDeleteContent(item)}>
                  <Trash2 className="h-4 w-4 mr-1 text-red-600" />
                  Delete
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
        
        {filteredContent.length === 0 && (
          <div className="col-span-full">
            <Card>
              <CardContent className="py-12 text-center text-muted-foreground">
                <Image className="h-12 w-12 mx-auto mb-4 opacity-50" />
                <p>No culture content found</p>
              </CardContent>
            </Card>
          </div>
        )}
      </div>

      {/* Create/Edit Dialog */}
      <Dialog open={showDialog} onOpenChange={setShowDialog}>
        <DialogContent className="sm:max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{editingContent ? 'Edit Culture Content' : 'Create Culture Content'}</DialogTitle>
            <DialogDescription>
              {editingContent ? 'Update the culture content details.' : 'Create new content for company culture.'}
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4">
            <div className="space-y-2">
              <Label>Title *</Label>
              <Input
                value={formData.title}
                onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                placeholder="Enter content title"
              />
            </div>

            <div className="space-y-2">
              <Label>Description *</Label>
              <Textarea
                value={formData.description}
                onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                placeholder="Brief description of the content"
                rows={2}
              />
            </div>

            <div className="space-y-2">
              <Label>Content</Label>
              <Textarea
                value={formData.content}
                onChange={(e) => setFormData(prev => ({ ...prev, content: e.target.value }))}
                placeholder="Full content..."
                rows={6}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Category *</Label>
                <Select
                  value={formData.category}
                  onValueChange={(value) => setFormData(prev => ({ ...prev, category: value }))}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((cat) => (
                      <SelectItem key={cat} value={cat}>{cat}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Status</Label>
                <Select
                  value={formData.status}
                  onValueChange={(value: 'draft' | 'published' | 'archived') => 
                    setFormData(prev => ({ ...prev, status: value }))
                  }
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="draft">Draft</SelectItem>
                    <SelectItem value="published">Published</SelectItem>
                    <SelectItem value="archived">Archived</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Author</Label>
                <Input
                  value={formData.author}
                  onChange={(e) => setFormData(prev => ({ ...prev, author: e.target.value }))}
                  placeholder="Author name"
                />
              </div>

              <div className="space-y-2">
                <Label>Date</Label>
                <Input
                  type="date"
                  value={formData.createdDate}
                  onChange={(e) => setFormData(prev => ({ ...prev, createdDate: e.target.value }))}
                />
              </div>
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setShowDialog(false)}>
              Cancel
            </Button>
            <Button onClick={handleSave}>
              {editingContent ? 'Save Changes' : 'Create Content'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation */}
      <AlertDialog open={!!deleteContent} onOpenChange={() => setDeleteContent(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Culture Content</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete "{deleteContent?.title}"? This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleDelete} className="bg-red-600 hover:bg-red-700">
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}