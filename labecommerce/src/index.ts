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
    res.status(200).send(user)
})


app.get("/product", (req: Request, res: Response)=>{
    res.status(200).send(product)
})


app.get("/product/search", (req: Request, res: Response)=>{
   const q = req.query.q as string

   const result: Tproduct[] = product.filter(
    (produtos)=> produtos.name.toLowerCase().includes(q.toLowerCase()))

    res.status(200).send(result)
})


app.post("/user", (req: Request, res: Response)=>{

   const id = req.body.id as string
   const email = req.body.email as string
   const password = req.body.password as string

   const newUser: TUser ={
    id,
    email,
    password
   }

   user.push(newUser)

   res.status(201).send("Cadastro realizado com sucesso")
})


app.post("/product", (req: Request, res: Response)=>{

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
 
    product.push(newProduct)
 
    res.status(201).send("Cadastro realizado com sucesso")
 })


 app.post("/purchase", (req: Request, res: Response)=>{

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
 })