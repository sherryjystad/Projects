-- 7h. List the top five genres in gross revenue in descending order. --
-- (Hint: you may need to use the following tables: category, film_category, inventory, payment, and rental.)
USE sakila;

SELECT category.name AS genre, SUM(amount) AS gross_revenue
FROM payment
JOIN rental ON rental.rental_id = payment.rental_id
JOIN inventory ON inventory.inventory_id = rental.inventory_id
JOIN film ON film.film_id = inventory.film_id
JOIN film_category ON film_category.film_id = film.film_id
JOIN category ON category.category_id = film_category.category_id
GROUP BY genre 
ORDER BY gross_revenue DESC 
LIMIT 5;