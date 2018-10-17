-- 1a. Display the first and last names of all actors from the table `actor`.
USE sakila;
SELECT * FROM actor;

SELECT CONCAT(first_name,' ',last_name) as Actor_Name FROM actor;
SELECT * FROM Actor_Name;
