import { TUser } from "./types";
import { Tproduct } from "./types";
import { Tpurchase } from "./types";
import { CATEGORIAS } from "./types";


export const user: TUser[] = [
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
        category: CATEGORIAS.ACCESSORIES,
           
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


function createUser(id: string, email: string, password: string): void {
    const userToAdd = {
        id: id,
        email: email,
        password: password
    }

    user.push(userToAdd)

    console.log("Cadastro realizado com Sucesso")

  }

//   console.log(createUser("2","aaaa@","12345"));


  function getAllUsers(): TUser[] {
    return user
  }
  
 getAllUsers()
  

 function createProduct(id: string, name: string, price: number, category: CATEGORIAS): void {
    const novoProduct: Tproduct = {
        id: id,
        name: name,
        price: price,
        category: category,
    }

    product.push(novoProduct)

    console.log("Produto criado com Sucesso")

  }

//   console.log(createProduct("3","aaaa@",20, CATEGORIAS.ELECTRONICS));


  function getAllProduct(): Tproduct[] {
    return product
  }
  
 getAllProduct()
  


 export function getProductById(idToSearch: string) : Tproduct[] | undefined {
    return(product.filter((item)=>{
        if(item.id === idToSearch){
            return product
        }
    }))    
    }
 
    getProductById("2")


export const queryProductsByName = (q: string) => {
    const query = product.filter((products)=>{
       return(products.name.toLowerCase().includes(q.toLowerCase()))
    })
    console.log(query);
    
}


