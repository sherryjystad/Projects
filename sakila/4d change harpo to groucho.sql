SELECT * FROM sakila.actor;

SELECT * FROM actor WHERE last_name="williams" and first_name="harpo" ;

update actor SET first_name = 'GROUCHO'
WHERE actor_id = 172;

SELECT * FROM actor WHERE last_name="williams"