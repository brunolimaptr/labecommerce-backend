import { user } from "./database";
import { product } from "./database";
import { purchase } from "./database";
import express, { Request, Response} from "express"
import cors from "cors"
import { Tproduct, TUser, Tpurchase, CATEGORIAS } from "./types";

const app = express()
app.use(cors())
app.use(express.json())


app.listen(3003, ()=> {
    console.log("Servidor rodando na porta 3003");   
})

app.get("/ping", (req: Request, res: Response)=>{
    res.send("Pong!")
})


app.get("/user", (req: Request, res: Response)=>{
    try{
        const id = req.body.id
        
         res.status(200).send(user)
       
    }
    catch (error: any) {
        console.log(error)

        if(res.statusCode === 200) {
            res.status(500)
        }
        res.send(error.message)
        
    }
})

app.get("/product", (req: Request, res: Response)=>{
    try{
        const id = req.body.id
    
        res.status(200).send(product)
    }
    catch (error: any) {
        console.log(error)

        if(res.statusCode === 200) {
            res.status(500)
        }
        res.send(error.message)
        
    }
})



app.get("/product/search", (req: Request, res: Response)=>{
   try{
    const q = req.query.q as string

    if(q.length>0){

   const result: Tproduct[] = product.filter(
    (produtos)=> produtos.name.toLowerCase().includes(q.toLowerCase()))
   
    res.status(200).send(result)
   }else{
    res.status(404)
    throw new Error("query params deve possuir pelo menos um caractere")
   }
   }
   catch (error: any) {
    console.log(error)

    if(res.statusCode === 200) {
        res.status(500)
    }
    res.send(error.message)
    
}
})


app.post("/user", (req: Request, res: Response)=>{

try{
   const id = req.body.id as string
   const email = req.body.email as string
   const password = req.body.password as string

   const newUser: TUser ={
    id,
    email,
    password
   }
  
const userId = user.find((users)=> users.id === id)
const userEmail = user.find((users)=> users.email === email)

   if(userId){
    res.status(400)
    throw new Error("Id já utilizado.")
   }
    if(userEmail){
    res.status(400)
    throw new Error("email já utilizado.")
}else{
    user.push(newUser)
    res.status(201).send("Cadastro realizado com sucesso")
}
}catch (error) {
    console.log(error)
    if(res.statusCode === 200){
        res.status(500)
        }
        res.send(error.message)
    
}

})


app.post("/product", (req: Request, res: Response)=>{
try{
    const id = req.body.id as string
    const name = req.body.name as string 
    const price = req.body.price as number
    const category = req.body.category as CATEGORIAS
 
    const newProduct: Tproduct ={
     id,
     name,
     price,
     category
    }

    const productId = product.find((products)=> products.id === id)

    if(productId){
        res.status(400)
        throw new Error("Id já utilizado.")
       }else{
    product.push(newProduct)
    res.status(201).send("Cadastro realizado com sucesso")
}
}catch (error) {
    console.log(error)
    if(res.statusCode === 200){
        res.status(500)
        }
        res.send(error.message)
    
}
 })


 app.post("/purchase", (req: Request, res: Response)=>{
try{
   const userId = req.body.userId as string
   const productId =  req.body.productId as string
   const quantity = req.body.quantity as number
   const  totalPrice = req.body.totalPrice as number
   const cor = req.body.cor as string
   const teto = req.body.teto as string
 
    const newPurchase: Tpurchase ={
     userId,
     productId,
     quantity,
     totalPrice,
     cor,
     teto
    }
 
    purchase.push(newPurchase)
 
    res.status(201).send("Cadastro realizado com sucesso")
}catch (error) {
    console.log(error)
    if(res.statusCode === 200){
        res.status(500)
        }
        res.send(error.message)
    
}
 })



 app.get("/product/:id", (req: Request, res: Response)=>{
try{
    const id = req.params.id

    const result = product.find((produtos)=>{
        return produtos.id === id
    })
    res.status(200).send(result)
}catch (error) {
    console.log(error)
    if(res.statusCode === 200){
        res.status(500)
        }
        res.send(error.message)
    
}
})


app.get("/users/:id/purchase", (req: Request, res: Response)=>{
try{
    const id = req.params.id
    const result = user.find((user)=>{
        return user.id === id
    })
    if(result){
        const getPurchase = purchase.filter((comprar)=>{
            return comprar.userId === result.id
        })
    if(getPurchase)
    res.status(200).send(getPurchase)
    }
}catch (error) {
    console.log(error)
    if(res.statusCode === 200){
        res.status(500)
        }
        res.send(error.message)
    
}
})


app.delete("/user/:id", (req: Request, res: Response)=>{
try{
    const id = req.params.id
    const userIndex = user.findIndex((users)=>{
        return users.id === id
    })
    console.log("index", userIndex);

    if(userIndex>=0){
        user.splice(userIndex,1)
        res.status(200).send("item deletado")
    }else{
        res.status(200).send("item não encontrado")
    }
}catch (error) {
    console.log(error)
    if(res.statusCode === 200){
        res.status(500)
        }
        res.send(error.message)
    
}
})


app.delete("/product/:id", (req: Request, res: Response)=>{
try{
    const id = req.params.id
    const productIndex = product.findIndex((produtos)=>{
        return produtos.id === id
    })
    
    console.log("index", productIndex);

    if(productIndex>=0){
        product.splice(productIndex,1)
        res.status(200).send("item deletado")
    }else{
        res.status(200).send("item não encontrado")
    }
}catch (error) {
    console.log(error)
    if(res.statusCode === 200){
        res.status(500)
        }
        res.send(error.message)
    
}  
})



app.put("/user/:id", (req: Request, res: Response)=>{
 try{
    const id = req.params.id

    const newId = req.body.id as string | undefined
    const newEmail = req.body.email as string | undefined
    const newPassword = req.body.balance as string | undefined
   

    const users = user.find((users)=>{
        return users.id === id
    })
  if(users){
    users.id = newId || users.id
    users.email = newEmail || users.email
    users.password = newPassword || users.password
    res.status(200).send("item atualizado com sucesso")
  }else{
    res.status(200).send("item não encontrado")
  }
}catch (error) {
    console.log(error)
    if(res.statusCode === 200){
        res.status(500)
        }
        res.send(error.message)
    
}
})


app.put("/product/:id", (req: Request, res: Response)=>{
    try{
    const id = req.params.id

    const newId = req.body.id as string | undefined
    const newName = req.body.name as string | undefined
    const newPrice = req.body.price as number | undefined
    const NewCategory = req.body.category as CATEGORIAS | undefined

    const products = product.find((products)=>{
        return products.id === id
    })
  if(products){
    products.id = newId ||products.id
    products.name = newName || products.name
    products.price = isNaN(newPrice) ? products.price : newPrice
    products.category = NewCategory || products.category

    res.status(200).send("item atualizado com sucesso")
  }else{
    res.status(200).send("item não encontrado")
  }
}catch (error) {
    console.log(error)
    if(res.statusCode === 200){
        res.status(500)
        }
        res.send(error.message)
    
}
})