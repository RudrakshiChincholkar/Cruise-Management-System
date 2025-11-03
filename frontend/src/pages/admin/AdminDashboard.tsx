import React from 'react';
import { useData } from '../../contexts/DataContext';
import StatsCard from '../../components/StatsCard';
import { Users, Building2, UserCog, TrendingUp } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../../components/ui/table';

const AdminDashboard: React.FC = () => {
  const { departments, employees, customers, departmentHeads } = useData();

  const employeesByDepartment = departments.map(dept => ({
    department: dept.name,
    count: employees.filter(emp => emp.departmentId === dept.id).length
  }));

  const customersByDepartment = departments.map(dept => ({
    department: dept.name,
    count: customers.filter(cust => cust.departmentId === dept.id).length
  }));

  const totalEmployees = employees.length;
  const totalCustomers = customers.length;
  const totalDepartments = departments.length;
  const totalHeads = departmentHeads.length;

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-4xl mb-2">Admin Dashboard</h1>
        <p className="text-gray-600">Overview of your cruise management system</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatsCard
          title="Total Departments"
          value={totalDepartments}
          icon={Building2}
          description="Active departments"
        />
        <StatsCard
          title="Department Heads"
          value={totalHeads}
          icon={UserCog}
          description="Managing staff"
        />
        <StatsCard
          title="Total Employees"
          value={totalEmployees}
          icon={Users}
          description="Across all departments"
        />
        <StatsCard
          title="Total Customers"
          value={totalCustomers}
          icon={TrendingUp}
          description="Active bookings"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Employees by Department</CardTitle>
            <CardDescription>Distribution of staff across departments</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Department</TableHead>
                  <TableHead className="text-right">Employees</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {employeesByDepartment.map((item, index) => (
                  <TableRow key={index}>
                    <TableCell>{item.department}</TableCell>
                    <TableCell className="text-right">{item.count}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Customers by Department</CardTitle>
            <CardDescription>Service usage across departments</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Department</TableHead>
                  <TableHead className="text-right">Customers</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {customersByDepartment.map((item, index) => (
                  <TableRow key={index}>
                    <TableCell>{item.department}</TableCell>
                    <TableCell className="text-right">{item.count}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AdminDashboard;
