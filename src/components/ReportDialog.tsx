
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  BarChart, Bar, LineChart, Line, PieChart, Pie, 
  XAxis, YAxis, CartesianGrid, Tooltip, Legend, 
  ResponsiveContainer, Cell 
} from "recharts";

type TimeRange = "weekly" | "monthly" | "yearly";

type ReportDialogProps = {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  type: "products" | "inventory" | "categories" | "suppliers" | "orders" | "warehouses";
  data: any[];
};

const COLORS = ["#8B5CF6", "#D946EF", "#F97316", "#0EA5E9", "#10B981", "#F59E0B"];

export function ReportDialog({ isOpen, onClose, title, type, data }: ReportDialogProps) {
  const [timeRange, setTimeRange] = useState<TimeRange>("monthly");

  const renderReport = () => {
    switch (type) {
      case "products":
        return <ProductReport data={data} timeRange={timeRange} />;
      case "inventory":
        return <InventoryReport data={data} timeRange={timeRange} />;
      case "categories":
        return <CategoriesReport data={data} timeRange={timeRange} />;
      case "suppliers":
        return <SuppliersReport data={data} timeRange={timeRange} />;
      case "orders":
        return <OrdersReport data={data} timeRange={timeRange} />;
      case "warehouses":
        return <WarehousesReport data={data} timeRange={timeRange} />;
      default:
        return <div>No report available for this section</div>;
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[900px] max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold">{title} Report</DialogTitle>
        </DialogHeader>
        
        <div className="mt-4">
          <Tabs defaultValue={timeRange} onValueChange={(value) => setTimeRange(value as TimeRange)}>
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="weekly">Weekly</TabsTrigger>
              <TabsTrigger value="monthly">Monthly</TabsTrigger>
              <TabsTrigger value="yearly">Yearly</TabsTrigger>
            </TabsList>
            <TabsContent value={timeRange} className="mt-4">
              {renderReport()}
            </TabsContent>
          </Tabs>
        </div>
      </DialogContent>
    </Dialog>
  );
}

// Product Report Component
function ProductReport({ data, timeRange }: { data: any[], timeRange: TimeRange }) {
  // Generate sample data based on the products data for different time ranges
  const categoryData = processCategoryData(data);
  const priceRangeData = processPriceRangeData(data);
  const stockTrendData = generateStockTrendData(data, timeRange);

  return (
    <div className="space-y-8">
      <div>
        <h3 className="font-medium text-lg mb-4">Product Overview</h3>
        <div className="grid grid-cols-3 gap-4">
          <div className="bg-purple-50 p-4 rounded-lg">
            <p className="text-sm text-gray-500">Total Products</p>
            <p className="text-2xl font-semibold">{data.length}</p>
          </div>
          <div className="bg-blue-50 p-4 rounded-lg">
            <p className="text-sm text-gray-500">Low Stock Items</p>
            <p className="text-2xl font-semibold">{data.filter(item => item.stock <= 20).length}</p>
          </div>
          <div className="bg-green-50 p-4 rounded-lg">
            <p className="text-sm text-gray-500">Avg. Price</p>
            <p className="text-2xl font-semibold">
              ${(data.reduce((sum, item) => sum + item.price, 0) / data.length).toFixed(2)}
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-6">
        <div>
          <h3 className="font-medium mb-4">Products by Category</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={categoryData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                  nameKey="name"
                  label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                >
                  {categoryData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div>
          <h3 className="font-medium mb-4">Price Distribution</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={priceRangeData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="range" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="count" fill="#8B5CF6" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      <div>
        <h3 className="font-medium mb-4">Stock Level Trend ({timeRange})</h3>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={stockTrendData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="Electronics" stroke="#8B5CF6" strokeWidth={2} />
              <Line type="monotone" dataKey="Furniture" stroke="#D946EF" strokeWidth={2} />
              <Line type="monotone" dataKey="Clothing" stroke="#F97316" strokeWidth={2} />
              <Line type="monotone" dataKey="Kitchen" stroke="#0EA5E9" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}

// Inventory Report Component
function InventoryReport({ data, timeRange }: { data: any[], timeRange: TimeRange }) {
  const stockStatusData = [
    { name: "In Stock", value: data.filter(item => item.status === "In Stock").length },
    { name: "Low Stock", value: data.filter(item => item.status === "Low Stock").length },
    { name: "Out of Stock", value: data.filter(item => item.status === "Out of Stock").length },
  ];

  const inventoryTrendData = generateInventoryTrendData(data, timeRange);
  const categoryStockData = processCategoryStockData(data);

  return (
    <div className="space-y-8">
      <div>
        <h3 className="font-medium text-lg mb-4">Inventory Overview</h3>
        <div className="grid grid-cols-3 gap-4">
          <div className="bg-green-50 p-4 rounded-lg">
            <p className="text-sm text-gray-500">Total Items</p>
            <p className="text-2xl font-semibold">{data.length}</p>
          </div>
          <div className="bg-yellow-50 p-4 rounded-lg">
            <p className="text-sm text-gray-500">Low Stock</p>
            <p className="text-2xl font-semibold">{data.filter(item => item.status === "Low Stock").length}</p>
          </div>
          <div className="bg-red-50 p-4 rounded-lg">
            <p className="text-sm text-gray-500">Out of Stock</p>
            <p className="text-2xl font-semibold">{data.filter(item => item.status === "Out of Stock").length}</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-6">
        <div>
          <h3 className="font-medium mb-4">Stock Status Distribution</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={stockStatusData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                  nameKey="name"
                  label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                >
                  <Cell fill="#10B981" /> {/* In Stock */}
                  <Cell fill="#F59E0B" /> {/* Low Stock */}
                  <Cell fill="#EF4444" /> {/* Out of Stock */}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div>
          <h3 className="font-medium mb-4">Stock Levels by Category</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={categoryStockData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="category" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="quantity" fill="#8B5CF6" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      <div>
        <h3 className="font-medium mb-4">Inventory Level Trend ({timeRange})</h3>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={inventoryTrendData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="total" stroke="#8B5CF6" strokeWidth={2} name="Total Stock" />
              <Line type="monotone" dataKey="lowStock" stroke="#F59E0B" strokeWidth={2} name="Low Stock" />
              <Line type="monotone" dataKey="outOfStock" stroke="#EF4444" strokeWidth={2} name="Out of Stock" />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}

// Categories Report Component
function CategoriesReport({ data, timeRange }: { data: any[], timeRange: TimeRange }) {
  const categoriesData = data.map(category => ({
    name: category.name,
    items: category.items
  })).sort((a, b) => b.items - a.items);

  const categoryGrowthData = generateCategoryGrowthData(data, timeRange);
  
  return (
    <div className="space-y-8">
      <div>
        <h3 className="font-medium text-lg mb-4">Categories Overview</h3>
        <div className="grid grid-cols-3 gap-4">
          <div className="bg-purple-50 p-4 rounded-lg">
            <p className="text-sm text-gray-500">Total Categories</p>
            <p className="text-2xl font-semibold">{data.length}</p>
          </div>
          <div className="bg-blue-50 p-4 rounded-lg">
            <p className="text-sm text-gray-500">Total Items</p>
            <p className="text-2xl font-semibold">
              {data.reduce((sum, category) => sum + category.items, 0)}
            </p>
          </div>
          <div className="bg-green-50 p-4 rounded-lg">
            <p className="text-sm text-gray-500">Avg. Items per Category</p>
            <p className="text-2xl font-semibold">
              {Math.round(data.reduce((sum, category) => sum + category.items, 0) / data.length)}
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-6">
        <div>
          <h3 className="font-medium mb-4">Items by Category</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={categoriesData.slice(0, 10)} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis type="number" />
                <YAxis dataKey="name" type="category" width={100} />
                <Tooltip />
                <Bar dataKey="items" fill="#8B5CF6" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div>
          <h3 className="font-medium mb-4">Category Distribution</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={categoriesData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="items"
                  nameKey="name"
                  label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                >
                  {categoriesData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      <div>
        <h3 className="font-medium mb-4">Category Growth ({timeRange})</h3>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={categoryGrowthData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Legend />
              {data.slice(0, 5).map((category, index) => (
                <Line 
                  key={category.id} 
                  type="monotone" 
                  dataKey={category.name} 
                  stroke={COLORS[index % COLORS.length]} 
                  strokeWidth={2} 
                />
              ))}
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}

// Suppliers Report Component
function SuppliersReport({ data, timeRange }: { data: any[], timeRange: TimeRange }) {
  const locationData = processSupplierLocationData(data);
  const ordersTrendData = generateSupplierOrdersTrendData(data, timeRange);

  return (
    <div className="space-y-8">
      <div>
        <h3 className="font-medium text-lg mb-4">Suppliers Overview</h3>
        <div className="grid grid-cols-3 gap-4">
          <div className="bg-purple-50 p-4 rounded-lg">
            <p className="text-sm text-gray-500">Total Suppliers</p>
            <p className="text-2xl font-semibold">{data.length}</p>
          </div>
          <div className="bg-blue-50 p-4 rounded-lg">
            <p className="text-sm text-gray-500">Active Orders</p>
            <p className="text-2xl font-semibold">
              {data.reduce((sum, supplier) => sum + supplier.activeOrders, 0)}
            </p>
          </div>
          <div className="bg-green-50 p-4 rounded-lg">
            <p className="text-sm text-gray-500">Avg. Orders per Supplier</p>
            <p className="text-2xl font-semibold">
              {(data.reduce((sum, supplier) => sum + supplier.activeOrders, 0) / data.length).toFixed(1)}
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-6">
        <div>
          <h3 className="font-medium mb-4">Suppliers by Location</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={locationData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="state" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="count" fill="#8B5CF6" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div>
          <h3 className="font-medium mb-4">Active Orders by Supplier</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={data.map(supplier => ({
                    name: supplier.name,
                    value: supplier.activeOrders
                  }))}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                  nameKey="name"
                  label={({ name, percent }) => 
                    name.length > 10 
                      ? `${name.substring(0, 10)}...: ${(percent * 100).toFixed(0)}%`
                      : `${name}: ${(percent * 100).toFixed(0)}%`
                  }
                >
                  {data.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      <div>
        <h3 className="font-medium mb-4">Order Trend by Top Suppliers ({timeRange})</h3>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={ordersTrendData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Legend />
              {data.slice(0, 5).sort((a, b) => b.activeOrders - a.activeOrders).map((supplier, index) => (
                <Line 
                  key={supplier.id} 
                  type="monotone" 
                  dataKey={supplier.name} 
                  stroke={COLORS[index % COLORS.length]} 
                  strokeWidth={2} 
                />
              ))}
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}

// Orders Report Component
function OrdersReport({ data, timeRange }: { data: any[], timeRange: TimeRange }) {
  const statusData = [
    { name: "Completed", value: data.filter(order => order.status === "Completed").length },
    { name: "Processing", value: data.filter(order => order.status === "Processing").length },
    { name: "Pending", value: data.filter(order => order.status === "Pending").length },
  ];

  const ordersTrendData = generateOrdersTrendData(data, timeRange);
  const revenueData = generateRevenueData(data, timeRange);

  return (
    <div className="space-y-8">
      <div>
        <h3 className="font-medium text-lg mb-4">Orders Overview</h3>
        <div className="grid grid-cols-3 gap-4">
          <div className="bg-purple-50 p-4 rounded-lg">
            <p className="text-sm text-gray-500">Total Orders</p>
            <p className="text-2xl font-semibold">{data.length}</p>
          </div>
          <div className="bg-blue-50 p-4 rounded-lg">
            <p className="text-sm text-gray-500">Total Revenue</p>
            <p className="text-2xl font-semibold">
              ${data.reduce((sum, order) => sum + order.total, 0).toFixed(2)}
            </p>
          </div>
          <div className="bg-green-50 p-4 rounded-lg">
            <p className="text-sm text-gray-500">Avg. Order Value</p>
            <p className="text-2xl font-semibold">
              ${(data.reduce((sum, order) => sum + order.total, 0) / data.length).toFixed(2)}
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-6">
        <div>
          <h3 className="font-medium mb-4">Order Status Distribution</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={statusData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                  nameKey="name"
                  label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                >
                  <Cell fill="#10B981" /> {/* Completed */}
                  <Cell fill="#3B82F6" /> {/* Processing */}
                  <Cell fill="#F59E0B" /> {/* Pending */}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div>
          <h3 className="font-medium mb-4">Order Value Distribution</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={processOrderValueData(data)}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="range" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="count" fill="#8B5CF6" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-6">
        <div>
          <h3 className="font-medium mb-4">Orders Trend ({timeRange})</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={ordersTrendData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="orders" stroke="#8B5CF6" strokeWidth={2} name="Orders" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div>
          <h3 className="font-medium mb-4">Revenue Trend ({timeRange})</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={revenueData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip formatter={(value) => [`$${value}`, 'Revenue']} />
                <Legend />
                <Line type="monotone" dataKey="revenue" stroke="#10B981" strokeWidth={2} name="Revenue" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
}

// Warehouses Report Component
function WarehousesReport({ data, timeRange }: { data: any[], timeRange: TimeRange }) {
  const capacityData = data.map(warehouse => ({
    name: warehouse.location.city,
    used: warehouse.capacity.used,
    available: warehouse.capacity.total - warehouse.capacity.used,
  }));

  const utilizationTrendData = generateWarehouseUtilizationTrendData(data, timeRange);
  
  return (
    <div className="space-y-8">
      <div>
        <h3 className="font-medium text-lg mb-4">Warehouses Overview</h3>
        <div className="grid grid-cols-3 gap-4">
          <div className="bg-purple-50 p-4 rounded-lg">
            <p className="text-sm text-gray-500">Total Warehouses</p>
            <p className="text-2xl font-semibold">{data.length}</p>
          </div>
          <div className="bg-blue-50 p-4 rounded-lg">
            <p className="text-sm text-gray-500">Total Capacity</p>
            <p className="text-2xl font-semibold">
              {data.reduce((sum, warehouse) => sum + warehouse.capacity.total, 0).toLocaleString()} units
            </p>
          </div>
          <div className="bg-green-50 p-4 rounded-lg">
            <p className="text-sm text-gray-500">Avg. Utilization</p>
            <p className="text-2xl font-semibold">
              {Math.round(data.reduce((sum, warehouse) => 
                sum + (warehouse.capacity.used / warehouse.capacity.total) * 100, 0) / data.length)}%
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-6">
        <div>
          <h3 className="font-medium mb-4">Warehouse Capacity Utilization</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={capacityData} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis type="number" />
                <YAxis dataKey="name" type="category" width={100} />
                <Tooltip />
                <Legend />
                <Bar dataKey="used" stackId="a" fill="#8B5CF6" name="Used Capacity" />
                <Bar dataKey="available" stackId="a" fill="#E5DEFF" name="Available" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div>
          <h3 className="font-medium mb-4">Warehouse Location Distribution</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={data.map(warehouse => ({
                    name: warehouse.location.state,
                    value: 1
                  }))}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                  nameKey="name"
                  label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                >
                  {data.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      <div>
        <h3 className="font-medium mb-4">Warehouse Utilization Trend ({timeRange})</h3>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={utilizationTrendData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Legend />
              {data.slice(0, 5).map((warehouse, index) => (
                <Line 
                  key={warehouse.id} 
                  type="monotone" 
                  dataKey={warehouse.location.city} 
                  stroke={COLORS[index % COLORS.length]} 
                  strokeWidth={2} 
                />
              ))}
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}

// Helper functions for data processing
function processCategoryData(products: any[]) {
  const categories: Record<string, number> = {};
  
  products.forEach(product => {
    if (categories[product.category]) {
      categories[product.category]++;
    } else {
      categories[product.category] = 1;
    }
  });
  
  return Object.keys(categories).map(category => ({
    name: category,
    value: categories[category]
  }));
}

function processPriceRangeData(products: any[]) {
  const priceRanges = [
    { range: "$0-$25", min: 0, max: 25, count: 0 },
    { range: "$25-$50", min: 25, max: 50, count: 0 },
    { range: "$50-$100", min: 50, max: 100, count: 0 },
    { range: "$100-$200", min: 100, max: 200, count: 0 },
    { range: "$200+", min: 200, max: Infinity, count: 0 },
  ];
  
  products.forEach(product => {
    const price = product.price;
    for (const range of priceRanges) {
      if (price >= range.min && price < range.max) {
        range.count++;
        break;
      }
    }
  });
  
  return priceRanges;
}

function processOrderValueData(orders: any[]) {
  const orderRanges = [
    { range: "$0-$100", min: 0, max: 100, count: 0 },
    { range: "$100-$500", min: 100, max: 500, count: 0 },
    { range: "$500-$1000", min: 500, max: 1000, count: 0 },
    { range: "$1000+", min: 1000, max: Infinity, count: 0 },
  ];
  
  orders.forEach(order => {
    const total = order.total;
    for (const range of orderRanges) {
      if (total >= range.min && total < range.max) {
        range.count++;
        break;
      }
    }
  });
  
  return orderRanges;
}

function processCategoryStockData(items: any[]) {
  const categories: Record<string, number> = {};
  
  items.forEach(item => {
    if (categories[item.category]) {
      categories[item.category] += item.quantity;
    } else {
      categories[item.category] = item.quantity;
    }
  });
  
  return Object.keys(categories).map(category => ({
    category,
    quantity: categories[category]
  }));
}

function processSupplierLocationData(suppliers: any[]) {
  const locations: Record<string, number> = {};
  
  suppliers.forEach(supplier => {
    if (locations[supplier.location.state]) {
      locations[supplier.location.state]++;
    } else {
      locations[supplier.location.state] = 1;
    }
  });
  
  return Object.keys(locations).map(state => ({
    state,
    count: locations[state]
  }));
}

// Helper functions to generate trend data
function generateStockTrendData(products: any[], timeRange: TimeRange) {
  const periods = timeRange === "weekly" ? 7 : timeRange === "monthly" ? 30 : 12;
  const data = [];

  const categories = [...new Set(products.map(product => product.category))].slice(0, 4);
  
  for (let i = 0; i < periods; i++) {
    const entry: any = {
      name: timeRange === "weekly" 
        ? ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"][i % 7]
        : timeRange === "monthly" 
          ? `Day ${i + 1}` 
          : ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"][i]
    };
    
    categories.forEach(category => {
      // Generate some random data that looks realistic
      entry[category] = Math.floor(
        (products.filter(p => p.category === category).reduce((sum, p) => sum + p.stock, 0) / 
        products.filter(p => p.category === category).length) * 
        (0.8 + Math.sin(i / periods * Math.PI) * 0.2 + Math.random() * 0.1)
      );
    });
    
    data.push(entry);
  }
  
  return data;
}

function generateInventoryTrendData(items: any[], timeRange: TimeRange) {
  const periods = timeRange === "weekly" ? 7 : timeRange === "monthly" ? 30 : 12;
  const data = [];
  
  const totalItems = items.length;
  const lowStockItems = items.filter(item => item.status === "Low Stock").length;
  const outOfStockItems = items.filter(item => item.status === "Out of Stock").length;
  
  for (let i = 0; i < periods; i++) {
    data.push({
      date: timeRange === "weekly" 
        ? ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"][i % 7]
        : timeRange === "monthly" 
          ? `Day ${i + 1}` 
          : ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"][i],
      total: totalItems + Math.floor(Math.sin(i / periods * Math.PI * 2) * (totalItems * 0.1)) + Math.floor(Math.random() * 10),
      lowStock: lowStockItems + Math.floor(Math.cos(i / periods * Math.PI) * (lowStockItems * 0.2)) + Math.floor(Math.random() * 5),
      outOfStock: outOfStockItems + Math.floor(Math.sin(i / periods * Math.PI) * (outOfStockItems * 0.15)) + Math.floor(Math.random() * 3)
    });
  }
  
  return data;
}

function generateCategoryGrowthData(categories: any[], timeRange: TimeRange) {
  const periods = timeRange === "weekly" ? 7 : timeRange === "monthly" ? 30 : 12;
  const data = [];
  
  for (let i = 0; i < periods; i++) {
    const entry: any = {
      date: timeRange === "weekly" 
        ? ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"][i % 7]
        : timeRange === "monthly" 
          ? `Day ${i + 1}` 
          : ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"][i],
    };
    
    categories.slice(0, 5).forEach(category => {
      // Generate some random growth data
      const growth = category.items * (0.9 + (i / periods) * 0.2 + Math.sin(i / (periods / 2) * Math.PI) * 0.05);
      entry[category.name] = Math.floor(growth);
    });
    
    data.push(entry);
  }
  
  return data;
}

function generateSupplierOrdersTrendData(suppliers: any[], timeRange: TimeRange) {
  const periods = timeRange === "weekly" ? 7 : timeRange === "monthly" ? 30 : 12;
  const data = [];
  
  // Sort suppliers by active orders, descending
  const topSuppliers = [...suppliers].sort((a, b) => b.activeOrders - a.activeOrders).slice(0, 5);
  
  for (let i = 0; i < periods; i++) {
    const entry: any = {
      date: timeRange === "weekly" 
        ? ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"][i % 7]
        : timeRange === "monthly" 
          ? `Day ${i + 1}` 
          : ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"][i],
    };
    
    topSuppliers.forEach(supplier => {
      // Generate some random order data
      entry[supplier.name] = Math.max(0, Math.floor(
        supplier.activeOrders * (0.8 + Math.sin(i / periods * Math.PI * 2) * 0.3 + Math.random() * 0.2)
      ));
    });
    
    data.push(entry);
  }
  
  return data;
}

function generateOrdersTrendData(orders: any[], timeRange: TimeRange) {
  const periods = timeRange === "weekly" ? 7 : timeRange === "monthly" ? 30 : 12;
  const data = [];
  
  const avgOrders = orders.length / periods;
  
  for (let i = 0; i < periods; i++) {
    data.push({
      date: timeRange === "weekly" 
        ? ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"][i % 7]
        : timeRange === "monthly" 
          ? `Day ${i + 1}` 
          : ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"][i],
      orders: Math.max(0, Math.floor(avgOrders * (0.7 + Math.sin(i / periods * Math.PI * 2) * 0.4 + Math.random() * 0.2)))
    });
  }
  
  return data;
}

function generateRevenueData(orders: any[], timeRange: TimeRange) {
  const periods = timeRange === "weekly" ? 7 : timeRange === "monthly" ? 30 : 12;
  const data = [];
  
  const avgOrderValue = orders.reduce((sum, order) => sum + order.total, 0) / orders.length;
  const avgOrdersPerPeriod = orders.length / periods;
  
  for (let i = 0; i < periods; i++) {
    // Generate daily/monthly/yearly revenue with some realistic patterns
    const periodRevenue = avgOrderValue * avgOrdersPerPeriod * 
      (0.7 + Math.sin(i / periods * Math.PI * 2) * 0.4 + Math.random() * 0.2);
    
    data.push({
      date: timeRange === "weekly" 
        ? ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"][i % 7]
        : timeRange === "monthly" 
          ? `Day ${i + 1}` 
          : ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"][i],
      revenue: Math.floor(periodRevenue * 100) / 100
    });
  }
  
  return data;
}

function generateWarehouseUtilizationTrendData(warehouses: any[], timeRange: TimeRange) {
  const periods = timeRange === "weekly" ? 7 : timeRange === "monthly" ? 30 : 12;
  const data = [];
  
  for (let i = 0; i < periods; i++) {
    const entry: any = {
      date: timeRange === "weekly" 
        ? ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"][i % 7]
        : timeRange === "monthly" 
          ? `Day ${i + 1}` 
          : ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"][i],
    };
    
    warehouses.slice(0, 5).forEach(warehouse => {
      // Calculate utilization percentage with some variation
      const utilization = (warehouse.capacity.used / warehouse.capacity.total) * 100;
      
      // Add some realistic fluctuation to the trend data
      entry[warehouse.location.city] = Math.min(100, Math.max(0, Math.floor(
        utilization * (0.9 + Math.sin(i / (periods / 2) * Math.PI) * 0.1 + Math.random() * 0.05)
      )));
    });
    
    data.push(entry);
  }
  
  return data;
}
