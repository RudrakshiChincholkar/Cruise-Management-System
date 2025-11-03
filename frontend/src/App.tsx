import { authAPI } from './lib/api';
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { DataProvider } from './contexts/DataContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ProtectedRoute from './components/ProtectedRoute';
import AdminLayout from './components/AdminLayout';
import DepartmentHeadLayout from './components/DepartmentHeadLayout';

// Public Pages
import Home from './pages/Home';
import CruiseDetails from './pages/CruiseDetails';
import DepartmentDetails from './pages/DepartmentDetails';
import Login from './pages/Login';
import ContactUs from './pages/ContactUs';

// Admin Pages
import AdminDashboard from './pages/admin/AdminDashboard';
import ManageDepartments from './pages/admin/ManageDepartments';
import ManageDepartmentHeads from './pages/admin/ManageDepartmentHeads';

// Department Head Pages
import DepartmentHeadDashboard from './pages/departmentHead/DepartmentHeadDashboard';
import ManageEmployees from './pages/departmentHead/ManageEmployees';
import ManageCustomers from './pages/departmentHead/ManageCustomers';

export default function App() {
  return (
    <Router>
      <AuthProvider>
        <DataProvider>
          <div className="flex flex-col min-h-screen">
            <Navbar />
            <Routes>
              {/* Public Routes */}
              <Route path="/" element={<Home />} />
              <Route path="/cruise-details" element={<CruiseDetails />} />
              <Route path="/departments" element={<DepartmentDetails />} />
              <Route path="/login" element={<Login />} />
              <Route path="/contact" element={<ContactUs />} />

              {/* Admin Routes */}
              <Route
                path="/admin/dashboard"
                element={
                  <ProtectedRoute allowedRole="admin">
                    <AdminLayout>
                      <AdminDashboard />
                    </AdminLayout>
                  </ProtectedRoute>
                }
              />
              <Route
                path="/admin/departments"
                element={
                  <ProtectedRoute allowedRole="admin">
                    <AdminLayout>
                      <ManageDepartments />
                    </AdminLayout>
                  </ProtectedRoute>
                }
              />
              <Route
                path="/admin/department-heads"
                element={
                  <ProtectedRoute allowedRole="admin">
                    <AdminLayout>
                      <ManageDepartmentHeads />
                    </AdminLayout>
                  </ProtectedRoute>
                }
              />

              {/* Department Head Routes */}
              <Route
                path="/department/dashboard"
                element={
                  <ProtectedRoute allowedRole="departmentHead">
                    <DepartmentHeadLayout>
                      <DepartmentHeadDashboard />
                    </DepartmentHeadLayout>
                  </ProtectedRoute>
                }
              />
              <Route
                path="/department/employees"
                element={
                  <ProtectedRoute allowedRole="departmentHead">
                    <DepartmentHeadLayout>
                      <ManageEmployees />
                    </DepartmentHeadLayout>
                  </ProtectedRoute>
                }
              />
              <Route
                path="/department/customers"
                element={
                  <ProtectedRoute allowedRole="departmentHead">
                    <DepartmentHeadLayout>
                      <ManageCustomers />
                    </DepartmentHeadLayout>
                  </ProtectedRoute>
                }
              />
            </Routes>
            <Footer />
          </div>
        </DataProvider>
      </AuthProvider>
    </Router>
  );
}
