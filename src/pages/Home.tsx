import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Ship, Building2, LogIn, Mail } from 'lucide-react';

const Home: React.FC = () => {
  const navigationCards = [
    {
      title: 'Cruise Details',
      description: 'View information about our cruise ships, routes, and services',
      icon: Ship,
      link: '/cruise-details',
      color: 'bg-blue-50 hover:bg-blue-100'
    },
    {
      title: 'Department Details',
      description: 'Explore our various departments and their services',
      icon: Building2,
      link: '/departments',
      color: 'bg-green-50 hover:bg-green-100'
    },
    {
      title: 'Login / Register',
      description: 'Access your dashboard as Admin or Department Head',
      icon: LogIn,
      link: '/login',
      color: 'bg-purple-50 hover:bg-purple-100'
    },
    {
      title: 'Contact Us',
      description: 'Get in touch with our team for any inquiries',
      icon: Mail,
      link: '/contact',
      color: 'bg-orange-50 hover:bg-orange-100'
    }
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="text-center mb-12">
        <h1 className="text-4xl mb-4">Welcome to Cruise Management System</h1>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Manage your cruise operations efficiently with our comprehensive management system. 
          Navigate through different sections to explore cruise details, departments, and more.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {navigationCards.map((card, index) => (
          <Link to={card.link} key={index}>
            <Card className={`h-full transition-all cursor-pointer ${card.color} border-none`}>
              <CardHeader>
                <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center mb-4">
                  <card.icon className="w-6 h-6 text-blue-600" />
                </div>
                <CardTitle>{card.title}</CardTitle>
                <CardDescription>{card.description}</CardDescription>
              </CardHeader>
            </Card>
          </Link>
        ))}
      </div>

      <div className="mt-16 bg-gradient-to-r from-blue-600 to-blue-800 rounded-lg p-8 text-white">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl mb-4">Sail Away to Paradise</h2>
          <p className="mb-6">
            Experience the journey of a lifetime aboard our luxury cruise ships. 
            From breathtaking destinations to world-class amenities, we offer unforgettable voyages.
          </p>
          <Link to="/cruise-details">
            <button className="bg-white text-blue-600 px-6 py-3 rounded-lg hover:bg-gray-100 transition">
              Explore Our Cruises
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Home;
