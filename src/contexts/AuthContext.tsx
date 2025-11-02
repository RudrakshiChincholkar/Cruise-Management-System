import React, { createContext, useContext, useState, ReactNode } from 'react';

interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'departmentHead';
  departmentId?: string;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string, role: 'admin' | 'departmentHead') => boolean;
  register: (name: string, email: string, password: string, role: 'admin' | 'departmentHead') => boolean;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  const login = (email: string, password: string, role: 'admin' | 'departmentHead'): boolean => {
    // Mock login - in real app, this would call an API
    if (email && password) {
      const mockUser: User = {
        id: '1',
        name: email.split('@')[0],
        email,
        role,
        departmentId: role === 'departmentHead' ? '1' : undefined
      };
      setUser(mockUser);
      return true;
    }
    return false;
  };

  const register = (name: string, email: string, password: string, role: 'admin' | 'departmentHead'): boolean => {
    // Mock registration
    if (name && email && password) {
      const mockUser: User = {
        id: Date.now().toString(),
        name,
        email,
        role,
        departmentId: role === 'departmentHead' ? '1' : undefined
      };
      setUser(mockUser);
      return true;
    }
    return false;
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout, isAuthenticated: !!user }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
