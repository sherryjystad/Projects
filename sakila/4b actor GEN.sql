SELECT * FROM sakila.actor;
SELECT last_name, Count(*) AS CNT
FROM ACTOR
GROUP BY last_name
HAVING COUNT(*) >= 2