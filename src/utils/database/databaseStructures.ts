
/**
 * Database Table Structures
 * 
 * This file defines the database schema used for the inventory management system.
 */

/**
 * Database Table Structures
 * 
 * These would be the table definitions that would support the frontend data.
 */
export const databaseTableStructures = `
-- Products Table
CREATE TABLE products (
    id VARCHAR2(10) PRIMARY KEY,
    name VARCHAR2(100) NOT NULL,
    category VARCHAR2(50) NOT NULL,
    price NUMBER(10,2) NOT NULL,
    stock NUMBER(10) NOT NULL,
    description VARCHAR2(500),
    created_date DATE DEFAULT SYSDATE,
    last_updated DATE DEFAULT SYSDATE
);

-- Inventory Table
CREATE TABLE inventory (
    id VARCHAR2(10) PRIMARY KEY,
    product_id VARCHAR2(10) NOT NULL,
    category VARCHAR2(50) NOT NULL,
    quantity NUMBER(10) NOT NULL,
    status VARCHAR2(20) NOT NULL,
    last_updated DATE DEFAULT SYSDATE,
    CONSTRAINT fk_inventory_product FOREIGN KEY (product_id) REFERENCES products(id)
);

-- Categories Table
CREATE TABLE categories (
    id VARCHAR2(10) PRIMARY KEY,
    name VARCHAR2(50) NOT NULL,
    description VARCHAR2(200),
    items NUMBER(10) DEFAULT 0,
    created_on DATE DEFAULT SYSDATE
);

-- Customers Table
CREATE TABLE customers (
    id VARCHAR2(10) PRIMARY KEY,
    name VARCHAR2(100) NOT NULL,
    city VARCHAR2(50) NOT NULL,
    state VARCHAR2(50) NOT NULL,
    zipcode VARCHAR2(10) NOT NULL,
    email VARCHAR2(100),
    phone VARCHAR2(20),
    created_date DATE DEFAULT SYSDATE
);

-- Orders Table
CREATE TABLE orders (
    id VARCHAR2(10) PRIMARY KEY,
    customer_id VARCHAR2(10) NOT NULL,
    date DATE DEFAULT SYSDATE,
    status VARCHAR2(20) NOT NULL,
    total NUMBER(10,2) NOT NULL,
    payment_method VARCHAR2(50),
    CONSTRAINT fk_orders_customer FOREIGN KEY (customer_id) REFERENCES customers(id)
);

-- Order Details Table
CREATE TABLE order_details (
    id VARCHAR2(10) PRIMARY KEY,
    order_id VARCHAR2(10) NOT NULL,
    product_id VARCHAR2(10) NOT NULL,
    quantity NUMBER(5) NOT NULL,
    price NUMBER(10,2) NOT NULL,
    CONSTRAINT fk_orderdetails_order FOREIGN KEY (order_id) REFERENCES orders(id),
    CONSTRAINT fk_orderdetails_product FOREIGN KEY (product_id) REFERENCES products(id)
);

-- Employees Table
CREATE TABLE employees (
    id VARCHAR2(10) PRIMARY KEY,
    name VARCHAR2(100) NOT NULL,
    date_of_birth DATE NOT NULL,
    age NUMBER(3) NOT NULL,
    position VARCHAR2(50),
    hire_date DATE DEFAULT SYSDATE,
    salary NUMBER(10,2),
    contact VARCHAR2(50)
);

-- Warehouses Table
CREATE TABLE warehouses (
    id VARCHAR2(10) PRIMARY KEY,
    location_id VARCHAR2(10) NOT NULL,
    manager VARCHAR2(100) NOT NULL,
    phone VARCHAR2(20),
    capacity_total NUMBER(10) NOT NULL,
    capacity_used NUMBER(10) NOT NULL,
    CONSTRAINT fk_warehouse_location FOREIGN KEY (location_id) REFERENCES locations(id)
);

-- Locations Table
CREATE TABLE locations (
    id VARCHAR2(10) PRIMARY KEY,
    address VARCHAR2(200) NOT NULL,
    city VARCHAR2(50) NOT NULL,
    state VARCHAR2(50) NOT NULL,
    zip VARCHAR2(10) NOT NULL,
    country VARCHAR2(50) DEFAULT 'USA'
);

-- Inventory Alerts Table
CREATE TABLE inventory_alerts (
    id NUMBER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    product_id VARCHAR2(10) NOT NULL,
    product_name VARCHAR2(100) NOT NULL,
    current_quantity NUMBER(10) NOT NULL,
    min_threshold NUMBER(10) NOT NULL,
    alert_date DATE DEFAULT SYSDATE,
    alert_type VARCHAR2(50) NOT NULL,
    resolved CHAR(1) DEFAULT 'N',
    resolved_date DATE,
    CONSTRAINT fk_invalerrt_product FOREIGN KEY (product_id) REFERENCES products(id)
);

-- Warehouse Alerts Table
CREATE TABLE warehouse_alerts (
    id NUMBER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    warehouse_id VARCHAR2(10) NOT NULL,
    alert_date DATE DEFAULT SYSDATE,
    capacity_total NUMBER(10) NOT NULL,
    capacity_used NUMBER(10) NOT NULL,
    utilization_percent NUMBER(5,2) NOT NULL,
    alert_type VARCHAR2(50) NOT NULL,
    resolved CHAR(1) DEFAULT 'N',
    resolved_date DATE,
    CONSTRAINT fk_whalerrt_warehouse FOREIGN KEY (warehouse_id) REFERENCES warehouses(id)
);

-- Product Price History Table
CREATE TABLE product_price_history (
    id NUMBER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    product_id VARCHAR2(10) NOT NULL,
    old_price NUMBER(10,2) NOT NULL,
    new_price NUMBER(10,2) NOT NULL,
    change_date DATE DEFAULT SYSDATE,
    change_percent NUMBER(5,2) NOT NULL,
    CONSTRAINT fk_pricehistory_product FOREIGN KEY (product_id) REFERENCES products(id)
);

-- Daily Sales Summary Table
CREATE TABLE daily_sales_summary (
    id NUMBER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    summary_date DATE NOT NULL,
    total_orders NUMBER(10) NOT NULL,
    total_revenue NUMBER(12,2) NOT NULL,
    avg_order_value NUMBER(10,2) NOT NULL,
    completed_orders NUMBER(10) NOT NULL,
    processing_orders NUMBER(10) NOT NULL,
    pending_orders NUMBER(10) NOT NULL,
    CONSTRAINT uq_dailysales_date UNIQUE (summary_date)
);

-- Discounts Table
CREATE TABLE discounts (
    id NUMBER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    product_id VARCHAR2(10) NOT NULL,
    percentage NUMBER(5,2) NOT NULL,
    start_date DATE NOT NULL,
    end_date DATE NOT NULL,
    active CHAR(1) DEFAULT 'Y',
    CONSTRAINT fk_discount_product FOREIGN KEY (product_id) REFERENCES products(id)
);
`;
