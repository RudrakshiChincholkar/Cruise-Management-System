import React from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { useData } from '../../contexts/DataContext';
import StatsCard from '../../components/StatsCard';
import { Users, UserCheck, Building2 } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../components/ui/card';

const DepartmentHeadDashboard: React.FC = () => {
  const { user } = useAuth();
  const { departments, employees, customers } = useData();

  const userDepartmentId = user?.departmentId || '1';
  const department = departments.find(d => d.id === userDepartmentId);
  
  const departmentEmployees = employees.filter(emp => emp.departmentId === userDepartmentId);
  const departmentCustomers = customers.filter(cust => cust.departmentId === userDepartmentId);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-4xl mb-2">Department Dashboard</h1>
        <p className="text-gray-600">Welcome back, {user?.name}</p>
      </div>

      <Card className="mb-8 bg-gradient-to-r from-blue-50 to-purple-50">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Building2 className="w-6 h-6" />
            {department?.name} Department
          </CardTitle>
          <CardDescription>{department?.description}</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-gray-600">Department Head</p>
              <p>{department?.headName}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Contact</p>
              <p>{department?.contact}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <StatsCard
          title="Total Employees"
          value={departmentEmployees.length}
          icon={Users}
          description={`In ${department?.name} department`}
        />
        <StatsCard
          title="Total Customers"
          value={departmentCustomers.length}
          icon={UserCheck}
          description="Using your services"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Recent Employees</CardTitle>
            <CardDescription>Latest additions to your team</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {departmentEmployees.slice(0, 5).map(emp => (
                <div key={emp.id} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                  <div>
                    <p>{emp.name}</p>
                    <p className="text-sm text-gray-600">{emp.position}</p>
                  </div>
                  <p className="text-sm">${emp.salary.toLocaleString()}</p>
                </div>
              ))}
              {departmentEmployees.length === 0 && (
                <p className="text-gray-500 text-center py-4">No employees yet</p>
              )}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Recent Customers</CardTitle>
            <CardDescription>Latest customer bookings</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {departmentCustomers.slice(0, 5).map(cust => (
                <div key={cust.id} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                  <div>
                    <p>{cust.name}</p>
                    <p className="text-sm text-gray-600">Booking ID: {cust.bookingId}</p>
                  </div>
                </div>
              ))}
              {departmentCustomers.length === 0 && (
                <p className="text-gray-500 text-center py-4">No customers yet</p>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default DepartmentHeadDashboard;
