-- 7c. You want to run an email marketing campaign in Canada, for which you will need
--  the names and email addresses of all Canadian customers. 
-- Use joins to retrieve this information.
USE sakila;

SELECT country, customer.last_name, customer.first_name, customer.email
FROM country
JOIN customer ON
country.country_id = customer.customer_id
WHERE country = 'CANADA'

