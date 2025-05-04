
/**
 * Customer Report Queries
 * 
 * This file contains database queries related to customer reports.
 */

/**
 * Customers Report - Customers by State
 * 
 * This cursor counts customers by state to generate the bar chart in the Customers report.
 */
export const customersByStateQuery = `
SET SERVEROUTPUT ON;

DECLARE
  -- Cursor for customers by state
  CURSOR customers_by_state_cursor IS
    SELECT state, COUNT(*) as count
    FROM customers
    GROUP BY state
    ORDER BY count DESC;
      
  -- Variables
  v_state customers.state%TYPE;
  v_count NUMBER;
  
BEGIN
  DBMS_OUTPUT.PUT_LINE('Customers by State');
  DBMS_OUTPUT.PUT_LINE('-----------------');
  
  FOR state_rec IN customers_by_state_cursor LOOP
    v_state := state_rec.state;
    v_count := state_rec.count;
    
    DBMS_OUTPUT.PUT_LINE(v_state || ': ' || v_count || ' customers');
  END LOOP;
END;
/
`;

/**
 * Customer Orders - Detailed Order History
 * 
 * This cursor fetches detailed order history for a customer.
 * Similar to the example provided in the user's request.
 */
export const customerOrderHistoryQuery = `
SET SERVEROUTPUT ON;

DECLARE
    -- Cursor to fetch recent orders by customers
    CURSOR cust_order_cursor IS
        SELECT DISTINCT c.id as CUSTOMER_ID, c.name as CUSTOMER_NAME
        FROM customers c
        JOIN orders o ON c.id = o.customer_id
        WHERE o.date >= SYSDATE - 60;

    -- Variables for cursor
    v_customer_id customers.id%TYPE;
    v_customer_name customers.name%TYPE;

    -- Nested cursor for top products per customer
    CURSOR top_products_cursor(p_cust_id customers.id%TYPE) IS
        SELECT p.id as PRODUCT_ID, p.name as PRODUCT_NAME, p.price as PRICE, 
               d.percentage as DISCOUNT_PERCENTAGE, i.stock as QUANTITY, o.total as TOTAL_AMT
        FROM products p
        JOIN order_details od ON p.id = od.product_id
        JOIN orders o ON od.order_id = o.id
        LEFT JOIN discounts d ON p.id = d.product_id
        LEFT JOIN inventory i ON p.id = i.product_id
        WHERE o.customer_id = p_cust_id
        ORDER BY p.price DESC
        FETCH FIRST 3 ROWS ONLY;

    -- Record for nested cursor
    v_prod_id products.id%TYPE;
    v_prod_name products.name%TYPE;
    v_price products.price%TYPE;
    v_discount discounts.percentage%TYPE;
    v_quantity inventory.stock%TYPE;
    v_total_amt orders.total%TYPE;

BEGIN
    DBMS_OUTPUT.PUT_LINE('Customer Order History Report (Last 60 Days)');
    DBMS_OUTPUT.PUT_LINE('--------------------------------------------');
    
    FOR customer_record IN cust_order_cursor LOOP
        v_customer_id := customer_record.CUSTOMER_ID;
        v_customer_name := customer_record.CUSTOMER_NAME;

        DBMS_OUTPUT.PUT_LINE('Customer: ' || v_customer_name || ' (ID: ' || v_customer_id || ')');
        DBMS_OUTPUT.PUT_LINE('Top Products Ordered in Last 60 Days:');

        OPEN top_products_cursor(v_customer_id);
        LOOP
            FETCH top_products_cursor INTO v_prod_id, v_prod_name, v_price, v_discount, v_quantity, v_total_amt;
            EXIT WHEN top_products_cursor%NOTFOUND;

            DBMS_OUTPUT.PUT_LINE(' - Product: ' || v_prod_name || 
                                 ', Price: $' || v_price || 
                                 ', Discount: ' || NVL(v_discount, 0) || '%' || 
                                 ', In Stock: ' || NVL(v_quantity, 0) || 
                                 ', Order Amount: $' || v_total_amt);
        END LOOP;
        CLOSE top_products_cursor;

        DBMS_OUTPUT.PUT_LINE('--------------------------------------------------');
    END LOOP;
END;
/
`;
