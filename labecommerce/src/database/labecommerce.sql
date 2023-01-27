-- Active: 1673885867623@@127.0.0.1@3306


CREATE TABLE users (
	id TEXT PRIMARY KEY UNIQUE NOT NULL,
	name TEXT NOT NULL,
	email TEXT UNIQUE NOT NULL,
	password TEXT NOT NULL,
	created_at TEXT DEFAULT(DATETIME()) NOT NULL
);



INSERT INTO users (id, name, email, password)
VALUES 
	("U001", "Bruno", "bruno@email.com", "bruno12"),
	("U002",  "Ciclano", "ciclano@email.com", "ciclano99"),
    ("U003",  "Fulano", "fulano@email.com", "fulano10");

SELECT * FROM users;


DROP TABLE users;
    

CREATE TABLE products (
	id TEXT PRIMARY KEY UNIQUE NOT NULL,
	name TEXT UNIQUE NOT NULL,
	price REAL NOT NULL,
    description TEXT NOT NULL,
	image_url TEXT NOT NULL
);

INSERT INTO products (id, name, price, description, image_url)
VALUES 
	("p001", "ferrari", 10000, "esportivo", "https://pixabay.com/pt/photos/ferrari-carro-aranha-ve%c3%adculo-motor-2580884/"),
	("p002",  "corsa", 1500, "popular", "https://pixabay.com/pt/photos/vauxhall-corsa-carro-auto-liga-1838873/"),
    ("p003",  "gol", 2000, "popular", "https://www.mobiauto.com.br/revista/volkswagen-gol-custos-de-revisao-seguro-e-pecas-de-manutencao/2030"),
    ("p004",  "uno", 1000, "popular", "https://autoesporte.globo.com/carros/noticia/2014/11/fiat-uno-ganha-serie-especial-italia-por-r-34430.ghtml"),
    ("p005",  "lamborghini", 10000, "esportivo", "https://quatrorodas.abril.com.br/noticias/este-lamborghini-huracan-performante-biturbo-e-um-monstro-de-1-000-cv/");


SELECT * FROM products;


DROP TABLE products;



CREATE TABLE purchases (
	id TEXT PRIMARY KEY UNIQUE NOT NULL,
	buyer_id TEXT NOT NULL,
	total_price REAL NOT NULL DEFAULT (0),
	created_at TEXT NOT NULL DEFAULT(DATETIME()), 
	paid INTEGER DEFAULT(0) NOT NULL,
	FOREIGN KEY (buyer_id) REFERENCES users (id)
);


INSERT INTO purchases (id, buyer_id)
VALUES 
	("pu001", "U001"),
	("pu002", "U001"),
	("pu003", "U002"),
	("pu004", "U002"),
	("pu005", "U003"),
	("pu006", "U003");

SELECT * FROM purchases;


DROP TABLE purchases;


SELECT * FROM purchases
INNER JOIN users
ON purchases.buyer_id = users.id
WHERE purchases.id = "p1";




CREATE TABLE purchases_products(
	purchase_id TEXT NOT NULL,
	product_id TEXT NOT NULL,
	quantity INTEGER NOT NULL,
	FOREIGN KEY (purchase_id) REFERENCES purchases (id),
	FOREIGN KEY (product_id) REFERENCES products (id)
);

INSERT INTO purchases_products (purchase_id, product_id, quantity)
VALUES 
	("pu001", "p001", 3),
	("pu002", "p003", 5),
	("pu003", "p002", 1);

DROP TABLE purchases_products;

SELECT * FROM purchases_products;



SELECT * FROM purchases_products
INNER JOIN purchases
ON purchases_products.purchase_id = purchases.id
INNER JOIN products
ON purchases_products.product_id = products.id;


