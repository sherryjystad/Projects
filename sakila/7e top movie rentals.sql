USE sakila;

SELECT title, COUNT(rental_id) AS top_rentals
FROM film
JOIN inventory ON inventory.film_id = film.film_id
JOIN rental ON rental.inventory_id = inventory.inventory_id
GROUP BY title
ORDER BY top_rentals DESC;


