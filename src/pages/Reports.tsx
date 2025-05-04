
import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ReportNavigationMenu } from "@/components/ReportNavigationMenu";
import {
  BarChart, Bar, LineChart, Line, PieChart, Pie,
  XAxis, YAxis, CartesianGrid, Tooltip, Legend, 
  ResponsiveContainer, Cell
} from "recharts";

export default function Reports() {
  const [reportCategory, setReportCategory] = useState<string>("financial");
  const [reportType, setReportType] = useState<string>("overview");
  
  // Financial data
  const revenueData = [
    { month: "Jan", value: 24500 },
    { month: "Feb", value: 29300 },
    { month: "Mar", value: 35200 },
    { month: "Apr", value: 30100 },
    { month: "May", value: 42000 },
  ];

  const expensesData = [
    { month: "Jan", value: 18200 },
    { month: "Feb", value: 20500 },
    { month: "Mar", value: 22800 },
    { month: "Apr", value: 21300 },
    { month: "May", value: 25000 },
  ];

  const profitData = revenueData.map((item, index) => ({
    month: item.month,
    value: item.value - expensesData[index].value
  }));

  // Inventory data
  const stockLevelData = [
    { category: "Electronics", inStock: 450, lowStock: 35, outOfStock: 15 },
    { category: "Furniture", inStock: 220, lowStock: 18, outOfStock: 6 },
    { category: "Clothing", inStock: 580, lowStock: 42, outOfStock: 12 },
    { category: "Books", inStock: 340, lowStock: 25, outOfStock: 8 },
    { category: "Sports", inStock: 190, lowStock: 15, outOfStock: 4 },
  ];

  const categoryDistributionData = [
    { name: "Electronics", value: 500 },
    { name: "Furniture", value: 244 },
    { name: "Clothing", value: 634 },
    { name: "Books", value: 373 },
    { name: "Sports", value: 209 },
  ];

  const lowStockItems = [
    { id: "P-001", name: "Wireless Headphones", category: "Electronics", quantity: 8, threshold: 10 },
    { id: "P-015", name: "Office Chair", category: "Furniture", quantity: 5, threshold: 10 },
    { id: "P-032", name: "Cotton T-shirt", category: "Clothing", quantity: 7, threshold: 15 },
    { id: "P-048", name: "Bestseller Novel", category: "Books", quantity: 3, threshold: 5 },
    { id: "P-056", name: "Basketball", category: "Sports", quantity: 4, threshold: 8 },
  ];

  // Customer data
  const customerAcquisitionData = [
    { month: "Jan", value: 45 },
    { month: "Feb", value: 52 },
    { month: "Mar", value: 48 },
    { month: "Apr", value: 70 },
    { month: "May", value: 65 },
  ];

  const retentionRateData = [
    { name: "Retained", value: 76 },
    { name: "Churned", value: 24 },
  ];

  const geographicDistributionData = [
    { name: "California", value: 28 },
    { name: "Texas", value: 17 },
    { name: "New York", value: 15 },
    { name: "Florida", value: 12 },
    { name: "Illinois", value: 8 },
    { name: "Other", value: 20 },
  ];

  const COLORS = ["#8B5CF6", "#D946EF", "#F97316", "#0EA5E9", "#10B981", "#F59E0B"];

  const handleReportSelect = (category: string, type: string) => {
    setReportCategory(category);
    setReportType(type);
  };

  const renderReport = () => {
    // Financial Reports
    if (reportCategory === "financial") {
      if (reportType === "overview") {
        return (
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Financial Overview</CardTitle>
                <CardDescription>Summary of key financial metrics</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-3 gap-4 mb-6">
                  <div className="bg-purple-50 p-4 rounded-lg">
                    <p className="text-sm text-gray-500">Total Revenue</p>
                    <p className="text-2xl font-semibold">${revenueData.reduce((acc, item) => acc + item.value, 0).toLocaleString()}</p>
                    <p className="text-xs text-green-600 mt-1">+12.5% from last quarter</p>
                  </div>
                  <div className="bg-blue-50 p-4 rounded-lg">
                    <p className="text-sm text-gray-500">Total Expenses</p>
                    <p className="text-2xl font-semibold">${expensesData.reduce((acc, item) => acc + item.value, 0).toLocaleString()}</p>
                    <p className="text-xs text-blue-600 mt-1">+7.2% from last quarter</p>
                  </div>
                  <div className="bg-green-50 p-4 rounded-lg">
                    <p className="text-sm text-gray-500">Net Profit</p>
                    <p className="text-2xl font-semibold">${profitData.reduce((acc, item) => acc + item.value, 0).toLocaleString()}</p>
                    <p className="text-xs text-green-600 mt-1">+18.3% from last quarter</p>
                  </div>
                </div>
                
                <Tabs defaultValue="revenue">
                  <TabsList className="mb-4">
                    <TabsTrigger value="revenue">Revenue</TabsTrigger>
                    <TabsTrigger value="expenses">Expenses</TabsTrigger>
                    <TabsTrigger value="profit">Profit</TabsTrigger>
                  </TabsList>
                  <TabsContent value="revenue">
                    <div className="h-80">
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={revenueData}>
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="month" />
                          <YAxis />
                          <Tooltip formatter={(value) => [`$${value}`, 'Revenue']} />
                          <Bar dataKey="value" fill="#8B5CF6" name="Revenue" />
                        </BarChart>
                      </ResponsiveContainer>
                    </div>
                  </TabsContent>
                  <TabsContent value="expenses">
                    <div className="h-80">
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={expensesData}>
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="month" />
                          <YAxis />
                          <Tooltip formatter={(value) => [`$${value}`, 'Expenses']} />
                          <Bar dataKey="value" fill="#0EA5E9" name="Expenses" />
                        </BarChart>
                      </ResponsiveContainer>
                    </div>
                  </TabsContent>
                  <TabsContent value="profit">
                    <div className="h-80">
                      <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={profitData}>
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="month" />
                          <YAxis />
                          <Tooltip formatter={(value) => [`$${value}`, 'Profit']} />
                          <Line type="monotone" dataKey="value" stroke="#10B981" name="Profit" />
                        </LineChart>
                      </ResponsiveContainer>
                    </div>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          </div>
        );
      } else if (reportType === "income-statement") {
        return (
          <Card>
            <CardHeader>
              <CardTitle>Income Statement</CardTitle>
              <CardDescription>Revenue and expenses for the current period</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-80 mb-6">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={revenueData} margin={{ top: 20 }}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="value" name="Revenue" fill="#8B5CF6" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        );
      } else {
        return <p>Select a financial report type to view</p>;
      }
    }
    
    // Inventory Reports
    else if (reportCategory === "inventory") {
      if (reportType === "stock-levels") {
        return (
          <Card>
            <CardHeader>
              <CardTitle>Stock Levels</CardTitle>
              <CardDescription>Current inventory stock status by category</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={stockLevelData} margin={{ top: 20 }}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="category" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="inStock" name="In Stock" stackId="a" fill="#10B981" />
                    <Bar dataKey="lowStock" name="Low Stock" stackId="a" fill="#F59E0B" />
                    <Bar dataKey="outOfStock" name="Out of Stock" stackId="a" fill="#EF4444" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
              
              <div className="mt-8">
                <h3 className="font-medium mb-4">Low Stock Items</h3>
                <table className="min-w-full border border-gray-200 rounded-md">
                  <thead>
                    <tr className="bg-gray-50">
                      <th className="px-4 py-2 text-left">ID</th>
                      <th className="px-4 py-2 text-left">Product Name</th>
                      <th className="px-4 py-2 text-left">Category</th>
                      <th className="px-4 py-2 text-left">Quantity</th>
                      <th className="px-4 py-2 text-left">Threshold</th>
                    </tr>
                  </thead>
                  <tbody>
                    {lowStockItems.map((item, index) => (
                      <tr key={index} className={index % 2 === 0 ? "bg-white" : "bg-gray-50"}>
                        <td className="px-4 py-2">{item.id}</td>
                        <td className="px-4 py-2">{item.name}</td>
                        <td className="px-4 py-2">{item.category}</td>
                        <td className="px-4 py-2">{item.quantity}</td>
                        <td className="px-4 py-2">{item.threshold}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        );
      } else if (reportType === "category-distribution") {
        return (
          <Card>
            <CardHeader>
              <CardTitle>Category Distribution</CardTitle>
              <CardDescription>Inventory distribution across product categories</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={categoryDistributionData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      outerRadius={150}
                      fill="#8884d8"
                      dataKey="value"
                      nameKey="name"
                      label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                    >
                      {categoryDistributionData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip formatter={(value) => [value, 'Items']} />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        );
      } else {
        return <p>Select an inventory report type to view</p>;
      }
    }
    
    // Customer Reports
    else if (reportCategory === "customer") {
      if (reportType === "customer-acquisition") {
        return (
          <Card>
            <CardHeader>
              <CardTitle>Customer Acquisition</CardTitle>
              <CardDescription>New customers acquired over time</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={customerAcquisitionData} margin={{ top: 20 }}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="value" name="New Customers" stroke="#8B5CF6" />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        );
      } else if (reportType === "geographic-distribution") {
        return (
          <Card>
            <CardHeader>
              <CardTitle>Geographic Distribution</CardTitle>
              <CardDescription>Customer distribution by state</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={geographicDistributionData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      outerRadius={150}
                      fill="#8884d8"
                      dataKey="value"
                      nameKey="name"
                      label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                    >
                      {geographicDistributionData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip formatter={(value) => [`${value}%`, 'Percentage']} />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        );
      } else if (reportType === "retention-rate") {
        return (
          <Card>
            <CardHeader>
              <CardTitle>Customer Retention</CardTitle>
              <CardDescription>Customer retention vs churn rate</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={retentionRateData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      outerRadius={150}
                      fill="#8884d8"
                      dataKey="value"
                      nameKey="name"
                      label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                    >
                      <Cell fill="#10B981" /> {/* Retained */}
                      <Cell fill="#EF4444" /> {/* Churned */}
                    </Pie>
                    <Tooltip formatter={(value) => [`${value}%`, 'Percentage']} />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        );
      } else {
        return <p>Select a customer report type to view</p>;
      }
    }
    
    // Default
    else {
      return <p>Select a report category to view</p>;
    }
  };

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-semibold mb-1">Reports</h1>
        <p className="text-gray-600 text-sm">View and analyze business data</p>
      </div>
      
      <ReportNavigationMenu onReportSelect={handleReportSelect} />
      
      {renderReport()}
    </div>
  );
}
