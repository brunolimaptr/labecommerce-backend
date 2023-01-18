-- Active: 1673885867623@@127.0.0.1@3306


CREATE TABLE users (
	id INTEGER PRIMARY KEY UNIQUE NOT NULL,
	email TEXT UNIQUE NOT NULL,
	password TEXT NOT NULL
);


<<<<<<< HEAD
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



-----------------------------------------------


CREATE TABLE purchases (
	id TEXT PRIMARY KEY UNIQUE NOT NULL,
	total_price REAL UNIQUE NOT NULL,
	paid INTEGER NOT NULL,
    delivered_at TEXT,
	buyer_id TEXT NOT NULL,
	FOREIGN KEY (buyer_id) REFERENCES users (id)
);


INSERT INTO purchases (id, total_price, paid, buyer_id )
VALUES 
	("p1", 200000, 0,  "1"),
	("p2", 300000, 0,  "1"),
	("p3", 500000, 0,  "2"),
	("p4", 400000, 0,  "2"),
	("p5", 800000, 0,  "4"),
	("p6", 100000, 0,  "4");

SELECT * FROM purchases;

UPDATE purchases
SET delivered_at = DATETIME ("NOW")
WHERE id = "p1";


DELETE FROM purchases;

DROP TABLE purchases;


SELECT * FROM purchases
INNER JOIN users
ON purchases.buyer_id = users.id
WHERE purchases.id = "p1";
