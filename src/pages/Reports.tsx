
import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ReportNavigationMenu } from "@/components/ReportNavigationMenu";
import { renderBarChart, renderPieChart, ChartData } from "@/utils/chartUtils";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from "@/components/ui/table";

export default function Reports() {
  const [reportCategory, setReportCategory] = useState<string>("financial");
  const [reportType, setReportType] = useState<string>("overview");
  
  // Financial data
  const revenueData = [
    { name: "Jan", value: 24500 },
    { name: "Feb", value: 29300 },
    { name: "Mar", value: 35200 },
    { name: "Apr", value: 30100 },
    { name: "May", value: 42000 },
  ];

  const expensesData = [
    { name: "Jan", value: 18200 },
    { name: "Feb", value: 20500 },
    { name: "Mar", value: 22800 },
    { name: "Apr", value: 21300 },
    { name: "May", value: 25000 },
  ];

  const profitData = revenueData.map((item, index) => ({
    name: item.month || item.name,
    value: item.value - expensesData[index].value
  }));

  // Balance sheet data
  const assetsData: ChartData[] = [
    { name: "Cash", value: 85000 },
    { name: "Accounts Receivable", value: 45000 },
    { name: "Inventory", value: 120000 },
    { name: "Equipment", value: 75000 },
    { name: "Real Estate", value: 250000 }
  ];

  const liabilitiesData: ChartData[] = [
    { name: "Accounts Payable", value: 35000 },
    { name: "Short-term Loans", value: 50000 },
    { name: "Long-term Debt", value: 180000 },
    { name: "Taxes Payable", value: 25000 }
  ];

  // Cash flow data
  const cashFlowData = [
    { name: "Jan", value: 15000 },
    { name: "Feb", value: 18000 },
    { name: "Mar", value: 12000 },
    { name: "Apr", value: 20000 },
    { name: "May", value: 25000 },
  ];

  // Inventory data
  const stockLevelData = [
    { category: "Electronics", inStock: 450, lowStock: 35, outOfStock: 15 },
    { category: "Furniture", inStock: 220, lowStock: 18, outOfStock: 6 },
    { category: "Clothing", inStock: 580, lowStock: 42, outOfStock: 12 },
    { category: "Books", inStock: 340, lowStock: 25, outOfStock: 8 },
    { category: "Sports", inStock: 190, lowStock: 15, outOfStock: 4 },
  ];

  const categoryDistributionData: ChartData[] = [
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
  const customerAcquisitionData: ChartData[] = [
    { name: "Jan", value: 45 },
    { name: "Feb", value: 52 },
    { name: "Mar", value: 48 },
    { name: "Apr", value: 70 },
    { name: "May", value: 65 },
  ];

  const retentionRateData: ChartData[] = [
    { name: "Retained", value: 76 },
    { name: "Churned", value: 24 },
  ];

  const geographicDistributionData: ChartData[] = [
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
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
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
                      {renderBarChart(revenueData, 300)}
                    </div>
                  </TabsContent>
                  <TabsContent value="expenses">
                    <div className="h-80">
                      {renderBarChart(expensesData, 300)}
                    </div>
                  </TabsContent>
                  <TabsContent value="profit">
                    <div className="h-80">
                      {renderBarChart(profitData, 300)}
                    </div>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          </div>
        );
      } else if (reportType === "balance-sheet") {
        return (
          <Card>
            <CardHeader>
              <CardTitle>Balance Sheet</CardTitle>
              <CardDescription>Assets and liabilities overview</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-lg font-medium mb-4">Assets</h3>
                  {renderPieChart(assetsData, 300)}
                  <Table className="mt-4">
                    <TableHeader>
                      <TableRow>
                        <TableHead>Item</TableHead>
                        <TableHead className="text-right">Amount</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {assetsData.map((item) => (
                        <TableRow key={item.name}>
                          <TableCell>{item.name}</TableCell>
                          <TableCell className="text-right">${item.value.toLocaleString()}</TableCell>
                        </TableRow>
                      ))}
                      <TableRow>
                        <TableCell className="font-bold">Total Assets</TableCell>
                        <TableCell className="text-right font-bold">
                          ${assetsData.reduce((acc, item) => acc + item.value, 0).toLocaleString()}
                        </TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </div>
                <div>
                  <h3 className="text-lg font-medium mb-4">Liabilities</h3>
                  {renderPieChart(liabilitiesData, 300)}
                  <Table className="mt-4">
                    <TableHeader>
                      <TableRow>
                        <TableHead>Item</TableHead>
                        <TableHead className="text-right">Amount</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {liabilitiesData.map((item) => (
                        <TableRow key={item.name}>
                          <TableCell>{item.name}</TableCell>
                          <TableCell className="text-right">${item.value.toLocaleString()}</TableCell>
                        </TableRow>
                      ))}
                      <TableRow>
                        <TableCell className="font-bold">Total Liabilities</TableCell>
                        <TableCell className="text-right font-bold">
                          ${liabilitiesData.reduce((acc, item) => acc + item.value, 0).toLocaleString()}
                        </TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </div>
              </div>
              <div className="mt-8 p-4 bg-gray-50 rounded-lg">
                <h3 className="text-lg font-medium mb-2">Equity</h3>
                <p className="text-2xl font-semibold">
                  ${(assetsData.reduce((acc, item) => acc + item.value, 0) - 
                     liabilitiesData.reduce((acc, item) => acc + item.value, 0)).toLocaleString()}
                </p>
              </div>
            </CardContent>
          </Card>
        );
      } else if (reportType === "cash-flow") {
        return (
          <Card>
            <CardHeader>
              <CardTitle>Cash Flow</CardTitle>
              <CardDescription>Cash movement over time</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                {renderBarChart(cashFlowData, 300)}
              </div>
              <Table className="mt-8">
                <TableHeader>
                  <TableRow>
                    <TableHead>Month</TableHead>
                    <TableHead className="text-right">Cash Flow</TableHead>
                    <TableHead className="text-right">Change</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {cashFlowData.map((item, index) => (
                    <TableRow key={item.name}>
                      <TableCell>{item.name}</TableCell>
                      <TableCell className="text-right">${item.value.toLocaleString()}</TableCell>
                      <TableCell className="text-right">
                        {index > 0 ? (
                          <span className={item.value > cashFlowData[index-1].value ? "text-green-600" : "text-red-600"}>
                            {item.value > cashFlowData[index-1].value ? "+" : ""}
                            {(item.value - cashFlowData[index-1].value).toLocaleString()}
                          </span>
                        ) : "—"}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        );
      } else {
        return (
          <Card>
            <CardHeader>
              <CardTitle>Financial Reports</CardTitle>
              <CardDescription>Select a financial report type to view detailed information</CardDescription>
            </CardHeader>
            <CardContent className="flex justify-center items-center h-64">
              <p className="text-muted-foreground">Please select a specific report type from the navigation menu above</p>
            </CardContent>
          </Card>
        );
      }
    }
    
    // Inventory Reports
    else if (reportCategory === "inventory") {
      if (reportType === "stock-levels") {
        const stockLevelChartData = stockLevelData.map(item => ({
          name: item.category,
          value: item.inStock + item.lowStock + item.outOfStock
        }));

        return (
          <Card>
            <CardHeader>
              <CardTitle>Stock Levels</CardTitle>
              <CardDescription>Current inventory stock status by category</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                {renderBarChart(stockLevelChartData, 300)}
              </div>
              
              <div className="mt-8">
                <h3 className="font-medium mb-4">Low Stock Items</h3>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>ID</TableHead>
                      <TableHead>Product Name</TableHead>
                      <TableHead>Category</TableHead>
                      <TableHead>Quantity</TableHead>
                      <TableHead>Threshold</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {lowStockItems.map((item) => (
                      <TableRow key={item.id}>
                        <TableCell>{item.id}</TableCell>
                        <TableCell>{item.name}</TableCell>
                        <TableCell>{item.category}</TableCell>
                        <TableCell>{item.quantity}</TableCell>
                        <TableCell>{item.threshold}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
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
                {renderPieChart(categoryDistributionData, 300)}
              </div>
              <Table className="mt-8">
                <TableHeader>
                  <TableRow>
                    <TableHead>Category</TableHead>
                    <TableHead className="text-right">Items</TableHead>
                    <TableHead className="text-right">Percentage</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {categoryDistributionData.map((item) => {
                    const total = categoryDistributionData.reduce((acc, cat) => acc + cat.value, 0);
                    const percentage = ((item.value / total) * 100).toFixed(1);
                    
                    return (
                      <TableRow key={item.name}>
                        <TableCell>{item.name}</TableCell>
                        <TableCell className="text-right">{item.value}</TableCell>
                        <TableCell className="text-right">{percentage}%</TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        );
      } else {
        return (
          <Card>
            <CardHeader>
              <CardTitle>Inventory Reports</CardTitle>
              <CardDescription>Select an inventory report type to view detailed information</CardDescription>
            </CardHeader>
            <CardContent className="flex justify-center items-center h-64">
              <p className="text-muted-foreground">Please select a specific report type from the navigation menu above</p>
            </CardContent>
          </Card>
        );
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
                {renderBarChart(customerAcquisitionData, 300)}
              </div>
              <Table className="mt-8">
                <TableHeader>
                  <TableRow>
                    <TableHead>Month</TableHead>
                    <TableHead className="text-right">New Customers</TableHead>
                    <TableHead className="text-right">Growth</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {customerAcquisitionData.map((item, index) => (
                    <TableRow key={item.name}>
                      <TableCell>{item.name}</TableCell>
                      <TableCell className="text-right">{item.value}</TableCell>
                      <TableCell className="text-right">
                        {index > 0 ? (
                          <span className={item.value > customerAcquisitionData[index-1].value ? "text-green-600" : "text-red-600"}>
                            {((item.value - customerAcquisitionData[index-1].value) / customerAcquisitionData[index-1].value * 100).toFixed(1)}%
                          </span>
                        ) : "—"}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
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
                {renderPieChart(geographicDistributionData, 300)}
              </div>
              <Table className="mt-8">
                <TableHeader>
                  <TableRow>
                    <TableHead>State</TableHead>
                    <TableHead className="text-right">Customers (%)</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {geographicDistributionData.map((item) => (
                    <TableRow key={item.name}>
                      <TableCell>{item.name}</TableCell>
                      <TableCell className="text-right">{item.value}%</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
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
                {renderPieChart(retentionRateData, 300)}
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
                <div className="bg-green-50 p-6 rounded-lg">
                  <h3 className="text-lg font-medium mb-2 text-green-800">Retained Customers</h3>
                  <p className="text-3xl font-bold text-green-700">{retentionRateData[0].value}%</p>
                  <p className="mt-2 text-sm text-green-600">
                    A retention rate of {retentionRateData[0].value}% indicates strong customer loyalty
                  </p>
                </div>
                <div className="bg-red-50 p-6 rounded-lg">
                  <h3 className="text-lg font-medium mb-2 text-red-800">Customer Churn</h3>
                  <p className="text-3xl font-bold text-red-700">{retentionRateData[1].value}%</p>
                  <p className="mt-2 text-sm text-red-600">
                    Working to reduce the {retentionRateData[1].value}% churn rate could significantly impact revenue
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        );
      } else {
        return (
          <Card>
            <CardHeader>
              <CardTitle>Customer Reports</CardTitle>
              <CardDescription>Select a customer report type to view detailed information</CardDescription>
            </CardHeader>
            <CardContent className="flex justify-center items-center h-64">
              <p className="text-muted-foreground">Please select a specific report type from the navigation menu above</p>
            </CardContent>
          </Card>
        );
      }
    }
    
    // Default
    else {
      return (
        <Card>
          <CardHeader>
            <CardTitle>Reports Dashboard</CardTitle>
            <CardDescription>Select a report category and type from the navigation menu above</CardDescription>
          </CardHeader>
          <CardContent className="flex justify-center items-center h-64">
            <p className="text-muted-foreground">Please select a report category and type to view detailed information</p>
          </CardContent>
        </Card>
      );
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
