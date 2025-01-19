import { NavItem } from 'types';

export type Student = {
  id: number;
  roll_number: string;
  photo_url: string;
  name: string;
  father_name: string;
  cnic: string;
  address: string;
  phone: string;
  email: string;
  department: string;
  semester: number;
  admission_date: string;
  last_updated: string;
  cgpa: number;
  status: 'Active' | 'Graduated' | 'On Leave' | 'Suspended';
};

//Info: The following data is used for the sidebar navigation and Cmd K bar.
export const navItems: NavItem[] = [
  {
    title: 'Dashboard',
    url: '/dashboard/overview',
    icon: 'dashboard',
    isActive: false,
    shortcut: ['d', 'd'],
    items: [] // Empty array as there are no child items for Dashboard
  },
  {
    title: 'Students',
    url: '/dashboard/students',
    icon: 'student',
    shortcut: ['p', 'p'],
    isActive: false,
    items: [] // No child items
  }
  // {
  //   title: 'Account',
  //   url: '#', // Placeholder as there is no direct link for the parent
  //   icon: 'billing',
  //   isActive: true,

  //   items: [
  //     {
  //       title: 'Profile',
  //       url: '/dashboard/profile',
  //       icon: 'userPen',
  //       shortcut: ['m', 'm']
  //     },
  //     {
  //       title: 'Login',
  //       shortcut: ['l', 'l'],
  //       url: '/',
  //       icon: 'login'
  //     }
  //   ]
  // },
  // {
  //   title: 'Kanban',
  //   url: '/dashboard/kanban',
  //   icon: 'kanban',
  //   shortcut: ['k', 'k'],
  //   isActive: false,
  //   items: [] // No child items
  // }
];
