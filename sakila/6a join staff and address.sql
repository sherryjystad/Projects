use sakila;

SELECT staff.last_name, staff.first_name, address.address
FROM address 
INNER JOIN staff ON
staff.address_id = address.address_id;
