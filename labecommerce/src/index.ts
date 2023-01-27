import express, { Request, Response } from "express"
import cors from "cors"
import { TProduct, TPurchase, TUser } from "./types";
import { db } from "./database/knex"

const app = express()
app.use(cors())
app.use(express.json())


app.listen(3003, () => {
    console.log("Servidor rodando na porta 3003");
})


app.get("/users", async (req: Request, res: Response) => {
    try {

        const result = await db("users")

        res.status(200).send(result)

    }
    catch (error: any) {
        console.log(error)

        if (req.statusCode === 200) {
            res.status(500)
        }
        if (error instanceof Error) {
            res.send(error.message)
        }
    }
})



app.get("/products", async (req: Request, res: Response) => {
    try {

        const result = await db("products")

        res.status(200).send(result)
    }
    catch (error: any) {
        console.log(error)

        if (req.statusCode === 200) {
            res.status(500)
        }
        if (error instanceof Error) {
            res.send(error.message)
        }
    }
})


app.get("/purchases", async (req: Request, res: Response) => {
    try {

        const result = await db("purchases")

        res.status(200).send(result)

    }
    catch (error: any) {
        console.log(error)

        if (req.statusCode === 200) {
            res.status(500)
        }
        if (error instanceof Error) {
            res.send(error.message)
        }
    }
})


app.get("/products/search", async (req: Request, res: Response) => {
    try {
        const q = req.query.q

        if (q.length > 0) {


            const result = await db("products")
            .where("name", "LIKE", `%${q}%`)


            res.status(200).send(result)
        } else {
            res.status(404)
            throw new Error("query params deve possuir pelo menos um caractere")
        }
    }
    catch (error: any) {
        console.log(error)

        if (req.statusCode === 200) {
            res.status(500)
        }
        if (error instanceof Error) {
            res.send(error.message)
        }
    }
})


app.post("/users", async (req: Request, res: Response) => {

    try {

        const { id, name, email, password } = req.body as TUser;

        if (!id || !name || !email || !password ) {
            res.status(400)
            throw new Error("Dados inválidos")
        }

        if (id !== undefined) {

            if (typeof id !== "string") {
                res.status(400)
                throw new Error("'id' deve ser string")
               }
            }
        if (name !== undefined) {

            if (typeof name !== "string") {
                res.status(400)
                throw new Error("'name' deve ser string")
                }
            }
        if (email !== undefined) {

            if (typeof email !== "string") {
                res.status(400)
                throw new Error("'email' deve ser string")
                }
            }

        if (password !== undefined) {

            if (typeof password !== "string") {
                res.status(400)
                throw new Error("'password' deve ser string")
                }
            }


        const [userExists]: TUser[] | undefined[] = await db("users").where({ id });

        if (userExists) {
            res.status(400);
            throw new Error("'id' do usuário já existente");
        }

        const [emailExists]: TUser[] | undefined[] = await db("users").where({ email });

        if (emailExists) {
            res.status(400);
            throw new Error("'email' do usuário já existente")
        }

        if (!email.match(/^[\w-.]+@([\w-]+.)+[\w-]{2,4}$/g)) {
            throw new Error("Parâmetro 'email' inválido")
        }


        const newUser: TUser = {
            id,
            name,
            email,
            password,
        }
        await db("users").insert(newUser)
        res.status(201).send("Cadastro realizado com sucesso")

        }catch (error: any) {
        console.log(error)

        if (req.statusCode === 200) {
            res.status(500)
        }
        if (error instanceof Error) {
            res.send(error.message)
        }
    }
})

