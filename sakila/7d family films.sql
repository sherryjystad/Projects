-- 7d. Sales have been lagging among young families, and you wish to target all family movies for a promotion. Identify all movies 
-- categorized as family films.

USE sakila;

SELECT f.title AS 'Film'
FROM film AS f
JOIN film_category AS fc ON fc.film_id = f.film_id
JOIN category AS c ON c.category_id = fc.category_id
WHERE c.name = 'Family';