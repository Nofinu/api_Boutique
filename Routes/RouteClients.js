import express from "express";
import { ClientList } from "../Classes/Clients/ClientList.js";

export const routerClients = express.Router()
export const clientList = new ClientList()
clientList.start()

routerClients.get('/',(req,res)=>{
  res.json(clientList.clientList)
})

routerClients.get("/:id",(req,res)=>{
  res.json(clientList.getCLient(req.params.id))
})

routerClients.put("/add",(req,res)=>{
  const {firstName,lastName,phone}=req.body
  if(clientList.addClients(firstName,lastName,phone)){
    res.json({message:"le client a bien ete ajouter ",id:clientList.clientList[clientList.clientList.length-1].id})
  }else{
    res.json({message:"une erreur c'est produit lors de l'ajout du client"})
  }
})
