
/**
 * Scheduled Jobs and Procedures
 * 
 * This file contains scheduled jobs and procedures for automated reporting.
 */

/**
 * Daily Sales Summary Procedure
 * 
 * This procedure would be scheduled to run daily to generate sales summaries.
 */
export const dailySalesSummaryProcedure = `
CREATE OR REPLACE PROCEDURE generate_daily_sales_summary(
    p_date DATE DEFAULT SYSDATE
) AS
    v_total_orders NUMBER := 0;
    v_total_revenue NUMBER := 0;
    v_avg_order_value NUMBER := 0;
    v_completed_orders NUMBER := 0;
    v_processing_orders NUMBER := 0;
    v_pending_orders NUMBER := 0;
BEGIN
    -- Get order counts by status
    SELECT COUNT(*)
    INTO v_total_orders
    FROM orders
    WHERE TRUNC(date) = TRUNC(p_date);
    
    -- Get revenue
    SELECT NVL(SUM(total), 0)
    INTO v_total_revenue
    FROM orders
    WHERE TRUNC(date) = TRUNC(p_date);
    
    -- Calculate average order value
    IF v_total_orders > 0 THEN
        v_avg_order_value := v_total_revenue / v_total_orders;
    END IF;
    
    -- Get order counts by status
    SELECT 
        COUNT(CASE WHEN status = 'Completed' THEN 1 END),
        COUNT(CASE WHEN status = 'Processing' THEN 1 END),
        COUNT(CASE WHEN status = 'Pending' THEN 1 END)
    INTO 
        v_completed_orders,
        v_processing_orders,
        v_pending_orders
    FROM orders
    WHERE TRUNC(date) = TRUNC(p_date);
    
    -- Insert into daily summary table
    INSERT INTO daily_sales_summary (
        summary_date,
        total_orders,
        total_revenue,
        avg_order_value,
        completed_orders,
        processing_orders,
        pending_orders
    ) VALUES (
        TRUNC(p_date),
        v_total_orders,
        v_total_revenue,
        v_avg_order_value,
        v_completed_orders,
        v_processing_orders,
        v_pending_orders
    );
    
    COMMIT;
    
    DBMS_OUTPUT.PUT_LINE('Daily sales summary generated for ' || TO_CHAR(p_date, 'YYYY-MM-DD'));
END generate_daily_sales_summary;
/
`;

/**
 * Scheduled Job for Daily Reports
 * 
 * This would set up a scheduled job to run the daily sales summary procedure.
 */
export const scheduledReportJob = `
BEGIN
    DBMS_SCHEDULER.CREATE_JOB (
        job_name        => 'DAILY_SALES_SUMMARY_JOB',
        job_type        => 'STORED_PROCEDURE',
        job_action      => 'generate_daily_sales_summary',
        start_date      => SYSTIMESTAMP,
        repeat_interval => 'FREQ=DAILY; BYHOUR=23; BYMINUTE=55',
        enabled         => TRUE,
        comments        => 'Job to generate daily sales summary report at 11:55 PM daily'
    );
END;
/
`;
