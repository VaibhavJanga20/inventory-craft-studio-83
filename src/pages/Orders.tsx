
import { useState } from "react";
import { SearchBar } from "../components/SearchBar";
import { Plus } from "lucide-react";
import { ReportButton } from "../components/ReportButton";

type Order = {
  id: string;
  date: string;
  status: "Completed" | "Processing" | "Pending";
  total: number;
};

const initialOrders: Order[] = [
  { id: "ORD-001", date: "2025-05-01", status: "Completed", total: 1200.00 },
  { id: "ORD-002", date: "2025-04-30", status: "Processing", total: 799.99 },
  { id: "ORD-003", date: "2025-04-29", status: "Pending", total: 145.97 },
  { id: "ORD-004", date: "2025-04-28", status: "Completed", total: 599.98 },
  { id: "ORD-005", date: "2025-04-27", status: "Processing", total: 89.99 },
  { id: "ORD-006", date: "2025-04-26", status: "Completed", total: 299.97 },
  { id: "ORD-007", date: "2025-04-25", status: "Pending", total: 1499.99 },
  { id: "ORD-008", date: "2025-04-24", status: "Processing", total: 499.98 },
  { id: "ORD-009", date: "2025-04-23", status: "Completed", total: 149.99 },
  { id: "ORD-010", date: "2025-04-22", status: "Pending", total: 999.99 },
  { id: "ORD-011", date: "2025-04-21", status: "Completed", total: 450.50 },
  { id: "ORD-012", date: "2025-04-20", status: "Processing", total: 1275.25 },
  { id: "ORD-013", date: "2025-04-19", status: "Completed", total: 675.40 },
  { id: "ORD-014", date: "2025-04-18", status: "Pending", total: 320.15 },
  { id: "ORD-015", date: "2025-04-17", status: "Processing", total: 890.75 },
];

export default function Orders() {
  const [searchTerm, setSearchTerm] = useState("");
  const [orders, setOrders] = useState<Order[]>(initialOrders);

  const filteredOrders = orders.filter(order =>
    order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
    order.date.toLowerCase().includes(searchTerm.toLowerCase()) ||
    order.status.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusBadgeClasses = (status: string) => {
    switch (status) {
      case "Completed":
        return "bg-green-100 text-green-800";
      case "Processing":
        return "bg-blue-100 text-blue-800";
      case "Pending":
        return "bg-yellow-100 text-yellow-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-semibold mb-1">Orders</h1>
          <p className="text-gray-600 text-sm">Manage customer orders</p>
        </div>
        <div className="flex space-x-3">
          <ReportButton title="Orders" type="orders" data={orders} />
          <button className="px-4 py-2 bg-purple-500 text-white rounded-md flex items-center hover:bg-purple-600 transition-colors">
            <Plus size={18} className="mr-2" />
            Add Order
          </button>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-gray-100">
        <div className="p-4 border-b border-gray-200">
          <h2 className="font-medium text-lg">Order List</h2>
        </div>
        <div className="p-4">
          <SearchBar 
            placeholder="Search orders..."
            onSearch={setSearchTerm}
          />
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead>
              <tr>
                <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Order ID</th>
                <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total Amount</th>
                <th className="px-6 py-3 bg-gray-50 text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredOrders.map((order) => (
                <tr key={order.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{order.id}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{order.date}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 inline-flex text-xs leading-5 font-medium rounded-full ${getStatusBadgeClasses(order.status)}`}>
                      {order.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">${order.total.toFixed(2)}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-blue-600 text-center">View Details</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
