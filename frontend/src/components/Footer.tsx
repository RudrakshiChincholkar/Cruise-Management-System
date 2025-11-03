import React from 'react';
import { Ship, Mail, Phone, MapPin } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-900 text-gray-300 mt-auto">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Ship className="w-6 h-6 text-blue-400" />
              <span className="text-white">Cruise Management</span>
            </div>
            <p className="text-sm">
              Experience luxury and adventure on the high seas with our world-class cruise services.
            </p>
          </div>

          <div>
            <h3 className="text-white mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li><a href="/" className="hover:text-blue-400 transition">Home</a></li>
              <li><a href="/cruise-details" className="hover:text-blue-400 transition">Cruise Details</a></li>
              <li><a href="/departments" className="hover:text-blue-400 transition">Departments</a></li>
              <li><a href="/contact" className="hover:text-blue-400 transition">Contact Us</a></li>
            </ul>
          </div>

          <div>
            <h3 className="text-white mb-4">Contact Info</h3>
            <ul className="space-y-2 text-sm">
              <li className="flex items-center gap-2">
                <MapPin className="w-4 h-4" />
                <span>123 Harbor Drive, Miami, FL 33101</span>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="w-4 h-4" />
                <span>+1 (555) 123-4567</span>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="w-4 h-4" />
                <span>info@cruisemanagement.com</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-8 pt-6 text-center text-sm">
          <p>&copy; 2025 Cruise Management System. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