app.post("/product", async (req: Request, res: Response) => {
    try {

        const { id, name, price, description, image_url } = req.body as TProduct;
        
        if (!id || !name || isNaN(price) || !description || !image_url ) {
            res.status(400)
            throw new Error("Dados inválidos")
        }

        if (id !== undefined) {

            if (typeof id !== "string") {
                res.status(400)
                throw new Error("'id' deve ser string")
               }
            }
        
        if (name !== undefined) {

            if (typeof name !== "string") {
                res.status(400)
                throw new Error("'name' deve ser string")
                 }
            }

        if (price !== undefined) {

            if (typeof price !== "number") {
                res.status(400)
                throw new Error("'price' deve ser number")
                }
            }

        if (description !== undefined) {

            if (typeof description !== "string") {
                res.status(400)
                throw new Error("'description' deve ser string")
                }
            }


        if (image_url !== undefined) {

            if (typeof image_url !== "string") {
                res.status(400)
                throw new Error("'image_url' deve ser string")
                }
            }

        const [productExists]: TProduct[] | undefined[] = await db("products").where({ id });

        if (productExists) {
            res.status(400);
            throw new Error("'id' do usuário já existente");
        }

        const [nameExists]: TProduct[] | undefined[] = await db("products").where({ name });

        if (nameExists) {
            res.status(400);
            throw new Error("'nome' do usuário já existe");
        }
        const newProduct: TProduct = {
            id,
            name,
            price,
            description,
            image_url
        }

        await db("products").insert(newProduct)
        res.status(201).send("Produto cadastrado com sucesso")

    } catch (error: any) {
        console.log(error)

        if (req.statusCode === 200) {
            res.status(500)
        }
        if (error instanceof Error) {
            res.send(error.message)
        }
    }
})


app.post("/purchases", async (req: Request, res: Response) => {
    try {

        const newIdPurchase = req.body.id
        const newBuyer = req.body.buyer_id
        const newProducts = req.body.products 

        const {productId, quantity} = newProducts

        const [idExist] = await db("purchases").where({id: newIdPurchase})

        if(idExist){
            res.status(400)
            throw new Error("Id já cadastrado")
        }

        
        if (newIdPurchase !== undefined) {
        
            if (typeof newIdPurchase !== "string") {
                res.status(400)
                throw new Error("'id' deve ser string")
               }
            }
        
        if (newBuyer !== undefined) {
        
            if (typeof newBuyer !== "string") {
                res.status(400)
                throw new Error("'buyer_id' deve ser string")
                }
        }
        

        if(newIdPurchase[0] !== "p" && newIdPurchase[1] !== "r"){
            res.status(400)
            throw new Error("O id deve iniciar com 'pr'")
        }

        if (!newIdPurchase || !newBuyer|| !newProducts) {
            res.status(400)
            throw new Error("Falta adicionar id, buyer e produtos.")
        }

        if (typeof newIdPurchase !== "string" &&
            typeof newBuyer !== "string") {
            res.status(400)
            throw new Error("'userId' e 'productId' são string.")
        }

        let newPriceTotal = 0

        const bodyPurchase = {
            id: newIdPurchase,
            buyer_id: newBuyer,
            total_price: newPriceTotal
        }

        await db("purchases").insert(bodyPurchase)

        const products = []

        for(let item of newProducts){
            const [addItem] = await db("products").where({ id: item.id})
            newPriceTotal += addItem.price * item.quantity
            await db("purchases_products").insert({purchase_id: newIdPurchase , product_id: item.id, quantity: item.quantity})
            const completeProduct = {
                ...addItem,
                quantity
            }
            products.push(completeProduct)
        }

        await db("purchases").update({total_price: newPriceTotal}).where({ id: newIdPurchase})

        const result = {
            id: bodyPurchase.id,
            buyer_id: bodyPurchase.buyer_id,
            totalPrice: newPriceTotal,
            products
        }

        res.status(201).send({ 
            message: "Pedido realizado com sucesso",
            purchase: result
        })

    } catch (error: any) {
        console.log(error)
        if (res.statusCode === 200) {
            res.status(500)
        }
        res.send(error.message)
    }
})





app.delete("/purchases/:id", async (req: Request, res: Response) => {
    try {
        const id = req.params.id

        const [purchases] = await db("purchases").where({ id: id })

        if (!purchases) {
            res.status(404)
            throw new Error("id não encontrada")
        }

        await db("purchases").del().where({ id: id })
        res.status(200).send("Pedido deletado com sucesso")

    } catch (error) {
        console.log(error)

        if (req.statusCode === 200) {
            res.status(500)
        }

        if (error instanceof Error) {
            res.send(error.message)
        } else {
            res.send("Erro inesperado")
        }
    }
})




