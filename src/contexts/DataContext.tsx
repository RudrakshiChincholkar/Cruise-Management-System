import React, { createContext, useContext, useState, ReactNode } from 'react';

export interface Department {
  id: string;
  name: string;
  description: string;
  headName: string;
  contact: string;
}

export interface DepartmentHead {
  id: string;
  name: string;
  email: string;
  salary: number;
  departmentId: string;
}

export interface Employee {
  id: string;
  name: string;
  position: string;
  salary: number;
  departmentId: string;
}

export interface Customer {
  id: string;
  name: string;
  bookingId: string;
  departmentId: string;
}

export interface Cruise {
  name: string;
  route: string;
  duration: string;
  capacity: number;
  services: string[];
}

interface DataContextType {
  departments: Department[];
  departmentHeads: DepartmentHead[];
  employees: Employee[];
  customers: Customer[];
  cruise: Cruise;
  addDepartment: (dept: Omit<Department, 'id'>) => void;
  updateDepartment: (id: string, dept: Partial<Department>) => void;
  deleteDepartment: (id: string) => void;
  addDepartmentHead: (head: Omit<DepartmentHead, 'id'>) => void;
  updateDepartmentHead: (id: string, head: Partial<DepartmentHead>) => void;
  deleteDepartmentHead: (id: string) => void;
  addEmployee: (emp: Omit<Employee, 'id'>) => void;
  updateEmployee: (id: string, emp: Partial<Employee>) => void;
  deleteEmployee: (id: string) => void;
  addCustomer: (cust: Omit<Customer, 'id'>) => void;
  updateCustomer: (id: string, cust: Partial<Customer>) => void;
  deleteCustomer: (id: string) => void;
}

const DataContext = createContext<DataContextType | undefined>(undefined);

const initialDepartments: Department[] = [
  { id: '1', name: 'Hotel', description: 'Luxury accommodation services', headName: 'John Smith', contact: 'hotel@cruise.com' },
  { id: '2', name: 'Bar', description: 'Premium beverage services', headName: 'Sarah Johnson', contact: 'bar@cruise.com' },
  { id: '3', name: 'Gaming Zone', description: 'Entertainment and gaming facilities', headName: 'Mike Davis', contact: 'gaming@cruise.com' },
  { id: '4', name: 'Theatre', description: 'Live shows and performances', headName: 'Emily Brown', contact: 'theatre@cruise.com' }
];

const initialDepartmentHeads: DepartmentHead[] = [
  { id: '1', name: 'John Smith', email: 'john@cruise.com', salary: 75000, departmentId: '1' },
  { id: '2', name: 'Sarah Johnson', email: 'sarah@cruise.com', salary: 70000, departmentId: '2' },
  { id: '3', name: 'Mike Davis', email: 'mike@cruise.com', salary: 68000, departmentId: '3' },
  { id: '4', name: 'Emily Brown', email: 'emily@cruise.com', salary: 72000, departmentId: '4' }
];

const initialEmployees: Employee[] = [
  { id: '1', name: 'Alice Cooper', position: 'Receptionist', salary: 35000, departmentId: '1' },
  { id: '2', name: 'Bob Martin', position: 'Housekeeper', salary: 30000, departmentId: '1' },
  { id: '3', name: 'Charlie Wilson', position: 'Bartender', salary: 32000, departmentId: '2' },
  { id: '4', name: 'Diana Ross', position: 'Server', salary: 28000, departmentId: '2' },
  { id: '5', name: 'Ethan Hunt', position: 'Game Operator', salary: 30000, departmentId: '3' },
  { id: '6', name: 'Fiona Apple', position: 'Security', salary: 33000, departmentId: '3' },
  { id: '7', name: 'George Michael', position: 'Stage Manager', salary: 38000, departmentId: '4' },
  { id: '8', name: 'Hannah Montana', position: 'Performer', salary: 40000, departmentId: '4' }
];

