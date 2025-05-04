
/**
 * Order Report Queries
 * 
 * This file contains database queries related to order reports.
 */

/**
 * Orders Report - Order Status Distribution
 * 
 * This cursor analyzes order statuses to generate the pie chart in the Orders report.
 */
export const orderStatusDistributionQuery = `
SET SERVEROUTPUT ON;

DECLARE
  -- Cursor for order status
  CURSOR order_status_cursor IS
    SELECT 
      status,
      COUNT(*) as count
    FROM orders
    GROUP BY status
    ORDER BY 
      CASE status
        WHEN 'Completed' THEN 1
        WHEN 'Processing' THEN 2
        WHEN 'Pending' THEN 3
      END;
      
  -- Variables
  v_status orders.status%TYPE;
  v_count NUMBER;
  v_total_orders NUMBER := 0;
  
BEGIN
  -- Get total count of orders
  SELECT COUNT(*) INTO v_total_orders FROM orders;
  
  DBMS_OUTPUT.PUT_LINE('Order Status Distribution');
  DBMS_OUTPUT.PUT_LINE('------------------------');
  
  FOR status_rec IN order_status_cursor LOOP
    v_status := status_rec.status;
    v_count := status_rec.count;
    
    DBMS_OUTPUT.PUT_LINE(
      v_status || ': ' || 
      v_count || ' orders (' || 
      ROUND((v_count / v_total_orders) * 100, 2) || '%)'
    );
  END LOOP;
END;
/
`;

/**
 * Orders Report - Order Value Distribution
 * 
 * This cursor analyzes order values to generate the bar chart in the Orders report.
 */
export const orderValueDistributionQuery = `
SET SERVEROUTPUT ON;

DECLARE
  -- Cursor for order values
  CURSOR order_value_cursor IS
    SELECT 
      CASE
        WHEN total < 100 THEN '$0-$100'
        WHEN total BETWEEN 100 AND 499.99 THEN '$100-$500'
        WHEN total BETWEEN 500 AND 999.99 THEN '$500-$1000'
        ELSE '$1000+'
      END as value_range,
      COUNT(*) as count
    FROM orders
    GROUP BY 
      CASE
        WHEN total < 100 THEN '$0-$100'
        WHEN total BETWEEN 100 AND 499.99 THEN '$100-$500'
        WHEN total BETWEEN 500 AND 999.99 THEN '$500-$1000'
        ELSE '$1000+'
      END
    ORDER BY 
      CASE value_range
        WHEN '$0-$100' THEN 1
        WHEN '$100-$500' THEN 2
        WHEN '$500-$1000' THEN 3
        ELSE 4
      END;
      
  -- Variables
  v_range VARCHAR2(20);
  v_count NUMBER;
  
BEGIN
  DBMS_OUTPUT.PUT_LINE('Order Value Distribution');
  DBMS_OUTPUT.PUT_LINE('------------------------');
  
  FOR range_rec IN order_value_cursor LOOP
    v_range := range_rec.value_range;
    v_count := range_rec.count;
    
    DBMS_OUTPUT.PUT_LINE(v_range || ': ' || v_count || ' orders');
  END LOOP;
END;
/
`;
