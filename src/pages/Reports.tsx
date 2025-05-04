
import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { ReportNavigationMenu } from "@/components/ReportNavigationMenu";
import { BarChart3, Download, FileText, PieChart, Printer, LineChart } from "lucide-react";
import { renderBarChart, renderPieChart, ChartData } from "@/utils/chartUtils";
import { useToast } from "@/hooks/use-toast";

// Sample data for charts
const financialData: ChartData[] = [
  { name: "Jan", value: 65000 },
  { name: "Feb", value: 58000 },
  { name: "Mar", value: 72000 },
  { name: "Apr", value: 84000 },
  { name: "May", value: 78000 },
  { name: "Jun", value: 92000 },
];

const categoryDistributionData: ChartData[] = [
  { name: "Electronics", value: 140, fill: "#0088FE" },
  { name: "Furniture", value: 95, fill: "#00C49F" },
  { name: "Clothing", value: 100, fill: "#FFBB28" },
  { name: "Books", value: 75, fill: "#FF8042" },
  { name: "Kitchen", value: 85, fill: "#8884d8" },
  { name: "Sports", value: 60, fill: "#9b87f5" },
];

const customerAcquisitionData: ChartData[] = [
  { name: "Jan", value: 25 },
  { name: "Feb", value: 18 },
  { name: "Mar", value: 30 },
  { name: "Apr", value: 22 },
  { name: "May", value: 38 },
  { name: "Jun", value: 42 },
];

const retentionRateData: ChartData[] = [
  { name: "New", value: 246 },
  { name: "Returning", value: 825 },
  { name: "Churned", value: 142 },
];

