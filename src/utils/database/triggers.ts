
/**
 * Database Triggers
 * 
 * This file contains database triggers used for automating actions and maintaining data integrity.
 */

/**
 * Low Stock Alert Trigger
 * 
 * This trigger fires when inventory levels fall below minimum thresholds.
 */
export const lowStockAlertTrigger = `
CREATE OR REPLACE TRIGGER low_stock_alert_trigger
AFTER UPDATE OF quantity ON inventory
FOR EACH ROW
DECLARE
    v_product_name products.name%TYPE;
    v_min_threshold NUMBER := 10; -- Configurable threshold
BEGIN
    -- If quantity drops below threshold
    IF :NEW.quantity < v_min_threshold AND :OLD.quantity >= v_min_threshold THEN
        -- Get product name
        SELECT name INTO v_product_name
        FROM products
        WHERE id = :NEW.product_id;
        
        -- Log the low stock alert
        INSERT INTO inventory_alerts (
            product_id,
            product_name,
            current_quantity,
            min_threshold,
            alert_date,
            alert_type
        ) VALUES (
            :NEW.product_id,
            v_product_name,
            :NEW.quantity,
            v_min_threshold,
            SYSDATE,
            'Low Stock'
        );
    END IF;
END;
/
`;

/**
 * Order Status Update Trigger
 * 
 * This trigger updates inventory when an order is completed.
 */
export const orderStatusTrigger = `
CREATE OR REPLACE TRIGGER order_status_update_trigger
AFTER UPDATE OF status ON orders
FOR EACH ROW
DECLARE
    CURSOR order_items_cursor IS
        SELECT product_id, quantity
        FROM order_details
        WHERE order_id = :NEW.id;
BEGIN
    -- If order is newly shipped/completed
    IF :NEW.status = 'Completed' AND :OLD.status != 'Completed' THEN
        -- Update inventory for each product in the order
        FOR item_rec IN order_items_cursor LOOP
            UPDATE inventory
            SET quantity = quantity - item_rec.quantity
            WHERE product_id = item_rec.product_id;
        END LOOP;
    END IF;
END;
/
`;

/**
 * Warehouse Capacity Alert Trigger
 * 
 * This trigger fires when warehouse capacity utilization exceeds a threshold.
 */
export const warehouseCapacityTrigger = `
CREATE OR REPLACE TRIGGER warehouse_capacity_alert_trigger
AFTER UPDATE OF capacity_used ON warehouses
FOR EACH ROW
DECLARE
    v_utilization_percent NUMBER;
    v_threshold NUMBER := 80; -- 80% capacity threshold
BEGIN
    -- Calculate new utilization percentage
    v_utilization_percent := (:NEW.capacity_used / :NEW.capacity_total) * 100;
    
    -- If utilization exceeds threshold and didn't before
    IF v_utilization_percent >= v_threshold AND 
       (:OLD.capacity_used / :OLD.capacity_total) * 100 < v_threshold THEN
        
        -- Log the capacity alert
        INSERT INTO warehouse_alerts (
            warehouse_id,
            alert_date,
            capacity_total,
            capacity_used,
            utilization_percent,
            alert_type
        ) VALUES (
            :NEW.id,
            SYSDATE,
            :NEW.capacity_total,
            :NEW.capacity_used,
            v_utilization_percent,
            'Capacity Warning'
        );
    END IF;
END;
/
`;

/**
 * Product Price History Trigger
 * 
 * This trigger maintains a history of product price changes.
 */
export const productPriceHistoryTrigger = `
CREATE OR REPLACE TRIGGER product_price_history_trigger
AFTER UPDATE OF price ON products
FOR EACH ROW
BEGIN
    -- Record the price change in history table
    INSERT INTO product_price_history (
        product_id,
        old_price,
        new_price,
        change_date,
        change_percent
    ) VALUES (
        :NEW.id,
        :OLD.price,
        :NEW.price,
        SYSDATE,
        ROUND(((:NEW.price - :OLD.price) / :OLD.price) * 100, 2)
    );
END;
/
`;
