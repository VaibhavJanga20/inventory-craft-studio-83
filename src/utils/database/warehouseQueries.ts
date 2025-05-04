
/**
 * Warehouse Report Queries
 * 
 * This file contains database queries related to warehouse reports.
 */

/**
 * Warehouses Report - Warehouse Capacity Utilization
 * 
 * This cursor analyzes warehouse capacity utilization.
 */
export const warehouseCapacityQuery = `
SET SERVEROUTPUT ON;

DECLARE
  -- Cursor for warehouse capacity
  CURSOR warehouse_capacity_cursor IS
    SELECT 
      w.id,
      l.city,
      l.state,
      w.capacity.total as total_capacity,
      w.capacity.used as used_capacity,
      (w.capacity.total - w.capacity.used) as available_capacity,
      ROUND((w.capacity.used / w.capacity.total) * 100, 2) as utilization_percent
    FROM warehouses w
    JOIN locations l ON w.location_id = l.id
    ORDER BY utilization_percent DESC;
      
  -- Variables
  v_id warehouses.id%TYPE;
  v_city locations.city%TYPE;
  v_state locations.state%TYPE;
  v_total NUMBER;
  v_used NUMBER;
  v_available NUMBER;
  v_utilization NUMBER;
  
BEGIN
  DBMS_OUTPUT.PUT_LINE('Warehouse Capacity Utilization');
  DBMS_OUTPUT.PUT_LINE('-----------------------------');
  
  FOR wh_rec IN warehouse_capacity_cursor LOOP
    DBMS_OUTPUT.PUT_LINE(
      'Warehouse: ' || wh_rec.city || ', ' || wh_rec.state || 
      ' (ID: ' || wh_rec.id || ')' ||
      ', Total Capacity: ' || wh_rec.total_capacity ||
      ', Used: ' || wh_rec.used_capacity ||
      ', Available: ' || wh_rec.available_capacity ||
      ', Utilization: ' || wh_rec.utilization_percent || '%'
    );
  END LOOP;
END;
/
`;
