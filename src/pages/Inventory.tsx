
import { useState } from "react";
import { SearchBar } from "../components/SearchBar";
import { Plus } from "lucide-react";

type InventoryItem = {
  id: string;
  category: string;
  quantity: number;
  status: "In Stock" | "Low Stock" | "Out of Stock";
  lastUpdated: string;
};

const initialInventory: InventoryItem[] = [
  { id: "INV-001", category: "Electronics", quantity: 150, status: "In Stock", lastUpdated: "2024-01-20 14:30" },
  { id: "INV-002", category: "Furniture", quantity: 18, status: "Low Stock", lastUpdated: "2024-01-19 09:15" },
  { id: "INV-003", category: "Clothing", quantity: 200, status: "In Stock", lastUpdated: "2024-01-21 11:45" },
  { id: "INV-004", category: "Books", quantity: 320, status: "In Stock", lastUpdated: "2024-01-22 13:20" },
  { id: "INV-005", category: "Sports", quantity: 25, status: "Low Stock", lastUpdated: "2024-01-23 15:10" },
  { id: "INV-006", category: "Home Decor", quantity: 0, status: "Out of Stock", lastUpdated: "2024-01-24 16:45" },
  { id: "INV-007", category: "Toys", quantity: 180, status: "In Stock", lastUpdated: "2024-01-25 10:30" },
  { id: "INV-008", category: "Beauty", quantity: 20, status: "Low Stock", lastUpdated: "2024-01-26 12:15" },
  { id: "INV-009", category: "Automotive", quantity: 60, status: "In Stock", lastUpdated: "2024-01-27 14:30" },
  { id: "INV-010", category: "Garden", quantity: 85, status: "In Stock", lastUpdated: "2024-01-28 09:25" },
];

export default function Inventory() {
  const [searchTerm, setSearchTerm] = useState("");
  const [inventory, setInventory] = useState<InventoryItem[]>(initialInventory);

  const filteredInventory = inventory.filter(item =>
    item.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.id.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusBadgeClasses = (status: string) => {
    switch (status) {
      case "In Stock":
        return "bg-green-100 text-green-800";
      case "Low Stock":
        return "bg-yellow-100 text-yellow-800";
      case "Out of Stock":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-semibold mb-1">Inventory</h1>
          <p className="text-gray-600 text-sm">Track your inventory levels</p>
        </div>
        <button className="px-4 py-2 bg-purple-500 text-white rounded-md flex items-center hover:bg-purple-600 transition-colors">
          <Plus size={18} className="mr-2" />
          Add Inventory
        </button>
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-gray-100">
        <div className="p-4 border-b border-gray-200">
          <h2 className="font-medium text-lg">Inventory List</h2>
        </div>
        <div className="p-4">
          <SearchBar 
            placeholder="Search inventory..."
            onSearch={setSearchTerm}
          />
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead>
              <tr>
                <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
                <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
                <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Quantity</th>
                <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Last Updated</th>
                <th className="px-6 py-3 bg-gray-50 text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredInventory.map((item) => (
                <tr key={item.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{item.id}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="h-8 w-8 flex-shrink-0 mr-4 bg-purple-100 rounded-full flex items-center justify-center">
                        <div className="h-5 w-5 rounded-full bg-purple-500"></div>
                      </div>
                      <div className="text-sm font-medium text-gray-900">{item.category}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{item.quantity}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 inline-flex text-xs leading-5 font-medium rounded-full ${getStatusBadgeClasses(item.status)}`}>
                      {item.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.lastUpdated}</td>
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
