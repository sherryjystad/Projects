--  7b. Use subqueries to display all actors who appear in the film `Alone Trip`.
use sakila;

select first_name, last_name from actor where actor_id
in
(SELECT actor_id
  FROM film_actor
  WHERE film_id IN
  
	(SELECT film_id
	FROM film
	WHERE title = 'ALONE TRIP')
);