const initialCustomers: Customer[] = [
  { id: '1', name: 'Robert Williams', bookingId: 'BK001', departmentId: '1' },
  { id: '2', name: 'Jennifer Lopez', bookingId: 'BK002', departmentId: '1' },
  { id: '3', name: 'Michael Scott', bookingId: 'BK003', departmentId: '2' },
  { id: '4', name: 'Pam Beesly', bookingId: 'BK004', departmentId: '2' },
  { id: '5', name: 'Jim Halpert', bookingId: 'BK005', departmentId: '3' },
  { id: '6', name: 'Dwight Schrute', bookingId: 'BK006', departmentId: '3' },
  { id: '7', name: 'Angela Martin', bookingId: 'BK007', departmentId: '4' },
  { id: '8', name: 'Kevin Malone', bookingId: 'BK008', departmentId: '4' }
];

const cruiseData: Cruise = {
  name: 'Royal Oceanic Voyager',
  route: 'Miami → Bahamas → Jamaica → Cayman Islands → Miami',
  duration: '7 Days / 6 Nights',
  capacity: 3000,
  services: ['Luxury Suites', 'Fine Dining', '24/7 Room Service', 'Spa & Wellness', 'Kids Club', 'Water Sports']
};

export const DataProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [departments, setDepartments] = useState<Department[]>(initialDepartments);
  const [departmentHeads, setDepartmentHeads] = useState<DepartmentHead[]>(initialDepartmentHeads);
  const [employees, setEmployees] = useState<Employee[]>(initialEmployees);
  const [customers, setCustomers] = useState<Customer[]>(initialCustomers);
  const cruise = cruiseData;

  const addDepartment = (dept: Omit<Department, 'id'>) => {
    const newDept = { ...dept, id: Date.now().toString() };
    setDepartments([...departments, newDept]);
  };

  const updateDepartment = (id: string, dept: Partial<Department>) => {
    setDepartments(departments.map(d => d.id === id ? { ...d, ...dept } : d));
  };

  const deleteDepartment = (id: string) => {
    setDepartments(departments.filter(d => d.id !== id));
  };

  const addDepartmentHead = (head: Omit<DepartmentHead, 'id'>) => {
    const newHead = { ...head, id: Date.now().toString() };
    setDepartmentHeads([...departmentHeads, newHead]);
  };

  const updateDepartmentHead = (id: string, head: Partial<DepartmentHead>) => {
    setDepartmentHeads(departmentHeads.map(h => h.id === id ? { ...h, ...head } : h));
  };

  const deleteDepartmentHead = (id: string) => {
    setDepartmentHeads(departmentHeads.filter(h => h.id !== id));
  };

  const addEmployee = (emp: Omit<Employee, 'id'>) => {
    const newEmp = { ...emp, id: Date.now().toString() };
    setEmployees([...employees, newEmp]);
  };

  const updateEmployee = (id: string, emp: Partial<Employee>) => {
    setEmployees(employees.map(e => e.id === id ? { ...e, ...emp } : e));
  };

  const deleteEmployee = (id: string) => {
    setEmployees(employees.filter(e => e.id !== id));
  };

  const addCustomer = (cust: Omit<Customer, 'id'>) => {
    const newCust = { ...cust, id: Date.now().toString() };
    setCustomers([...customers, newCust]);
  };

  const updateCustomer = (id: string, cust: Partial<Customer>) => {
    setCustomers(customers.map(c => c.id === id ? { ...c, ...cust } : c));
  };

  const deleteCustomer = (id: string) => {
    setCustomers(customers.filter(c => c.id !== id));
  };

  return (
    <DataContext.Provider value={{
      departments,
      departmentHeads,
      employees,
      customers,
      cruise,
      addDepartment,
      updateDepartment,
      deleteDepartment,
      addDepartmentHead,
      updateDepartmentHead,
      deleteDepartmentHead,
      addEmployee,
      updateEmployee,
      deleteEmployee,
      addCustomer,
      updateCustomer,
      deleteCustomer
    }}>
      {children}
    </DataContext.Provider>
  );
};

export const useData = () => {
  const context = useContext(DataContext);
  if (context === undefined) {
    throw new Error('useData must be used within a DataProvider');
  }
  return context;
};
