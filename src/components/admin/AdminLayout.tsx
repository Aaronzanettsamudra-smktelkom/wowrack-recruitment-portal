import { useState } from 'react';
import { Link, Outlet, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Users,
  Settings,
  Menu,
  X,
  LogOut,
  Shield
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { cn } from '@/lib/utils';

const navItems = [
  { path: '/admin', label: 'Dashboard', icon: LayoutDashboard },
  { path: '/admin/users', label: 'User Management', icon: Users },
  { path: '/admin/settings', label: 'Settings', icon: Settings },
];

export default function AdminLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();

  const isActive = (path: string) => {
    if (path === '/admin') {
      return location.pathname === '/admin';
    }
    return location.pathname.startsWith(path);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Mobile Header */}
      <header className="lg:hidden flex items-center justify-between p-4 border-b bg-card">
        <div className="flex items-center gap-3">
          <Button 
            variant="ghost" 
            size="icon"
            onClick={() => setSidebarOpen(!sidebarOpen)}
          >
            {sidebarOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
          <span className="font-semibold text-lg">Admin Portal</span>
        </div>
        <Avatar className="h-8 w-8">
          <AvatarImage src="https://i.pravatar.cc/150?u=admin" />
          <AvatarFallback>AD</AvatarFallback>
        </Avatar>
      </header>

      <div className="flex">
        {/* Sidebar */}
        <aside className={cn(
          "fixed inset-y-0 left-0 z-50 w-64 bg-card border-r transform transition-transform duration-200 ease-in-out lg:translate-x-0 lg:static lg:inset-auto",
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        )}>
          <div className="flex flex-col h-full">
            {/* Sidebar Header */}
            <div className="p-6 border-b">
              <div className="flex items-center gap-2">
                <Shield className="h-6 w-6 text-primary" />
                <h1 className="text-xl font-bold">Admin Portal</h1>
              </div>
              <p className="text-sm text-muted-foreground mt-1">System Administration</p>
            </div>

            {/* Navigation */}
            <nav className="flex-1 p-4 space-y-1">
              {navItems.map((item) => {
                const Icon = item.icon;
                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    onClick={() => setSidebarOpen(false)}
                    className={cn(
                      "flex items-center gap-3 px-4 py-3 rounded-lg transition-colors",
                      isActive(item.path)
                        ? "bg-primary text-primary-foreground"
                        : "text-muted-foreground hover:bg-muted hover:text-foreground"
                    )}
                  >
                    <Icon className="h-5 w-5" />
                    <span className="font-medium">{item.label}</span>
                  </Link>
                );
              })}
            </nav>

            {/* User Info */}
            <div className="p-4 border-t">
              <div className="flex items-center gap-3 mb-4">
                <Avatar>
                  <AvatarImage src="https://i.pravatar.cc/150?u=admin" />
                  <AvatarFallback>AD</AvatarFallback>
                </Avatar>
                <div className="flex-1 min-w-0">
                  <p className="font-medium truncate">Admin User</p>
                  <p className="text-sm text-muted-foreground truncate">System Admin</p>
                </div>
              </div>
              <Link to="/">
                <Button variant="outline" className="w-full justify-start gap-2">
                  <LogOut className="h-4 w-4" />
                  Sign Out
                </Button>
              </Link>
            </div>
          </div>
        </aside>

        {/* Mobile Overlay */}
        {sidebarOpen && (
          <div 
            className="fixed inset-0 bg-black/50 z-40 lg:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}

        {/* Main Content */}
        <main className="flex-1 min-h-screen">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
