use Sakila;
SELECT  f.title, count(fa.actor_id)
FROM film f
join film_actor fa
on f.film_id = fa.film_id
group by title;
