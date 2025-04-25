
import { useState } from "react";
import { SearchBar } from "../components/SearchBar";
import { MapPin, Plus } from "lucide-react";

type Supplier = {
  id: string;
  name: string;
  location: {
    city: string;
    state: string;
    zipCode: string;
    country: string;
  };
  activeOrders: number;
};

const initialSuppliers: Supplier[] = [
  { id: "SUP-001", name: "Tech Supplies Co.", location: { city: "San Francisco", state: "California", zipCode: "94105", country: "US" }, activeOrders: 5 },
  { id: "SUP-002", name: "Global Electronics", location: { city: "New York City", state: "New York", zipCode: "10001", country: "US" }, activeOrders: 8 },
  { id: "SUP-003", name: "Quality Distributors", location: { city: "Houston", state: "Texas", zipCode: "77001", country: "US" }, activeOrders: 7 },
  { id: "SUP-004", name: "Prime Components", location: { city: "Chicago", state: "Illinois", zipCode: "60601", country: "US" }, activeOrders: 4 },
  { id: "SUP-005", name: "West Coast Supply", location: { city: "Seattle", state: "Washington", zipCode: "98101", country: "US" }, activeOrders: 6 },
  { id: "SUP-006", name: "Southern Wholesale", location: { city: "Miami", state: "Florida", zipCode: "33101", country: "US" }, activeOrders: 2 },
  { id: "SUP-007", name: "Midwest Suppliers", location: { city: "Detroit", state: "Michigan", zipCode: "48201", country: "US" }, activeOrders: 8 },
  { id: "SUP-008", name: "East Coast Logistics", location: { city: "Boston", state: "Massachusetts", zipCode: "02101", country: "US" }, activeOrders: 5 },
  { id: "SUP-009", name: "Desert Distribution", location: { city: "Phoenix", state: "Arizona", zipCode: "85001", country: "US" }, activeOrders: 3 },
  { id: "SUP-010", name: "Mountain Supply Co", location: { city: "Denver", state: "Colorado", zipCode: "80201", country: "US" }, activeOrders: 4 },
];

export default function Suppliers() {
  const [searchTerm, setSearchTerm] = useState("");
  const [suppliers, setSuppliers] = useState<Supplier[]>(initialSuppliers);

  const filteredSuppliers = suppliers.filter(supplier =>
    supplier.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    supplier.location.city.toLowerCase().includes(searchTerm.toLowerCase()) ||
    supplier.location.state.toLowerCase().includes(searchTerm.toLowerCase()) ||
    supplier.id.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-semibold mb-1">Suppliers</h1>
          <p className="text-gray-600 text-sm">Manage your supplier relationships</p>
        </div>
        <button className="px-4 py-2 bg-purple-500 text-white rounded-md flex items-center hover:bg-purple-600 transition-colors">
          <Plus size={18} className="mr-2" />
          Add Supplier
        </button>
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-gray-100">
        <div className="p-4 border-b border-gray-200">
          <h2 className="font-medium text-lg">Supplier List</h2>
        </div>
        <div className="p-4">
          <SearchBar 
            placeholder="Search suppliers..."
            onSearch={setSearchTerm}
          />
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead>
              <tr>
                <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
                <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Location</th>
                <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Active Orders</th>
                <th className="px-6 py-3 bg-gray-50 text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredSuppliers.map((supplier) => (
                <tr key={supplier.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{supplier.id}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{supplier.name}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <MapPin size={16} className="text-gray-400 mr-2" />
                      <div className="text-sm text-gray-900">
                        {supplier.location.city}, {supplier.location.state}
                        <div className="text-xs text-gray-500">{supplier.location.zipCode}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{supplier.activeOrders}</td>
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
