
// Database Queries - Main export file
// Re-export all query modules for backwards compatibility

import * as productQueries from './productQueries';
import * as inventoryQueries from './inventoryQueries';
import * as categoryQueries from './categoryQueries';
import * as orderQueries from './orderQueries';
import * as customerQueries from './customerQueries';
import * as warehouseQueries from './warehouseQueries';
import * as employeeQueries from './employeeQueries';
import * as dashboardQueries from './dashboardQueries';
import * as triggers from './triggers';

// Re-export everything to maintain the same exports as the original file
export const {
  productsByCategoryQuery,
  productsByPriceRangeQuery,
  topProductsByStockQuery,
  productsByCategoryDetailQuery
} = productQueries;

export const {
  inventoryStatusQuery,
  inventoryByCategoryQuery,
  lowStockItemsQuery
} = inventoryQueries;

export const {
  itemsPerCategoryQuery
} = categoryQueries;

export const {
  orderStatusDistributionQuery,
  orderValueDistributionQuery
} = orderQueries;

export const {
  warehouseCapacityQuery
} = warehouseQueries;

export const {
  customersByStateQuery,
  customerOrderHistoryQuery
} = customerQueries;

export const {
  employeeDetailsQuery
} = employeeQueries;

export const {
  recentOrdersQuery,
  dashboardLowStockQuery
} = dashboardQueries;

export const {
  lowStockAlertTrigger,
  orderStatusTrigger,
  warehouseCapacityTrigger,
  productPriceHistoryTrigger
} = triggers;

// Re-export remaining items
export { implementationNotes } from './implementationNotes';
export { databaseTableStructures } from './databaseStructures';
export { scheduledReportJob, dailySalesSummaryProcedure } from './scheduledJobs';
