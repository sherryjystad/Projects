
SELECT staff.first_name, staff.last_name, SUM(payment.amount)
FROM staff 
INNER JOIN payment 
ON staff.staff_id = payment.staff_id
GROUP BY payment.staff_id
ORDER BY last_name ASC;

