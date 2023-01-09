"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const database_1 = require("./database");
const database_2 = require("./database");
const database_3 = require("./database");
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.listen(3003, () => {
    console.log("Servidor rodando na porta 3003");
});
app.get("/ping", (req, res) => {
    res.send("Pong!");
});
app.get("/user", (req, res) => {
    res.status(200).send(database_1.user);
});
app.get("/product", (req, res) => {
    res.status(200).send(database_2.product);
});
app.get("/product/search", (req, res) => {
    const q = req.query.q;
    const result = database_2.product.filter((produtos) => produtos.name.toLowerCase().includes(q.toLowerCase()));
    res.status(200).send(result);
});
app.post("/user", (req, res) => {
    const id = req.body.id;
    const email = req.body.email;
    const password = req.body.password;
    const newUser = {
        id,
        email,
        password
    };
    database_1.user.push(newUser);
    res.status(201).send("Cadastro realizado com sucesso");
});
app.post("/product", (req, res) => {
    const id = req.body.id;
    const name = req.body.name;
    const price = req.body.price;
    const category = req.body.category;
    const newProduct = {
        id,
        name,
        price,
        category
    };
    database_2.product.push(newProduct);
    res.status(201).send("Cadastro realizado com sucesso");
});
app.post("/purchase", (req, res) => {
    const userId = req.body.userId;
    const productId = req.body.productId;
    const quantity = req.body.quantity;
    const totalPrice = req.body.totalPrice;
    const cor = req.body.cor;
    const teto = req.body.teto;
    const newPurchase = {
        userId,
        productId,
        quantity,
        totalPrice,
        cor,
        teto
    };
    database_3.purchase.push(newPurchase);
    res.status(201).send("Cadastro realizado com sucesso");
});
//# sourceMappingURL=index.js.map