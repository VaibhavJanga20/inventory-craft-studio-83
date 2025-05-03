
import { useState } from "react";
import { SearchBar } from "../components/SearchBar";
import { Plus } from "lucide-react";

type Employee = {
  id: string;
  name: string;
  dateOfBirth: string;
  age: number;
};

const initialEmployees: Employee[] = [
  { id: "EMP-001", name: "John Doe", dateOfBirth: "1990-05-15", age: 33 },
  { id: "EMP-002", name: "Jane Smith", dateOfBirth: "1988-08-22", age: 35 },
  { id: "EMP-003", name: "Mike Johnson", dateOfBirth: "1992-03-10", age: 31 },
  { id: "EMP-004", name: "Sarah Wilson", dateOfBirth: "1997-07-18", age: 32 },
  { id: "EMP-005", name: "David Brown", dateOfBirth: "1989-11-30", age: 34 },
  { id: "EMP-006", name: "Emily Davis", dateOfBirth: "1994-04-25", age: 30 },
  { id: "EMP-007", name: "Michael Taylor", dateOfBirth: "1987-09-12", age: 36 },
  { id: "EMP-008", name: "Lisa Anderson", dateOfBirth: "1994-02-08", age: 29 },
  { id: "EMP-009", name: "Robert Martinez", dateOfBirth: "1986-12-03", age: 37 },
  { id: "EMP-010", name: "Jennifer Thomas", dateOfBirth: "1992-06-20", age: 31 },
  { id: "EMP-011", name: "Steven Johnson", dateOfBirth: "1985-01-14", age: 38 },
  { id: "EMP-012", name: "Amanda Wilson", dateOfBirth: "1991-03-27", age: 32 },
  { id: "EMP-013", name: "Christopher Lee", dateOfBirth: "1988-07-09", age: 35 },
  { id: "EMP-014", name: "Jessica Garcia", dateOfBirth: "1993-09-02", age: 30 },
  { id: "EMP-015", name: "Matthew Rodriguez", dateOfBirth: "1987-11-11", age: 36 },
  { id: "EMP-016", name: "Ashley Martinez", dateOfBirth: "1996-04-18", age: 27 },
  { id: "EMP-017", name: "Daniel Thompson", dateOfBirth: "1990-08-07", age: 33 },
  { id: "EMP-018", name: "Stephanie Clark", dateOfBirth: "1989-12-21", age: 34 },
  { id: "EMP-019", name: "Andrew Lewis", dateOfBirth: "1995-05-30", age: 28 },
  { id: "EMP-020", name: "Nicole Walker", dateOfBirth: "1993-02-14", age: 30 },
];

export default function Employees() {
  const [searchTerm, setSearchTerm] = useState("");
  const [employees, setEmployees] = useState<Employee[]>(initialEmployees);

  const filteredEmployees = employees.filter(employee =>
    employee.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    employee.id.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-semibold mb-1">Employees</h1>
          <p className="text-gray-600 text-sm">Manage employee information</p>
        </div>
        <button className="px-4 py-2 bg-purple-500 text-white rounded-md flex items-center hover:bg-purple-600 transition-colors">
          <Plus size={18} className="mr-2" />
          Add Employee
        </button>
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-gray-100">
        <div className="p-4 border-b border-gray-200">
          <h2 className="font-medium text-lg">Employee List</h2>
        </div>
        <div className="p-4">
          <SearchBar 
            placeholder="Search employees..."
            onSearch={setSearchTerm}
          />
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead>
              <tr>
                <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
                <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date of Birth</th>
                <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Age</th>
                <th className="px-6 py-3 bg-gray-50 text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredEmployees.map((employee) => (
                <tr key={employee.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{employee.id}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{employee.name}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center text-sm text-gray-500">
                      <div className="mr-1">📅</div>
                      {employee.dateOfBirth}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{employee.age} years</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-blue-600 text-center">Edit</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
