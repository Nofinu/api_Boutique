import express from "express";
import { CommandList } from "../Classes/Commandes/CommandList.js";


export const routercommand = express.Router()
export const commandlist = new CommandList()
commandlist.start()

routercommand.get('/',(req,res)=>{
  res.json(commandlist.commandList)
})

routercommand.get("/:id",(req,res)=>{
  res.json(commandlist.getCLient(req.params.id))
})

routercommand.put("/add",(req,res)=>{
  const {client,productList}=req.body
  if(commandlist.addCommand(client,productList)){
    res.json({message:"le command a bien ete ajouter ",id:commandlist.commandList[commandlist.commandList.length-1].id})
  }else{
    res.json({message:"une erreur c'est command lors de l'ajout du command"})
  }
})
