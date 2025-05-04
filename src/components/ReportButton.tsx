
import React, { useState } from "react";
import { BarChart3 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

type ReportButtonProps = {
  title: string;
  type: "products" | "inventory" | "categories" | "suppliers" | "orders" | "warehouses" | "customers";
  data: any[];
};

export function ReportButton({ title, type, data }: ReportButtonProps) {
  const { toast } = useToast();

  const handleReportClick = () => {
    toast({
      title: "Reports Feature Removed",
      description: "The reports feature has been temporarily disabled.",
      variant: "default"
    });
  };

  return (
    <Button
      variant="outline"
      className="flex items-center gap-2 border-purple-300 bg-purple-50 text-purple-700 hover:bg-purple-100"
      onClick={handleReportClick}
    >
      <BarChart3 size={18} />
      <span>Reports</span>
    </Button>
  );
}
