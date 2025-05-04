
/**
 * Dashboard Report Queries
 * 
 * This file contains database queries related to dashboard reports.
 */

/**
 * Dashboard - Recent Orders
 * 
 * This cursor fetches recent orders for the dashboard.
 */
export const recentOrdersQuery = `
SET SERVEROUTPUT ON;

DECLARE
  -- Cursor for recent orders
  CURSOR recent_orders_cursor IS
    SELECT o.id, c.name as customer, o.date, o.amount, o.status
    FROM orders o
    JOIN customers c ON o.customer_id = c.id
    ORDER BY o.date DESC
    FETCH FIRST 5 ROWS ONLY;
      
  -- Variables
  v_id orders.id%TYPE;
  v_customer customers.name%TYPE;
  v_date orders.date%TYPE;
  v_amount orders.amount%TYPE;
  v_status orders.status%TYPE;
  
BEGIN
  DBMS_OUTPUT.PUT_LINE('Recent Orders Report');
  DBMS_OUTPUT.PUT_LINE('-------------------');
  
  FOR order_rec IN recent_orders_cursor LOOP
    DBMS_OUTPUT.PUT_LINE(
      'Order ID: ' || order_rec.id || 
      ', Customer: ' || order_rec.customer ||
      ', Date: ' || order_rec.date ||
      ', Amount: $' || TO_CHAR(order_rec.amount, '999,999.99') ||
      ', Status: ' || order_rec.status
    );
  END LOOP;
END;
/
`;

/**
 * Dashboard - Low Stock Items
 * 
 * This cursor identifies items that are running low on stock for the dashboard.
 */
export const dashboardLowStockQuery = `
SET SERVEROUTPUT ON;

DECLARE
  -- Cursor for low stock items
  CURSOR dashboard_low_stock_cursor IS
    SELECT p.name as product, p.category, i.current, i.min
    FROM products p
    JOIN inventory i ON p.id = i.product_id
    WHERE i.current < i.min
    ORDER BY (i.current / i.min) ASC;
      
  -- Variables
  v_product products.name%TYPE;
  v_category products.category%TYPE;
  v_current inventory.current%TYPE;
  v_min inventory.min%TYPE;
  
BEGIN
  DBMS_OUTPUT.PUT_LINE('Low Stock Alert');
  DBMS_OUTPUT.PUT_LINE('--------------');
  
  FOR item_rec IN dashboard_low_stock_cursor LOOP
    DBMS_OUTPUT.PUT_LINE(
      'Product: ' || item_rec.product || 
      ', Category: ' || item_rec.category ||
      ', Current Stock: ' || item_rec.current ||
      ', Minimum Required: ' || item_rec.min
    );
  END LOOP;
END;
/
`;