const Reports = () => {
  const [activeReportCategory, setActiveReportCategory] = useState<string>("financial");
  const [activeReportType, setActiveReportType] = useState<string>("overview");
  const { toast } = useToast();
  
  const handleReportSelect = (category: string, type: string) => {
    setActiveReportCategory(category);
    setActiveReportType(type);
  };
  
  const handlePrintReport = () => {
    toast({
      title: "Printing report",
      description: "Sending current report to printer..."
    });
    window.print();
  };

  const handleDownloadReport = () => {
    // Create a simple text version of the report data
    let reportContent = `${activeReportCategory.toUpperCase()} REPORT - ${activeReportType.toUpperCase()}\n\n`;
    
    let data: ChartData[] = [];
    if (activeReportCategory === "financial") {
      data = financialData;
      reportContent += "FINANCIAL DATA:\n";
    } else if (activeReportCategory === "inventory") {
      data = categoryDistributionData;
      reportContent += "INVENTORY DATA:\n";
    } else if (activeReportCategory === "customer") {
      data = activeReportType === "customer-acquisition" ? customerAcquisitionData : retentionRateData;
      reportContent += "CUSTOMER DATA:\n";
    }
    
    data.forEach(item => {
      reportContent += `${item.name}: ${item.value}\n`;
    });
    
    // Create a Blob with the content
    const blob = new Blob([reportContent], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    
    // Create a download link and trigger the download
    const a = document.createElement('a');
    a.href = url;
    a.download = `${activeReportCategory}-${activeReportType}-report.txt`;
    document.body.appendChild(a);
    a.click();
    
    // Clean up
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    
    toast({
      title: "Download successful",
      description: `${activeReportCategory}-${activeReportType}-report.txt has been downloaded`
    });
  };
  
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Reports</h1>
          <p className="text-muted-foreground">View and generate various reports for your business.</p>
        </div>
        <div className="flex space-x-2">
          <Button variant="outline" size="sm" onClick={handlePrintReport}>
            <Printer className="mr-2 h-4 w-4" />
            Print Report
          </Button>
          <Button variant="outline" size="sm" onClick={handleDownloadReport}>
            <Download className="mr-2 h-4 w-4" />
            Download
          </Button>
        </div>
      </div>
      
      <ReportNavigationMenu onReportSelect={handleReportSelect} />
      
      <Card>
        <CardHeader>
          <CardTitle>
            {activeReportCategory === "financial" && "Financial Report"}
            {activeReportCategory === "inventory" && "Inventory Report"}
            {activeReportCategory === "customer" && "Customer Report"}
            {" - "}
            {activeReportType === "overview" && "Overview"}
            {activeReportType === "income-statement" && "Income Statement"}
            {activeReportType === "balance-sheet" && "Balance Sheet"}
            {activeReportType === "cash-flow" && "Cash Flow"}
            {activeReportType === "sales-analysis" && "Sales Analysis"}
            {activeReportType === "stock-levels" && "Stock Levels"}
            {activeReportType === "category-distribution" && "Category Distribution"}
            {activeReportType === "low-stock-items" && "Low Stock Items"}
            {activeReportType === "inventory-value" && "Inventory Value"}
            {activeReportType === "customer-acquisition" && "Customer Acquisition"}
            {activeReportType === "retention-rate" && "Retention Rate"}
            {activeReportType === "lifetime-value" && "Lifetime Value"}
            {activeReportType === "geographic-distribution" && "Geographic Distribution"}
          </CardTitle>
          <CardDescription>
            {activeReportCategory === "financial" && "Financial performance metrics and analysis."}
            {activeReportCategory === "inventory" && "Inventory status and distribution analysis."}
            {activeReportCategory === "customer" && "Customer behavior and demographics analysis."}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-8">
          {/* Content will change based on selected report */}
          {activeReportCategory === "financial" && (
            <div>
              {activeReportType === "overview" && (
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <Card>
                      <CardHeader className="pb-2">
                        <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="text-2xl font-bold">$845,238</div>
                        <p className="text-xs text-muted-foreground">+20.1% from last month</p>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardHeader className="pb-2">
                        <CardTitle className="text-sm font-medium">Expenses</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="text-2xl font-bold">$425,680</div>
                        <p className="text-xs text-muted-foreground">+12.3% from last month</p>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardHeader className="pb-2">
                        <CardTitle className="text-sm font-medium">Net Profit</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="text-2xl font-bold">$419,558</div>
                        <p className="text-xs text-muted-foreground">+28.4% from last month</p>
                      </CardContent>
                    </Card>
                  </div>
                  <div className="h-[300px] border rounded-md p-4">
                    <div className="flex items-center mb-4">
                      <BarChart3 className="h-5 w-5 mr-2" />
                      <h3 className="font-medium">Revenue Trends (Last 12 Months)</h3>
                    </div>
                    <div className="h-[220px]">
                      {renderBarChart(financialData)}
                    </div>
                  </div>
                </div>
              )}
              
              {activeReportType === "income-statement" && (
                <div className="space-y-4">
                  <div className="border rounded-md p-4">
                    <div className="flex items-center mb-4">
                      <FileText className="h-5 w-5 mr-2" />
                      <h3 className="font-medium">Income Statement Summary</h3>
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between pb-2 border-b">
                        <span className="font-medium">Revenue</span>
                        <span className="font-medium">$845,238</span>
                      </div>
                      <div className="flex justify-between pb-2">
                        <span>Product Sales</span>
                        <span>$712,540</span>
                      </div>
                      <div className="flex justify-between pb-2">
                        <span>Service Revenue</span>
                        <span>$132,698</span>
                      </div>
                      <div className="flex justify-between pb-2 border-b">
                        <span className="font-medium">Total Expenses</span>
                        <span className="font-medium">$425,680</span>
                      </div>
                      <div className="flex justify-between pb-2">
                        <span>Cost of Goods Sold</span>
                        <span>$285,450</span>
                      </div>
                      <div className="flex justify-between pb-2">
                        <span>Operating Expenses</span>
                        <span>$98,230</span>
                      </div>
                      <div className="flex justify-between pb-2">
                        <span>Taxes</span>
                        <span>$42,000</span>
                      </div>
                      <div className="flex justify-between pt-2 border-t">
                        <span className="font-bold">Net Profit</span>
                        <span className="font-bold">$419,558</span>
                      </div>
                    </div>
                  </div>
                </div>
              )}
              
              {activeReportType === "balance-sheet" && (
                <div className="space-y-4">
                  <div className="border rounded-md p-4">
                    <div className="flex items-center mb-4">
                      <FileText className="h-5 w-5 mr-2" />
                      <h3 className="font-medium">Balance Sheet Summary</h3>
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between pb-2 border-b">
                        <span className="font-medium">Total Assets</span>
                        <span className="font-medium">$2,450,000</span>
                      </div>
                      <div className="flex justify-between pb-2">
                        <span>Current Assets</span>
                        <span>$950,000</span>
                      </div>
                      <div className="flex justify-between pb-2">
                        <span>Non-Current Assets</span>
                        <span>$1,500,000</span>
                      </div>
                      <div className="flex justify-between pb-2 border-b">
                        <span className="font-medium">Total Liabilities</span>
                        <span className="font-medium">$1,250,000</span>
                      </div>
                      <div className="flex justify-between pb-2">
                        <span>Current Liabilities</span>
                        <span>$450,000</span>
                      </div>
                      <div className="flex justify-between pb-2">
                        <span>Non-Current Liabilities</span>
                        <span>$800,000</span>
                      </div>
                      <div className="flex justify-between pt-2 border-t">
                        <span className="font-bold">Equity</span>
                        <span className="font-bold">$1,200,000</span>
                      </div>
                    </div>
                  </div>
                </div>
              )}
              
              {/* Additional financial report types can be added here */}
            </div>
          )}
          
          {activeReportCategory === "inventory" && (
            <div>
              {activeReportType === "stock-levels" && (
                <div className="space-y-4">
                  <div className="h-[300px] border rounded-md p-4">
                    <div className="flex items-center mb-4">
                      <BarChart3 className="h-5 w-5 mr-2" />
                      <h3 className="font-medium">Current Stock Levels by Category</h3>
                    </div>
                    <div className="h-[220px]">
                      {renderBarChart(categoryDistributionData)}
                    </div>
                  </div>
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-md">Inventory Summary</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div>
                          <p className="text-sm font-medium">Total Items</p>
                          <p className="text-2xl font-bold">1,458</p>
                        </div>
                        <div>
                          <p className="text-sm font-medium">Total Value</p>
                          <p className="text-2xl font-bold">$287,450</p>
                        </div>
                        <div>
                          <p className="text-sm font-medium">Low Stock Items</p>
                          <p className="text-2xl font-bold text-amber-500">24</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              )}
              
              {activeReportType === "category-distribution" && (
                <div className="space-y-4">
                  <div className="h-[300px] border rounded-md p-4">
                    <div className="flex items-center mb-4">
                      <PieChart className="h-5 w-5 mr-2" />
                      <h3 className="font-medium">Inventory Distribution by Category</h3>
                    </div>
                    <div className="h-[220px]">
                      {renderPieChart(categoryDistributionData)}
                    </div>
                  </div>
                </div>
              )}
              
              {/* Additional inventory report types can be added here */}
            </div>
          )}
          
          {activeReportCategory === "customer" && (
            <div>
              {activeReportType === "customer-acquisition" && (
                <div className="space-y-4">
                  <div className="h-[300px] border rounded-md p-4">
                    <div className="flex items-center mb-4">
                      <LineChart className="h-5 w-5 mr-2" />
                      <h3 className="font-medium">Customer Acquisition Trends</h3>
                    </div>
                    <div className="h-[220px]">
                      {renderBarChart(customerAcquisitionData)}
                    </div>
                  </div>
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-md">Acquisition Summary</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div>
                          <p className="text-sm font-medium">New Customers (MTD)</p>
                          <p className="text-2xl font-bold">246</p>
                        </div>
                        <div>
                          <p className="text-sm font-medium">Acquisition Cost</p>
                          <p className="text-2xl font-bold">$42.87</p>
                        </div>
                        <div>
                          <p className="text-sm font-medium">Conversion Rate</p>
                          <p className="text-2xl font-bold">3.2%</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              )}
              
              {activeReportType === "retention-rate" && (
                <div className="space-y-4">
                  <div className="h-[300px] border rounded-md p-4">
                    <div className="flex items-center mb-4">
                      <PieChart className="h-5 w-5 mr-2" />
                      <h3 className="font-medium">Customer Retention Analysis</h3>
                    </div>
                    <div className="h-[220px]">
                      {renderPieChart(retentionRateData)}
                    </div>
                  </div>
                </div>
              )}
              
              {/* Additional customer report types can be added here */}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default Reports;
