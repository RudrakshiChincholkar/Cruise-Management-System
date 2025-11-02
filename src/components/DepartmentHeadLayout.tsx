import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { LayoutDashboard, Users, UserCheck } from 'lucide-react';

interface DepartmentHeadLayoutProps {
  children: React.ReactNode;
}

const DepartmentHeadLayout: React.FC<DepartmentHeadLayoutProps> = ({ children }) => {
  const location = useLocation();

  const menuItems = [
    { path: '/department/dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { path: '/department/employees', label: 'Employees', icon: Users },
    { path: '/department/customers', label: 'Customers', icon: UserCheck }
  ];

  return (
    <div className="flex flex-col md:flex-row min-h-[calc(100vh-64px)]">
      <aside className="w-full md:w-64 bg-gray-100 border-r">
        <div className="p-4">
          <h2 className="text-xl mb-4">Department Panel</h2>
          <nav className="space-y-2">
            {menuItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`flex items-center gap-3 px-4 py-3 rounded-lg transition ${
                    isActive
                      ? 'bg-blue-600 text-white'
                      : 'hover:bg-gray-200 text-gray-700'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </nav>
        </div>
      </aside>
      <main className="flex-1 bg-gray-50">{children}</main>
    </div>
  );
};

export default DepartmentHeadLayout;
