-- 7g. Write a query to display for each store its store ID, city, and country. --
USE sakila;

SELECT store.store_id, address, city, country
FROM store
JOIN address ON store.address_id = address.address_id
JOIN city ON city.city_id = address.city_id  
JOIN country ON city.country_id = country.country_id
GROUP BY store.store_id;


