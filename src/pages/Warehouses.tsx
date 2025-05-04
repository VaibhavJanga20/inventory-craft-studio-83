
import { useState } from "react";
import { SearchBar } from "../components/SearchBar";
import { MapPin, Plus, Edit, Trash } from "lucide-react";
import { EditDialog } from "../components/EditDialog";
import { AddDialog } from "../components/AddDialog";
import { Button } from "@/components/ui/button";
import { ReportButton } from "../components/ReportButton";
import { toast } from "@/components/ui/sonner";

type Warehouse = {
  id: string;
  location: {
    city: string;
    state: string;
    zipCode: string;
  };
  managedBy: string;
  capacity: {
    used: number;
    total: number;
  };
};

const initialWarehouses: Warehouse[] = [
  { id: "WH-001", location: { city: "Los Angeles", state: "California", zipCode: "90001" }, managedBy: "John Doe", capacity: { used: 7500, total: 10000 } },
  { id: "WH-002", location: { city: "Brooklyn", state: "New York", zipCode: "11201" }, managedBy: "Jane Smith", capacity: { used: 5000, total: 8000 } },
  { id: "WH-003", location: { city: "Houston", state: "Texas", zipCode: "77001" }, managedBy: "Mike Johnson", capacity: { used: 9000, total: 12000 } },
  { id: "WH-004", location: { city: "Chicago", state: "Illinois", zipCode: "60601" }, managedBy: "Sarah Wilson", capacity: { used: 11000, total: 15000 } },
  { id: "WH-005", location: { city: "Miami", state: "Florida", zipCode: "33101" }, managedBy: "David Brown", capacity: { used: 4500, total: 7000 } },
  { id: "WH-006", location: { city: "Seattle", state: "Washington", zipCode: "98101" }, managedBy: "Emily Davis", capacity: { used: 6000, total: 9000 } },
  { id: "WH-007", location: { city: "Phoenix", state: "Arizona", zipCode: "85001" }, managedBy: "Michael Taylor", capacity: { used: 8500, total: 11000 } },
  { id: "WH-008", location: { city: "Boston", state: "Massachusetts", zipCode: "02101" }, managedBy: "Lisa Anderson", capacity: { used: 4000, total: 6000 } },
  { id: "WH-009", location: { city: "Denver", state: "Colorado", zipCode: "80201" }, managedBy: "Robert Martinez", capacity: { used: 5500, total: 8400 } },
  { id: "WH-010", location: { city: "Portland", state: "Oregon", zipCode: "97201" }, managedBy: "Jennifer Thomas", capacity: { used: 6000, total: 7500 } },
];

