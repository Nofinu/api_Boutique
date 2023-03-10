import { Product } from "./Product.js"
import fs from "fs"



export class ProduitList{
  constructor(){
    this.productList=[]
    this.file = "product.json"
  }

  start(){
    let myfile=fs.readFileSync(this.file).toString()
    if(myfile){
      this.productList = JSON.parse(myfile)
    }
  }

  addProduit(titre,prix,stock){
    const id = Math.random().toString(16).slice(2)
    this.productList.push(new Product(id,titre,prix,stock))
    if(this.productList[this.productList.length-1].id === id){
      this.rewrite()
      return true
    }
    else{
      return false
    }
  }

  getProduit(id){
    this.start()
    const productFound = this.productList.find(product => product.id === id)
    if(productFound){
      return productFound
    }
    else{
      return {message : "aucun produit trouver a l'id : " +id}
    }
  }

  rewrite(){
    fs.writeFileSync(this.file,JSON.stringify(this.productList))
  }
}