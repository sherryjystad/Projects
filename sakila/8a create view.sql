-- 8a. In your new role as an executive, you would like to have an easy way of viewing the Top five genres by gross revenue. --
-- Use the solution from the problem above to create a view. If you haven't solved 7h, you can substitute another query to create a view. --
USE sakila;

CREATE VIEW Top_5_Genres AS 
SELECT name AS 'Category', SUM(amount) AS 'Gross_Revenue'
FROM payment
JOIN rental ON rental.rental_id = payment.rental_id
JOIN inventory ON inventory.inventory_id = rental.inventory_id
JOIN film ON film.film_id = inventory.film_id
JOIN film_category ON film_category.film_id = film.film_id
JOIN category ON category.category_id = film_category.category_id
GROUP BY Category
ORDER BY Gross_Revenue DESC 
LIMIT 5;