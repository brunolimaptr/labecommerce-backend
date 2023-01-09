"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.queryProductsByName = exports.getProductById = exports.purchase = exports.product = exports.user = void 0;
const types_1 = require("./types");
exports.user = [
    {
        id: "1",
        email: "bruno@aa",
        password: "123456"
    }
];
exports.product = [
    {
        id: "2",
        name: "carro",
        price: 7,
        category: types_1.CATEGORIAS.ACCESSORIES,
    }
];
exports.purchase = [
    {
        userId: "1",
        productId: "2",
        quantity: 2,
        totalPrice: 14,
        cor: "azul",
        teto: "normal"
    }
];
function createUser(id, email, password) {
    const userToAdd = {
        id: id,
        email: email,
        password: password
    };
    exports.user.push(userToAdd);
    console.log("Cadastro realizado com Sucesso");
}
console.log(createUser("2", "aaaa@", "12345"));
function getAllUsers() {
    return exports.user;
}
getAllUsers();
function createProduct(id, name, price, category) {
    const novoProduct = {
        id: id,
        name: name,
        price: price,
        category: category,
    };
    exports.product.push(novoProduct);
    console.log("Produto criado com Sucesso");
}
console.log(createProduct("3", "aaaa@", 20, types_1.CATEGORIAS.ELECTRONICS));
function getAllProduct() {
    return exports.product;
}
getAllProduct();
function getProductById(idToSearch) {
    return (exports.product.filter((item) => {
        if (item.id === idToSearch) {
            return exports.product;
        }
    }));
}
exports.getProductById = getProductById;
getProductById("2");
const queryProductsByName = (q) => {
    const query = exports.product.filter((products) => {
        return (products.name.toLowerCase().includes(q.toLowerCase()));
    });
    console.log(query);
};
exports.queryProductsByName = queryProductsByName;
//# sourceMappingURL=database.js.map