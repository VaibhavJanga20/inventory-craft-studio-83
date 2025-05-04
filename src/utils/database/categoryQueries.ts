
/**
 * Category Report Queries
 * 
 * This file contains database queries related to category reports.
 */

/**
 * Categories Report - Items by Category
 * 
 * This cursor counts the number of items in each category.
 */
export const itemsPerCategoryQuery = `
SET SERVEROUTPUT ON;

DECLARE
  -- Cursor for categories with item counts
  CURSOR category_items_cursor IS
    SELECT name, items
    FROM categories
    ORDER BY items DESC;
    
  -- Variables
  v_name categories.name%TYPE;
  v_items categories.items%TYPE;
  
BEGIN
  DBMS_OUTPUT.PUT_LINE('Items per Category Report');
  DBMS_OUTPUT.PUT_LINE('------------------------');
  
  FOR cat_rec IN category_items_cursor LOOP
    v_name := cat_rec.name;
    v_items := cat_rec.items;
    
    DBMS_OUTPUT.PUT_LINE(v_name || ': ' || v_items || ' items');
  END LOOP;
END;
/
`;
