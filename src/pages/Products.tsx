
import { useState } from "react";
import { SearchBar } from "../components/SearchBar";
import { Filter, Plus } from "lucide-react";
import { AddDialog } from "../components/AddDialog";
import { Button } from "@/components/ui/button";
import { ReportButton } from "../components/ReportButton";

type Product = {
  id: string;
  name: string;
  category: string;
  price: number;
  stock: number;
};

const initialProducts: Product[] = [
  { id: "PRD-001", name: "Wireless Headphones", category: "Electronics", price: 79.99, stock: 45 },
  { id: "PRD-002", name: "Smart Watch", category: "Electronics", price: 129.99, stock: 32 },
  { id: "PRD-003", name: "Office Chair", category: "Furniture", price: 189.99, stock: 18 },
  { id: "PRD-004", name: "Organic Apples (5lb)", category: "Groceries", price: 4.99, stock: 120 },
  { id: "PRD-005", name: "Cotton T-shirt", category: "Clothing", price: 24.99, stock: 78 },
  { id: "PRD-006", name: "Stainless Steel Water Bottle", category: "Kitchen", price: 19.99, stock: 54 },
  { id: "PRD-007", name: "Yoga Mat", category: "Sports", price: 29.99, stock: 25 },
  { id: "PRD-008", name: "LED Desk Lamp", category: "Electronics", price: 34.99, stock: 42 },
  { id: "PRD-009", name: "Ergonomic Keyboard", category: "Electronics", price: 89.99, stock: 23 },
  { id: "PRD-010", name: "Bluetooth Speaker", category: "Electronics", price: 59.99, stock: 38 },
  { id: "PRD-011", name: "Sectional Sofa", category: "Furniture", price: 799.99, stock: 8 },
  { id: "PRD-012", name: "Coffee Table", category: "Furniture", price: 249.99, stock: 15 },
  { id: "PRD-013", name: "Organic Bananas (bunch)", category: "Groceries", price: 2.49, stock: 150 },
  { id: "PRD-014", name: "Fresh Avocados (3pk)", category: "Groceries", price: 5.99, stock: 85 },
  { id: "PRD-015", name: "Designer Jeans", category: "Clothing", price: 69.99, stock: 42 },
  { id: "PRD-016", name: "Wool Sweater", category: "Clothing", price: 49.99, stock: 31 },
  { id: "PRD-017", name: "Non-stick Cookware Set", category: "Kitchen", price: 129.99, stock: 19 },
  { id: "PRD-018", name: "Chef's Knife", category: "Kitchen", price: 79.99, stock: 27 },
  { id: "PRD-019", name: "Tennis Racket", category: "Sports", price: 89.99, stock: 16 },
  { id: "PRD-020", name: "Running Shoes", category: "Sports", price: 119.99, stock: 36 },
];

export default function Products() {
  const [searchTerm, setSearchTerm] = useState("");
  const [products, setProducts] = useState<Product[]>(initialProducts);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);

  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.id.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getCategoryBadgeClasses = (category: string) => {
    switch (category) {
      case "Electronics":
        return "bg-blue-100 text-blue-800";
      case "Furniture":
        return "bg-amber-100 text-amber-800";
      case "Clothing":
        return "bg-purple-100 text-purple-800";
      case "Groceries":
        return "bg-green-100 text-green-800";
      case "Kitchen":
        return "bg-red-100 text-red-800";
      case "Sports":
        return "bg-indigo-100 text-indigo-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getStockClasses = (stock: number) => {
    if (stock <= 20) return "text-red-500";
    if (stock <= 50) return "text-yellow-500";
    return "text-green-500";
  };

  const handleAdd = (data: Record<string, any>) => {
    const newProduct: Product = {
      id: `PRD-${String(products.length + 1).padStart(3, '0')}`,
      name: data.name,
      category: data.category,
      price: parseFloat(data.price),
      stock: parseInt(data.stock)
    };
    setProducts([...products, newProduct]);
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-semibold mb-1">Products</h1>
          <p className="text-gray-600 text-sm">Manage your product inventory</p>
        </div>
        <div className="flex space-x-3">
          <ReportButton title="Products" type="products" data={products} />
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
        <div className="p-4 border-b border-gray-200 flex justify-between items-center">
          <div className="w-1/2">
            <SearchBar 
              placeholder="Search products..."
              onSearch={setSearchTerm}
            />
          </div>
          <div className="flex gap-2">
            <button className="px-3 py-2 border border-gray-300 rounded-md flex items-center hover:bg-gray-50">
              <Filter size={18} className="mr-2" />
              All
            </button>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead>
              <tr>
                <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
                <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Product</th>
                <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
                <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th>
                <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Stock</th>
                <th className="px-6 py-3 bg-gray-50 text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredProducts.map((product) => (
                <tr key={product.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{product.id}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="h-8 w-8 flex-shrink-0 mr-4 bg-purple-100 rounded-full flex items-center justify-center">
                        <div className="h-5 w-5 rounded-full bg-purple-500"></div>
                      </div>
                      <div className="text-sm font-medium text-gray-900">{product.name}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 inline-flex text-xs leading-5 font-medium rounded-full ${getCategoryBadgeClasses(product.category)}`}>
                      {product.category}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">${product.price.toFixed(2)}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className={`text-sm font-medium ${getStockClasses(product.stock)}`}>{product.stock}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <div className="flex justify-center">
                      <button className="text-gray-400 hover:text-gray-500">
                        <Filter size={16} />
                      </button>
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
        title="Product"
        fields={[
          { name: "name", label: "Name", type: "text" },
          { name: "category", label: "Category", type: "text" },
          { name: "price", label: "Price", type: "number" },
          { name: "stock", label: "Stock", type: "number" }
        ]}
      />
    </div>
  );
}
