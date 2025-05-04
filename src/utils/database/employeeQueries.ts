
/**
 * Employee Report Queries
 * 
 * This file contains database queries related to employee reports.
 */

/**
 * Employees Report - Employee Details
 * 
 * This cursor fetches detailed employee information.
 */
export const employeeDetailsQuery = `
SET SERVEROUTPUT ON;

DECLARE
  -- Cursor for employee details
  CURSOR employee_cursor IS
    SELECT id, name, date_of_birth, age
    FROM employees
    ORDER BY id;
      
  -- Variables
  v_id employees.id%TYPE;
  v_name employees.name%TYPE;
  v_dob employees.date_of_birth%TYPE;
  v_age employees.age%TYPE;
  
BEGIN
  DBMS_OUTPUT.PUT_LINE('Employee Details Report');
  DBMS_OUTPUT.PUT_LINE('----------------------');
  
  FOR emp_rec IN employee_cursor LOOP
    DBMS_OUTPUT.PUT_LINE(
      'ID: ' || emp_rec.id || 
      ', Name: ' || emp_rec.name ||
      ', Date of Birth: ' || emp_rec.date_of_birth ||
      ', Age: ' || emp_rec.age || ' years'
    );
  END LOOP;
END;
/
`;
