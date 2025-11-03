import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { Button } from './ui/button';
import { Ship, Menu, X, LogOut } from 'lucide-react';

const Navbar: React.FC = () => {
  const { user, logout, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/');
    setMobileMenuOpen(false);
  };

  const getDashboardLink = () => {
    if (user?.role === 'admin') return '/admin/dashboard';
    if (user?.role === 'departmentHead') return '/department/dashboard';
    return '/';
  };

  return (
    <nav className="bg-blue-900 text-white shadow-lg">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="flex items-center gap-2">
            <Ship className="w-8 h-8" />
            <span>Cruise Management</span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-6">
            <Link to="/" className="hover:text-blue-200 transition">Home</Link>
            <Link to="/cruise-details" className="hover:text-blue-200 transition">Cruise Details</Link>
            <Link to="/departments" className="hover:text-blue-200 transition">Departments</Link>
            <Link to="/contact" className="hover:text-blue-200 transition">Contact</Link>
            
            {isAuthenticated ? (
              <>
                <Link to={getDashboardLink()} className="hover:text-blue-200 transition">Dashboard</Link>
                <Button variant="outline" size="sm" onClick={handleLogout} className="bg-transparent border-white text-white hover:bg-blue-800">
                  <LogOut className="w-4 h-4 mr-2" />
                  Logout
                </Button>
              </>
            ) : (
              <Link to="/login">
                <Button variant="outline" size="sm" className="bg-transparent border-white text-white hover:bg-blue-800">
                  Login
                </Button>
              </Link>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button 
            className="md:hidden"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden pb-4 space-y-2">
            <Link to="/" className="block py-2 hover:text-blue-200" onClick={() => setMobileMenuOpen(false)}>Home</Link>
            <Link to="/cruise-details" className="block py-2 hover:text-blue-200" onClick={() => setMobileMenuOpen(false)}>Cruise Details</Link>
            <Link to="/departments" className="block py-2 hover:text-blue-200" onClick={() => setMobileMenuOpen(false)}>Departments</Link>
            <Link to="/contact" className="block py-2 hover:text-blue-200" onClick={() => setMobileMenuOpen(false)}>Contact</Link>
            
            {isAuthenticated ? (
              <>
                <Link to={getDashboardLink()} className="block py-2 hover:text-blue-200" onClick={() => setMobileMenuOpen(false)}>Dashboard</Link>
                <button onClick={handleLogout} className="w-full text-left py-2 hover:text-blue-200">Logout</button>
              </>
            ) : (
              <Link to="/login" className="block py-2 hover:text-blue-200" onClick={() => setMobileMenuOpen(false)}>Login</Link>
            )}
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
