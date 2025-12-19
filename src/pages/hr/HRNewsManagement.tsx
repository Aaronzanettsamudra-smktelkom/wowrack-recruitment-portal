import { useState } from 'react';
import { 
  Plus, 
  Pencil, 
  Trash2, 
  Search,
  Eye,
  Calendar,
  User
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
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { useToast } from '@/hooks/use-toast';

interface NewsArticle {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  category: string;
  author: string;
  publishDate: string;
  status: 'draft' | 'published' | 'archived';
  imageUrl: string;
  views: number;
}

const initialNews: NewsArticle[] = [
  {
    id: 'news-1',
    title: 'TechCorp Indonesia Raih Penghargaan Best Workplace 2025',
    excerpt: 'Perusahaan kembali meraih penghargaan bergengsi sebagai tempat kerja terbaik.',
    content: 'TechCorp Indonesia berhasil meraih penghargaan Best Workplace 2025 dari Great Place to Work Institute...',
    category: 'Achievement',
    author: 'HR Communications',
    publishDate: '2025-01-15',
    status: 'published',
    imageUrl: '/placeholder.svg',
    views: 1250,
  },
  {
    id: 'news-2',
    title: 'Peluncuran Program Beasiswa Karyawan 2025',
    excerpt: 'Program beasiswa pendidikan untuk pengembangan kompetensi karyawan.',
    content: 'Dalam rangka mendukung pengembangan kompetensi, perusahaan meluncurkan program beasiswa...',
    category: 'Program',
    author: 'Learning & Development',
    publishDate: '2025-01-10',
    status: 'published',
    imageUrl: '/placeholder.svg',
    views: 890,
  },
  {
    id: 'news-3',
    title: 'Kebijakan Hybrid Working Diperpanjang',
    excerpt: 'Kebijakan kerja hybrid akan terus berlaku hingga akhir 2025.',
    content: 'Berdasarkan evaluasi positif dari implementasi hybrid working...',
    category: 'Policy',
    author: 'HR Policy',
    publishDate: '2025-01-05',
    status: 'published',
    imageUrl: '/placeholder.svg',
    views: 2100,
  },
  {
    id: 'news-4',
    title: 'Rencana Ekspansi Regional Q2 2025',
    excerpt: 'Draft pengumuman ekspansi ke wilayah baru.',
    content: 'Sebagai bagian dari strategi pertumbuhan...',
    category: 'Announcement',
    author: 'Corporate Communications',
    publishDate: '2025-02-01',
    status: 'draft',
    imageUrl: '/placeholder.svg',
    views: 0,
  },
];

const categories = ['Achievement', 'Program', 'Policy', 'Announcement', 'Event', 'Other'];

export default function HRNewsManagement() {
  const [news, setNews] = useState<NewsArticle[]>(initialNews);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [showDialog, setShowDialog] = useState(false);
  const [editingNews, setEditingNews] = useState<NewsArticle | null>(null);
  const [deleteNews, setDeleteNews] = useState<NewsArticle | null>(null);
  const [formData, setFormData] = useState({
    title: '',
    excerpt: '',
    content: '',
    category: '',
    author: '',
    publishDate: '',
    status: 'draft' as 'draft' | 'published' | 'archived',
    imageUrl: '/placeholder.svg',
  });
  const { toast } = useToast();

  const filteredNews = news.filter(item => {
    const matchesSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         item.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'all' || item.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const openCreateDialog = () => {
    setEditingNews(null);
    setFormData({
      title: '',
      excerpt: '',
      content: '',
      category: '',
      author: '',
      publishDate: new Date().toISOString().split('T')[0],
      status: 'draft',
      imageUrl: '/placeholder.svg',
    });
    setShowDialog(true);
  };

  const openEditDialog = (item: NewsArticle) => {
    setEditingNews(item);
    setFormData({
      title: item.title,
      excerpt: item.excerpt,
      content: item.content,
      category: item.category,
      author: item.author,
      publishDate: item.publishDate,
      status: item.status,
      imageUrl: item.imageUrl,
    });
    setShowDialog(true);
  };

  const handleSave = () => {
    if (!formData.title || !formData.excerpt || !formData.category) {
      toast({
        title: 'Validation Error',
        description: 'Please fill in all required fields.',
        variant: 'destructive',
      });
      return;
    }

    if (editingNews) {
      setNews(prev => prev.map(item => 
        item.id === editingNews.id 
          ? { ...item, ...formData }
          : item
      ));
      toast({
        title: 'News Updated',
        description: 'The news article has been updated successfully.',
      });
    } else {
      const newArticle: NewsArticle = {
        id: `news-${Date.now()}`,
        ...formData,
        views: 0,
      };
      setNews(prev => [newArticle, ...prev]);
      toast({
        title: 'News Created',
        description: 'The news article has been created successfully.',
      });
    }
    setShowDialog(false);
  };

  const handleDelete = () => {
    if (deleteNews) {
      setNews(prev => prev.filter(item => item.id !== deleteNews.id));
      toast({
        title: 'News Deleted',
        description: 'The news article has been deleted.',
      });
      setDeleteNews(null);
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

  return (
    <div className="p-6 lg:p-8 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl lg:text-3xl font-bold">News Management</h1>
          <p className="text-muted-foreground mt-1">Create and manage company news articles</p>
        </div>
        <Button onClick={openCreateDialog}>
          <Plus className="h-4 w-4 mr-2" />
          Create News
        </Button>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search news..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-full sm:w-40">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="published">Published</SelectItem>
                <SelectItem value="draft">Draft</SelectItem>
                <SelectItem value="archived">Archived</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* News Table */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">News Articles ({filteredNews.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Title</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Author</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Views</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredNews.map((item) => (
                <TableRow key={item.id}>
                  <TableCell>
                    <div>
                      <p className="font-medium line-clamp-1">{item.title}</p>
                      <p className="text-xs text-muted-foreground line-clamp-1">{item.excerpt}</p>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline">{item.category}</Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1 text-sm text-muted-foreground">
                      <User className="h-3 w-3" />
                      {item.author}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1 text-sm text-muted-foreground">
                      <Calendar className="h-3 w-3" />
                      {item.publishDate}
                    </div>
                  </TableCell>
                  <TableCell>{getStatusBadge(item.status)}</TableCell>
                  <TableCell className="text-right">
                    <div className="flex items-center justify-end gap-1 text-sm text-muted-foreground">
                      <Eye className="h-3 w-3" />
                      {item.views.toLocaleString()}
                    </div>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-1">
                      <Button variant="ghost" size="icon" onClick={() => openEditDialog(item)}>
                        <Pencil className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon" onClick={() => setDeleteNews(item)}>
                        <Trash2 className="h-4 w-4 text-red-600" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
              {filteredNews.length === 0 && (
                <TableRow>
                  <TableCell colSpan={7} className="text-center py-8 text-muted-foreground">
                    No news articles found
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Create/Edit Dialog */}
      <Dialog open={showDialog} onOpenChange={setShowDialog}>
        <DialogContent className="sm:max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{editingNews ? 'Edit News Article' : 'Create News Article'}</DialogTitle>
            <DialogDescription>
              {editingNews ? 'Update the news article details.' : 'Create a new news article for the company.'}
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4">
            <div className="space-y-2">
              <Label>Title *</Label>
              <Input
                value={formData.title}
                onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                placeholder="Enter news title"
              />
            </div>

            <div className="space-y-2">
              <Label>Excerpt *</Label>
              <Textarea
                value={formData.excerpt}
                onChange={(e) => setFormData(prev => ({ ...prev, excerpt: e.target.value }))}
                placeholder="Brief summary of the news"
                rows={2}
              />
            </div>

            <div className="space-y-2">
              <Label>Content</Label>
              <Textarea
                value={formData.content}
                onChange={(e) => setFormData(prev => ({ ...prev, content: e.target.value }))}
                placeholder="Full news content..."
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
                <Label>Publish Date</Label>
                <Input
                  type="date"
                  value={formData.publishDate}
                  onChange={(e) => setFormData(prev => ({ ...prev, publishDate: e.target.value }))}
                />
              </div>
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setShowDialog(false)}>
              Cancel
            </Button>
            <Button onClick={handleSave}>
              {editingNews ? 'Save Changes' : 'Create News'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation */}
      <AlertDialog open={!!deleteNews} onOpenChange={() => setDeleteNews(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete News Article</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete "{deleteNews?.title}"? This action cannot be undone.
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