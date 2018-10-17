SELECT title FROM film WHERE(title LIKE "K%" OR title LIKE "Q%")
AND language_id = (SELECT language_id FROM language WHERE name="ENGLISH");
