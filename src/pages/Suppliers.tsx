
import { useState } from "react";
import { SearchBar } from "../components/SearchBar";
import { MapPin, Plus, Edit, Trash } from "lucide-react";
import { EditDialog } from "../components/EditDialog";
import { AddDialog } from "../components/AddDialog";
import { Button } from "@/components/ui/button";
import { ReportButton } from "../components/ReportButton";
import { toast } from "@/components/ui/sonner";

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
  const [selectedSupplier, setSelectedSupplier] = useState<Supplier | null>(null);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);

  const filteredSuppliers = suppliers.filter(supplier =>
    supplier.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    supplier.location.city.toLowerCase().includes(searchTerm.toLowerCase()) ||
    supplier.location.state.toLowerCase().includes(searchTerm.toLowerCase()) ||
    supplier.id.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleEdit = (supplier: Supplier) => {
    setSelectedSupplier(supplier);
    setIsEditDialogOpen(true);
  };

  const handleSave = (data: Record<string, any>) => {
    const updatedSuppliers = suppliers.map((supplier) =>
      supplier.id === selectedSupplier?.id
        ? {
            ...supplier,
            name: data.name,
            location: {
              ...supplier.location,
              city: data.city,
              state: data.state,
              zipCode: data.zipCode,
            },
            activeOrders: parseInt(data.activeOrders)
          }
        : supplier
    );
    setSuppliers(updatedSuppliers);
    toast.success("Supplier updated successfully");
  };
  
  const handleDelete = (supplierId: string) => {
    const updatedSuppliers = suppliers.filter(supplier => supplier.id !== supplierId);
    setSuppliers(updatedSuppliers);
    toast.success("Supplier deleted successfully");
  };
  
  const handleAdd = (data: Record<string, any>) => {
    const newSupplier: Supplier = {
      id: `SUP-${String(suppliers.length + 1).padStart(3, '0')}`,
      name: data.name,
      location: {
        city: data.city,
        state: data.state,
        zipCode: data.zipCode,
        country: "US"
      },
      activeOrders: parseInt(data.activeOrders || "0")
    };
    setSuppliers([...suppliers, newSupplier]);
    toast.success("Supplier added successfully");
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-semibold mb-1">Suppliers</h1>
          <p className="text-gray-600 text-sm">Manage your supplier relationships</p>
        </div>
        <div className="flex space-x-3">
          <ReportButton title="Suppliers" type="suppliers" data={suppliers} />
          <Button 
            className="px-4 py-2 bg-purple-500 text-white rounded-md flex items-center hover:bg-purple-600 transition-colors"
            onClick={() => setIsAddDialogOpen(true)}
          >
            <Plus size={18} className="mr-2" />
            Add Supplier
          </Button>
        </div>
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
                <th className="px-6 py-3 bg-gray-50 text-xs font-medium text-gray-500 uppercase tracking-wider text-center">Actions</th>
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
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-center">
                    <div className="flex justify-center space-x-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleEdit(supplier)}
                        className="text-blue-600 hover:text-blue-800"
                      >
                        <Edit size={16} />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleDelete(supplier.id)}
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

      {selectedSupplier && (
        <EditDialog
          isOpen={isEditDialogOpen}
          onClose={() => setIsEditDialogOpen(false)}
          onSave={handleSave}
          title="Supplier"
          fields={[
            { name: "name", label: "Name", type: "text", value: selectedSupplier.name },
            { name: "city", label: "City", type: "text", value: selectedSupplier.location.city },
            { name: "state", label: "State", type: "text", value: selectedSupplier.location.state },
            { name: "zipCode", label: "Zip Code", type: "text", value: selectedSupplier.location.zipCode },
            { name: "activeOrders", label: "Active Orders", type: "number", value: selectedSupplier.activeOrders },
          ]}
        />
      )}

      <AddDialog
        isOpen={isAddDialogOpen}
        onClose={() => setIsAddDialogOpen(false)}
        onAdd={handleAdd}
        title="Supplier"
        fields={[
          { name: "name", label: "Name", type: "text" },
          { name: "city", label: "City", type: "text" },
          { name: "state", label: "State", type: "text" },
          { name: "zipCode", label: "Zip Code", type: "text" },
          { name: "activeOrders", label: "Active Orders", type: "number" }
        ]}
      />
    </div>
  );
}
