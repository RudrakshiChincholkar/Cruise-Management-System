import React from 'react';
import { useData } from '../contexts/DataContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Mail, User } from 'lucide-react';

const DepartmentDetails: React.FC = () => {
  const { departments } = useData();

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-4xl mb-2">Our Departments</h1>
        <p className="text-gray-600">Explore the various departments that make your cruise experience exceptional</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {departments.map((dept) => (
          <Card key={dept.id} className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle>{dept.name}</CardTitle>
              <CardDescription>{dept.description}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center gap-2 text-sm">
                <User className="w-4 h-4 text-gray-500" />
                <span className="text-gray-600">Department Head:</span>
                <span>{dept.headName}</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <Mail className="w-4 h-4 text-gray-500" />
                <span className="text-gray-600">Contact:</span>
                <a href={`mailto:${dept.contact}`} className="text-blue-600 hover:underline">
                  {dept.contact}
                </a>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default DepartmentDetails;
