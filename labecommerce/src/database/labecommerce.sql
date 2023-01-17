-- Active: 1673885867623@@127.0.0.1@3306


CREATE TABLE users (
	id INTEGER PRIMARY KEY UNIQUE NOT NULL,
	email TEXT UNIQUE NOT NULL,
	password TEXT NOT NULL
);


INSERT INTO users (id,email, password)
VALUES 
	(1,  "fulana@email.com", "fulana2001"),
	(2,  "ciclano@email.com", "ciclano99"),
    (3,  "bruno@email.com", "102099");

SELECT * FROM users;
    

CREATE TABLE products (
	id TEXT PRIMARY KEY UNIQUE NOT NULL,
	name TEXT NOT NULL,
	price REAL NOT NULL,
    category TEXT NOT NULL
);

INSERT INTO products (id, name, price, category)
VALUES 
	("1", "ferrary", 10000, "esportivo"),
	("2",  "corsa", 1500, "popular"),
    ("3",  "gol", 2000, "popular"),
    ("4",  "uno", 1000, "popular"),
    ("5",  "lamborghini", 10000, "esportivo");


SELECT * FROM products;

-------------

SELECT * FROM users;


SELECT * FROM products;


SELECT * FROM products
WHERE name = "uno";


INSERT INTO users (id,email, password)
VALUES 
	(4,  "maria@email.com", "maria01");


INSERT INTO products (id, name, price, category)
VALUES 
	("6", "Fiat 147", 150000, "esportivo");

SELECT * FROM products
WHERE id = "2";


DELETE FROM users
WHERE ID = 3;


DELETE FROM products
WHERE ID = "2";


UPDATE users
SET password = 123586
WHERE id = 1;


UPDATE products
SET category = "popular"
WHERE id = 6;


SELECT * FROM users
ORDER BY email ASC;

SELECT * FROM products
ORDER BY price ASC
LIMIT 2
OFFSET 1;



SELECT * FROM products
WHERE price >= 1000 AND price <= 3000
ORDER BY price ASC;



