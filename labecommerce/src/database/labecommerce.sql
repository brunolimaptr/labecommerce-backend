-- Active: 1673885867623@@127.0.0.1@3306

CREATE TABLE users (
	id INTEGER PRIMARY KEY UNIQUE NOT NULL,
	email TEXT UNIQUE NOT NULL,
	password TEXT NOT NULL
);


INSERT INTO users (id, email, password)
VALUES ("1", "Bruno@aaa", "123456" ),
("2", "João@aaaa", "654321"),
("3", "maria@aaaa", "145263");


SELECT * FROM users;

 CREATE TABLE products (
    id INTEGER PRIMARY KEY UNIQUE NOT NULL,
    name TEXT NOT NULL,
    price REAL NOT NULL,
    category TEXT NOT NULL
);


INSERT INTO products (id, name, price, category)
VALUES ("1", "ferrari", "10000", "esportivo"),
("2", "lamborghini", "10000", "esportivo"),
("3", "uno", "1000", "popular"),
("4", "gol", "2000", "popular"),
("5", "corsa", "1500", "popular");


SELECT * FROM products;