app.put("/products/:id", async (req: Request, res: Response) => {
    try {
        const id = req.params.id 

        const newId = req.body.id 
        const newName = req.body.name
        const newPrice = req.body.price
        const newDescripition = req.body.descripition
        const newImage_url = req.body.image_url



        if (newId !== undefined) {

            if (typeof newId !== "string") {
                res.status(400)
                throw new Error("'id' deve ser string")
            }

            if (newId.length < 1) {
                res.status(400)
                throw new Error("'id' deve possuir no mínimo 1 caractere")
            }
        }

        if (newName !== undefined) {

            if (typeof newName !== "string") {
                res.status(400)
                throw new Error("'name' deve ser string")
            }

            if (newName.length < 1) {
                res.status(400)
                throw new Error("'name' deve possuir no mínimo 1 caracteres")
            }
        }

        if (newPrice !== undefined) {

            if (typeof newPrice !== "number") {
                res.status(400)
                throw new Error("'newPrice' deve ser number")
            }

            if (newPrice < 0) {
                res.status(400)
                throw new Error("'newPrice' não pode ser negativo")
            }
        }

        if (newDescripition !== undefined) {

            if (typeof newDescripition !== "string") {
                res.status(400)
                throw new Error("'description' deve ser string")
            }

            if (newDescripition.length < 1) {
                res.status(400)
                throw new Error("'description' deve possuir no mínimo 1 caractere")
            }
        }

        if (newImage_url !== undefined) {

            if (typeof newImage_url !== "string") {
                res.status(400)
                throw new Error("'image_url' deve ser string")
            }

            if (newImage_url.length < 1) {
                res.status(400)
                throw new Error("'image_url' deve possuir no mínimo 1 caractere")
            }
        }


        const [products] = await db("products").where({ id: id })
        console.log(products);

        if (products) {
            const updateProducts: TProduct = {
                id: newId || products.id,
                name: newName || products.name,
                price: isNaN(newPrice) ? products.price : newPrice,
                description: newDescripition || products.description,
                image_url: newImage_url || products.image_url
            }

            await db("products").update(updateProducts).where({ id: id })

        } else {
            res.status(404)
            throw new Error("'id' não encontrada")
        }
        res.status(200).send("Produto atualizado com sucesso")
        }catch (error) {
        console.log(error)

        if (req.statusCode === 200) {
            res.status(500)
        }

        if (error instanceof Error) {
            res.send(error.message)
        } else {
            res.send("Erro inesperado")
        }
    }
})


app.get("/purchases/:id", async (req: Request, res: Response) => {
    try {
        const id = req.params.id;

        const [purchase] = await db("purchases").where({ id });

        if (purchase) {
            const [pedido] = await db("purchases").select(
                "purchases.id AS purchasesId",
                "users.id AS buyerId",
                "users.name AS buyerName",
                "users.email AS buyerEmail",
                "purchases.total_price AS totalPrice",
                "purchases.created_at AS createdAt",
                "purchases.paid",
            ).rightJoin("users", "purchases.buyer_id", "=", "users.id")
             .where({ "purchases.id": id })

            const purchaseProducts = await db("purchases_products")
                .select(
                    "purchases_products.product_id AS id",
                    "products.name AS name",
                    "products.price AS price",
                    "products.description AS description",
                    "products.image_url AS imageUrl",
                    "purchases_products.quantity AS quantity"
                )
                .innerJoin(
                    "products", "products.id", "=", "purchases_products.product_id"
                ).where({ "purchases_products.purchase_id": id })

            const result = {
                ...pedido,
                paid: pedido.paid === 0 ? false : true,
                products: purchaseProducts
            }
            res.status(200).send(result);
        } else {
            res.status(404)
            throw new Error("compra não encontrada")
        }

    } catch (error) {
        console.log(error)

        if (req.statusCode === 200) {
            res.status(500)
        }

        if (error instanceof Error) {
            res.send(error.message)
        } else {
            res.send("Erro inesperado")
        }
    }
})


