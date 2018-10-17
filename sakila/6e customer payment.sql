-- 6e. Using the tables `payment` and `customer` and the `JOIN` command, 
-- list the total paid by each customer. List the customers alphabetically by last name:
use Sakila;
SELECT  c.last_name, c.first_name, SUM(p.amount)
FROM customer c
JOIN payment p
ON c.customer_id = p.customer_id
GROUP BY last_name;