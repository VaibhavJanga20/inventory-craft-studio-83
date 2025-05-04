
import { useState } from "react";
import { SearchBar } from "../components/SearchBar";
import { Plus, Edit, Trash } from "lucide-react";
import { EditDialog } from "../components/EditDialog";
import { AddDialog } from "../components/AddDialog";
import { Button } from "@/components/ui/button";
import { ReportButton } from "../components/ReportButton";
import { toast } from "@/components/ui/sonner";

type Product = {
  id: string;
  name: string;
  category: string;
  price: number;
  stock: number;
};

const initialProducts: Product[] = [
  { id: "PROD-001", name: "Wireless Earbuds", category: "Electronics", price: 59.99, stock: 120 },
  { id: "PROD-002", name: "Office Chair", category: "Furniture", price: 149.99, stock: 45 },
  { id: "PROD-003", name: "Cotton T-shirt", category: "Clothing", price: 19.99, stock: 200 },
  { id: "PROD-004", name: "Bestselling Novel", category: "Books", price: 14.99, stock: 85 },
  { id: "PROD-005", name: "Smart Watch", category: "Electronics", price: 199.99, stock: 60 },
  { id: "PROD-006", name: "Coffee Table", category: "Furniture", price: 89.99, stock: 30 },
  { id: "PROD-007", name: "Denim Jeans", category: "Clothing", price: 49.99, stock: 150 },
  { id: "PROD-008", name: "Cookbook", category: "Books", price: 24.99, stock: 75 },
  { id: "PROD-009", name: "Bluetooth Speaker", category: "Electronics", price: 79.99, stock: 90 },
  { id: "PROD-010", name: "Desk Lamp", category: "Furniture", price: 34.99, stock: 55 }
];

export default function Products() {
  const [searchTerm, setSearchTerm] = useState("");
  const [products, setProducts] = useState<Product[]>(initialProducts);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);

  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.id.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleEdit = (product: Product) => {
    setSelectedProduct(product);
    setIsEditDialogOpen(true);
  };

  const handleSave = (data: Record<string, any>) => {
    const updatedProducts = products.map((product) =>
      product.id === selectedProduct?.id
        ? {
            ...product,
            name: data.name,
            category: data.category,
            price: parseFloat(data.price),
            stock: parseInt(data.stock)
          }
        : product
    );
    setProducts(updatedProducts);
    toast.success("Product updated successfully");
  };

  const handleAdd = (data: Record<string, any>) => {
    const newProduct: Product = {
      id: `PROD-${String(products.length + 1).padStart(3, '0')}`,
      name: data.name,
      category: data.category,
      price: parseFloat(data.price),
      stock: parseInt(data.stock)
    };
    setProducts([...products, newProduct]);
    toast.success("Product added successfully");
  };

  const handleDelete = (productId: string) => {
    const updatedProducts = products.filter(product => product.id !== productId);
    setProducts(updatedProducts);
    toast.success("Product deleted successfully");
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-semibold mb-1">Products</h1>
          <p className="text-gray-600 text-sm">Manage your product catalog</p>
        </div>
        <div className="flex space-x-3">
          <ReportButton title="Products" type="products" data={products.sort((a, b) => b.stock - a.stock)} />
          <Button 
            className="px-4 py-2 bg-purple-500 text-white rounded-md flex items-center hover:bg-purple-600 transition-colors"
            onClick={() => setIsAddDialogOpen(true)}
          >
            <Plus size={18} className="mr-2" />
            Add Product
          </Button>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-gray-100">
        <div className="p-4 border-b border-gray-200">
          <h2 className="font-medium text-lg">Product List</h2>
        </div>
        <div className="p-4">
          <SearchBar 
            placeholder="Search products..."
            onSearch={setSearchTerm}
          />
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead>
              <tr>
                <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
                <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
                <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th>
                <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Stock</th>
                <th className="px-6 py-3 bg-gray-50 text-xs font-medium text-gray-500 uppercase tracking-wider text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredProducts.map((product) => (
                <tr key={product.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{product.id}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{product.name}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{product.category}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">${product.price.toFixed(2)}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{product.stock}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-center">
                    <div className="flex justify-center space-x-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleEdit(product)}
                        className="text-blue-600 hover:text-blue-800"
                      >
                        <Edit size={16} />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleDelete(product.id)}
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

      {selectedProduct && (
        <EditDialog
          isOpen={isEditDialogOpen}
          onClose={() => setIsEditDialogOpen(false)}
          onSave={handleSave}
          title="Product"
          fields={[
            { name: "name", label: "Name", type: "text", value: selectedProduct.name },
            { name: "category", label: "Category", type: "text", value: selectedProduct.category },
            { name: "price", label: "Price", type: "number", value: selectedProduct.price },
            { name: "stock", label: "Stock", type: "number", value: selectedProduct.stock },
          ]}
        />
      )}

      <AddDialog
        isOpen={isAddDialogOpen}
        onClose={() => setIsAddDialogOpen(false)}
        onAdd={handleAdd}
        title="Product"
        fields={[
          { name: "name", label: "Name", type: "text" },
          { name: "category", label: "Category", type: "text" },
          { name: "price", label: "Price", type: "number" },
          { name: "stock", label: "Stock", type: "number" },
        ]}
      />
    </div>
  );
}
