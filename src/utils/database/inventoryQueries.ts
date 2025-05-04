
/**
 * Inventory Report Queries
 * 
 * This file contains database queries related to inventory reports.
 */

/**
 * Inventory Report - Stock Status Distribution
 * 
 * This cursor analyzes inventory status to generate the pie chart in the Inventory report.
 */
export const inventoryStatusQuery = `
SET SERVEROUTPUT ON;

DECLARE
  -- Cursor for inventory status
  CURSOR inventory_status_cursor IS
    SELECT 
      CASE
        WHEN status = 'In Stock' THEN 'In Stock'
        WHEN status = 'Low Stock' THEN 'Low Stock'
        WHEN status = 'Out of Stock' THEN 'Out of Stock'
      END as status,
      COUNT(*) as count
    FROM inventory
    GROUP BY status
    ORDER BY 
      CASE status
        WHEN 'In Stock' THEN 1
        WHEN 'Low Stock' THEN 2
        WHEN 'Out of Stock' THEN 3
      END;
      
  -- Variables
  v_status inventory.status%TYPE;
  v_count NUMBER;
  v_total_items NUMBER := 0;
  
BEGIN
  -- Get total count of inventory items
  SELECT COUNT(*) INTO v_total_items FROM inventory;
  
  DBMS_OUTPUT.PUT_LINE('Inventory Status Distribution');
  DBMS_OUTPUT.PUT_LINE('----------------------------');
  
  FOR status_rec IN inventory_status_cursor LOOP
    v_status := status_rec.status;
    v_count := status_rec.count;
    
    DBMS_OUTPUT.PUT_LINE(
      v_status || ': ' || 
      v_count || ' items (' || 
      ROUND((v_count / v_total_items) * 100, 2) || '%)'
    );
  END LOOP;
END;
/
`;

/**
 * Inventory Report - Stock Levels by Category
 * 
 * This cursor aggregates inventory quantities by category.
 */
export const inventoryByCategoryQuery = `
SET SERVEROUTPUT ON;

DECLARE
  -- Cursor for stock levels by category
  CURSOR category_stock_cursor IS
    SELECT i.category, SUM(i.quantity) as total_quantity
    FROM inventory i
    GROUP BY i.category
    ORDER BY i.category;
    
  -- Variables
  v_category inventory.category%TYPE;
  v_quantity NUMBER;
  
BEGIN
  DBMS_OUTPUT.PUT_LINE('Stock Levels by Category');
  DBMS_OUTPUT.PUT_LINE('-----------------------');
  
  FOR cat_rec IN category_stock_cursor LOOP
    v_category := cat_rec.category;
    v_quantity := cat_rec.total_quantity;
    
    DBMS_OUTPUT.PUT_LINE(v_category || ': ' || v_quantity || ' units');
  END LOOP;
END;
/
`;

/**
 * Inventory Report - Low Stock Items
 * 
 * This cursor identifies items that are running low on stock.
 */
export const lowStockItemsQuery = `
SET SERVEROUTPUT ON;

DECLARE
  -- Cursor for low stock items
  CURSOR low_stock_cursor IS
    SELECT id, category, quantity, last_updated
    FROM inventory
    WHERE status = 'Low Stock'
    ORDER BY quantity ASC;
    
  -- Variables
  v_id inventory.id%TYPE;
  v_category inventory.category%TYPE;
  v_quantity inventory.quantity%TYPE;
  v_last_updated inventory.last_updated%TYPE;
  
BEGIN
  DBMS_OUTPUT.PUT_LINE('Low Stock Items Report');
  DBMS_OUTPUT.PUT_LINE('--------------------');
  
  FOR item_rec IN low_stock_cursor LOOP
    DBMS_OUTPUT.PUT_LINE(
      'ID: ' || item_rec.id || 
      ', Category: ' || item_rec.category ||
      ', Quantity: ' || item_rec.quantity ||
      ', Last Updated: ' || item_rec.last_updated
    );
  END LOOP;
END;
/
`;
