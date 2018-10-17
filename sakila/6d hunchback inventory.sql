-- 6d. How many copies of the film `Hunchback Impossible` exist in the inventory system?
use Sakila;
SELECT  f.title, count(i.film_id)
FROM film f
join inventory i
on f.film_id = i.film_id
group by title having f.title="HUNCHBACK IMPOSSIBLE";