export default function Warehouses() {
  const [searchTerm, setSearchTerm] = useState("");
  const [warehouses, setWarehouses] = useState<Warehouse[]>(initialWarehouses);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [selectedWarehouse, setSelectedWarehouse] = useState<Warehouse | null>(null);

  const filteredWarehouses = warehouses.filter(warehouse =>
    warehouse.location.city.toLowerCase().includes(searchTerm.toLowerCase()) ||
    warehouse.location.state.toLowerCase().includes(searchTerm.toLowerCase()) ||
    warehouse.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
    warehouse.managedBy.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getCapacityPercentage = (used: number, total: number) => {
    return (used / total) * 100;
  };

  const getCapacityColor = (used: number, total: number) => {
    const percentage = getCapacityPercentage(used, total);
    
    if (percentage >= 90) return "bg-red-500";
    if (percentage >= 75) return "bg-orange-500";
    if (percentage >= 50) return "bg-yellow-500";
    return "bg-green-500";
  };

  const handleAdd = (data: Record<string, any>) => {
    const newWarehouse: Warehouse = {
      id: `WH-${String(warehouses.length + 1).padStart(3, '0')}`,
      location: {
        city: data.city,
        state: data.state,
        zipCode: data.zipCode
      },
      managedBy: data.managedBy,
      capacity: {
        used: parseInt(data.usedCapacity),
        total: parseInt(data.totalCapacity)
      }
    };
    setWarehouses([...warehouses, newWarehouse]);
    toast.success("Warehouse added successfully");
  };
  
  const handleEdit = (warehouse: Warehouse) => {
    setSelectedWarehouse(warehouse);
    setIsEditDialogOpen(true);
  };
  
  const handleSave = (data: Record<string, any>) => {
    const updatedWarehouses = warehouses.map((warehouse) =>
      warehouse.id === selectedWarehouse?.id
        ? {
            ...warehouse,
            location: {
              city: data.city,
              state: data.state,
              zipCode: data.zipCode
            },
            managedBy: data.managedBy,
            capacity: {
              used: parseInt(data.usedCapacity),
              total: parseInt(data.totalCapacity)
            }
          }
        : warehouse
    );
    setWarehouses(updatedWarehouses);
    toast.success("Warehouse updated successfully");
  };
  
  const handleDelete = (warehouseId: string) => {
    const updatedWarehouses = warehouses.filter(warehouse => warehouse.id !== warehouseId);
    setWarehouses(updatedWarehouses);
    toast.success("Warehouse deleted successfully");
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-semibold mb-1">Warehouses</h1>
          <p className="text-gray-600 text-sm">Manage warehouse locations and capacity</p>
        </div>
        <div className="flex space-x-3">
          <ReportButton title="Warehouses" type="warehouses" data={warehouses} />
          <Button 
            className="px-4 py-2 bg-purple-500 text-white rounded-md flex items-center hover:bg-purple-600 transition-colors"
            onClick={() => setIsAddDialogOpen(true)}
          >
            <Plus size={18} className="mr-2" />
            Add Warehouse
          </Button>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-gray-100">
        <div className="p-4 border-b border-gray-200">
          <h2 className="font-medium text-lg">Warehouse List</h2>
        </div>
        <div className="p-4">
          <SearchBar 
            placeholder="Search warehouses..."
            onSearch={setSearchTerm}
          />
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead>
              <tr>
                <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
                <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Location</th>
                <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Managed By</th>
                <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Capacity</th>
                <th className="px-6 py-3 bg-gray-50 text-xs font-medium text-gray-500 uppercase tracking-wider text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredWarehouses.map((warehouse) => (
                <tr key={warehouse.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{warehouse.id}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <MapPin size={16} className="text-gray-400 mr-2" />
                      <div className="text-sm text-gray-900">
                        {warehouse.location.city}, {warehouse.location.state}
                        <div className="text-xs text-gray-500">{warehouse.location.zipCode}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{warehouse.managedBy}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900 mb-1">
                      {warehouse.capacity.used} / {warehouse.capacity.total} units
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-1.5">
                      <div 
                        className={`h-1.5 rounded-full ${getCapacityColor(warehouse.capacity.used, warehouse.capacity.total)}`} 
                        style={{ width: `${getCapacityPercentage(warehouse.capacity.used, warehouse.capacity.total)}%` }}
                      ></div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-center">
                    <div className="flex justify-center space-x-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleEdit(warehouse)}
                        className="text-blue-600 hover:text-blue-800"
                      >
                        <Edit size={16} />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleDelete(warehouse.id)}
                        className="text-red-600 hover:text-red-800"
                      >
                        <Trash size={16} />
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <AddDialog
        isOpen={isAddDialogOpen}
        onClose={() => setIsAddDialogOpen(false)}
        onAdd={handleAdd}
        title="Warehouse"
        fields={[
          { name: "city", label: "City", type: "text" },
          { name: "state", label: "State", type: "text" },
          { name: "zipCode", label: "Zip Code", type: "text" },
          { name: "managedBy", label: "Managed By", type: "text" },
          { name: "usedCapacity", label: "Used Capacity", type: "number" },
          { name: "totalCapacity", label: "Total Capacity", type: "number" }
        ]}
      />
      
      {selectedWarehouse && (
        <EditDialog
          isOpen={isEditDialogOpen}
          onClose={() => setIsEditDialogOpen(false)}
          onSave={handleSave}
          title="Warehouse"
          fields={[
            { name: "city", label: "City", type: "text", value: selectedWarehouse.location.city },
            { name: "state", label: "State", type: "text", value: selectedWarehouse.location.state },
            { name: "zipCode", label: "Zip Code", type: "text", value: selectedWarehouse.location.zipCode },
            { name: "managedBy", label: "Managed By", type: "text", value: selectedWarehouse.managedBy },
            { name: "usedCapacity", label: "Used Capacity", type: "number", value: selectedWarehouse.capacity.used },
            { name: "totalCapacity", label: "Total Capacity", type: "number", value: selectedWarehouse.capacity.total }
          ]}
        />
      )}
    </div>
  );
}
