export enum CATEGORIAS {
    ACCESSORIES = "Acessórios",
    CLOTHES_AND_SHOES = "Roupas e calçados",
    ELECTRONICS = "Eletrônicos"
}

export type TUser = {
    id: string,
    email: string,
    password: string
}

export type Tproduct = {
    id: string,
    name: string,
    price: number,
    category: CATEGORIAS,
   
}

export type Tpurchase = {
    userId: string,
    productId: string,
    quantity: number,
    totalPrice: number,
    cor: string,
    teto: string
}