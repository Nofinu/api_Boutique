import express from "express";
import { ProduitList } from "../Classes/Produits/ProduitList.js";

export const routerProduit = express.Router()
export const productList = new ProduitList()
productList.start()

routerProduit.get('/',(req,res)=>{
  productList.start()
  res.json(productList.productList)
})

routerProduit.get("/:id",(req,res)=>{
  res.json(productList.getProduit(req.params.id))
})

routerProduit.put("/add",(req,res)=>{
  const {titre,prix,stock}=req.body
  if(productList.addProduit(titre,prix,stock)){
    res.json({message:"le produit a bien ete ajouter ",id:productList.productList[productList.productList.length-1].id})
  }else{
    res.json({message:"une erreur c'est produit lors de l'ajout du produit"})
  }
})
