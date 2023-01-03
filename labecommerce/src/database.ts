import { Tuser } from "./types";
import { Tproduct } from "./types";
import { Tpurchase } from "./types";


export const user: Tuser[] = [
{
    id: "1",
    email: "bruno@aa",
    password: "123456"  
}
]

export const product: Tproduct[] = [
    {
        id: "2",
        name: "carro",
        price: 7,
        category: "esportivo"  
    }
]

export const purchase: Tpurchase[] = [
    {
        userId: "1",
        productId: "2",
        quantity: 2,
        totalPrice: 14, 
        cor: "azul",
        teto: "normal"
    }
]

