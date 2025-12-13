export type UserRole = 'hr' | 'hiring-manager' | 'admin';

export interface UserAccount {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  department: string;
  status: 'active' | 'inactive';
  createdAt: string;
  lastLogin: string;
}

export const mockUserAccounts: UserAccount[] = [
  {
    id: 'user-1',
    name: 'Jane HR',
    email: 'jane.hr@company.com',
    role: 'hr',
    department: 'Human Resources',
    status: 'active',
    createdAt: '2023-06-15',
    lastLogin: '2024-01-15',
  },
  {
    id: 'user-2',
    name: 'John Smith',
    email: 'john.smith@company.com',
    role: 'hiring-manager',
    department: 'Engineering',
    status: 'active',
    createdAt: '2023-08-20',
    lastLogin: '2024-01-14',
  },
  {
    id: 'user-3',
    name: 'Sarah Johnson',
    email: 'sarah.johnson@company.com',
    role: 'hiring-manager',
    department: 'Marketing',
    status: 'active',
    createdAt: '2023-09-10',
    lastLogin: '2024-01-13',
  },
  {
    id: 'user-4',
    name: 'Mike Chen',
    email: 'mike.chen@company.com',
    role: 'hiring-manager',
    department: 'Analytics',
    status: 'active',
    createdAt: '2023-10-05',
    lastLogin: '2024-01-12',
  },
  {
    id: 'user-5',
    name: 'Admin User',
    email: 'admin@company.com',
    role: 'admin',
    department: 'IT',
    status: 'active',
    createdAt: '2023-01-01',
    lastLogin: '2024-01-15',
  },
  {
    id: 'user-6',
    name: 'Emily Davis',
    email: 'emily.davis@company.com',
    role: 'hiring-manager',
    department: 'Design',
    status: 'inactive',
    createdAt: '2023-07-22',
    lastLogin: '2023-12-01',
  },
];

export const departments = [
  'Human Resources',
  'Engineering',
  'Marketing',
  'Analytics',
  'Design',
  'Finance',
  'Operations',
  'IT',
];
