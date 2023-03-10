import express from "express"
import { routerClients } from "./Routes/RouteClients.js"
import { routercommand } from "./Routes/RouteCommande.js"
import { routerProduit } from "./Routes/RouteProduits.js"

const Port = 5000
const app = express()

app.use(express.json())

app.use("/clients",routerClients)

app.use("/produits",routerProduit)

app.use("/commands",routercommand)

app.listen(Port,()=>{
  console.log("L'Api Boutique est lancée sur le port "+Port)
})

