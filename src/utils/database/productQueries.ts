
/**
 * Product Report Queries
 * 
 * This file contains database queries related to product reports.
 */

/**
 * Products Report - Category Distribution
 * 
 * This cursor fetches products grouped by category to generate the pie chart in the Products report.
 */
export const productsByCategoryQuery = `
SET SERVEROUTPUT ON;

DECLARE
  -- Cursor to fetch products by category
  CURSOR category_cursor IS
    SELECT category, COUNT(*) as item_count
    FROM products
    GROUP BY category
    ORDER BY item_count DESC;
    
  -- Variables for cursor
  v_category products.category%TYPE;
  v_count NUMBER;
  v_total_products NUMBER := 0;
  
BEGIN
  -- Get total count of products
  SELECT COUNT(*) INTO v_total_products FROM products;
  
  DBMS_OUTPUT.PUT_LINE('Product Category Distribution Report');
  DBMS_OUTPUT.PUT_LINE('----------------------------------');
  
  -- Loop through categories
  FOR category_rec IN category_cursor LOOP
    v_category := category_rec.category;
    v_count := category_rec.item_count;
    
    DBMS_OUTPUT.PUT_LINE(
      v_category || ': ' || 
      v_count || ' products (' || 
      ROUND((v_count / v_total_products) * 100, 2) || '%)'
    );
  END LOOP;
END;
/
`;

/**
 * Products Report - Price Range Distribution
 * 
 * This cursor analyzes product price ranges to generate the bar chart in the Products report.
 */
export const productsByPriceRangeQuery = `
SET SERVEROUTPUT ON;

DECLARE
  -- Cursor for price ranges
  CURSOR price_range_cursor IS
    SELECT 
      CASE
        WHEN price BETWEEN 0 AND 25 THEN '$0-$25'
        WHEN price BETWEEN 25.01 AND 50 THEN '$25-$50'
        WHEN price BETWEEN 50.01 AND 100 THEN '$50-$100'
        WHEN price BETWEEN 100.01 AND 200 THEN '$100-$200'
        ELSE '$200+'
      END as price_range,
      COUNT(*) as count
    FROM products
    GROUP BY 
      CASE
        WHEN price BETWEEN 0 AND 25 THEN '$0-$25'
        WHEN price BETWEEN 25.01 AND 50 THEN '$25-$50'
        WHEN price BETWEEN 50.01 AND 100 THEN '$50-$100'
        WHEN price BETWEEN 100.01 AND 200 THEN '$100-$200'
        ELSE '$200+'
      END
    ORDER BY 
      CASE price_range
        WHEN '$0-$25' THEN 1
        WHEN '$25-$50' THEN 2
        WHEN '$50-$100' THEN 3
        WHEN '$100-$200' THEN 4
        ELSE 5
      END;
      
  -- Variables
  v_range VARCHAR2(20);
  v_count NUMBER;
  
BEGIN
  DBMS_OUTPUT.PUT_LINE('Product Price Range Distribution');
  DBMS_OUTPUT.PUT_LINE('--------------------------------');
  
  FOR range_rec IN price_range_cursor LOOP
    v_range := range_rec.price_range;
    v_count := range_rec.count;
    
    DBMS_OUTPUT.PUT_LINE(v_range || ': ' || v_count || ' products');
  END LOOP;
END;
/
`;

/**
 * Products Report - Top Products by Stock
 * 
 * This cursor fetches the top products by stock quantity.
 */
export const topProductsByStockQuery = `
SET SERVEROUTPUT ON;

DECLARE
  -- Cursor for top products by stock
  CURSOR top_stock_cursor IS
    SELECT id, name, category, price, stock
    FROM products
    ORDER BY stock DESC
    FETCH FIRST 5 ROWS ONLY;
    
  -- Record type for product
  TYPE product_rec_type IS RECORD (
    id products.id%TYPE,
    name products.name%TYPE,
    category products.category%TYPE,
    price products.price%TYPE,
    stock products.stock%TYPE
  );
  
  -- Product record
  v_product product_rec_type;
  
BEGIN
  DBMS_OUTPUT.PUT_LINE('Top 5 Products by Stock');
  DBMS_OUTPUT.PUT_LINE('----------------------');
  
  OPEN top_stock_cursor;
  
  LOOP
    FETCH top_stock_cursor INTO v_product;
    EXIT WHEN top_stock_cursor%NOTFOUND;
    
    DBMS_OUTPUT.PUT_LINE(
      'ID: ' || v_product.id || 
      ', Name: ' || v_product.name ||
      ', Category: ' || v_product.category ||
      ', Price: $' || TO_CHAR(v_product.price, '999,999.99') ||
      ', Stock: ' || v_product.stock
    );
  END LOOP;
  
  CLOSE top_stock_cursor;
END;
/
`;

/**
 * Products Report - Products by Category Breakdown
 * 
 * This nested cursor fetches detailed information for each product within each category.
 */
export const productsByCategoryDetailQuery = `
SET SERVEROUTPUT ON;

DECLARE
  -- Cursor for categories
  CURSOR category_cursor IS
    SELECT DISTINCT category
    FROM products
    ORDER BY category;
    
  -- Nested cursor for products in a category
  CURSOR products_in_category_cursor(p_category products.category%TYPE) IS
    SELECT id, name, price, stock
    FROM products
    WHERE category = p_category
    ORDER BY name;
    
  -- Variable for category
  v_category products.category%TYPE;
  
  -- Variables for product details
  v_id products.id%TYPE;
  v_name products.name%TYPE;
  v_price products.price%TYPE;
  v_stock products.stock%TYPE;
  
BEGIN
  DBMS_OUTPUT.PUT_LINE('Products By Category Breakdown');
  DBMS_OUTPUT.PUT_LINE('-----------------------------');
  
  -- Loop through categories
  FOR cat_rec IN category_cursor LOOP
    v_category := cat_rec.category;
    
    DBMS_OUTPUT.PUT_LINE('Category: ' || v_category);
    DBMS_OUTPUT.PUT_LINE('-------------------');
    
    -- Loop through products in this category
    OPEN products_in_category_cursor(v_category);
    LOOP
      FETCH products_in_category_cursor INTO v_id, v_name, v_price, v_stock;
      EXIT WHEN products_in_category_cursor%NOTFOUND;
      
      DBMS_OUTPUT.PUT_LINE(
        'Product: ' || v_name || 
        ', Price: $' || TO_CHAR(v_price, '999,999.99') || 
        ', Stock: ' || v_stock
      );
    END LOOP;
    CLOSE products_in_category_cursor;
    
    DBMS_OUTPUT.PUT_LINE('');
  END LOOP;
END;
/
`;
