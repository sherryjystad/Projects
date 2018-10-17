-- 7f. Write a query to display how much business, in dollars, each store brought in. --
USE sakila;

SELECT store.store_id, address, SUM(amount) AS store_total
FROM address
JOIN store ON store.address_id = address.address_id
JOIN payment ON store.manager_staff_id = payment.staff_id
GROUP BY store.store_id

