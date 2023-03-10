import { Command } from "./Command.js"
import fs from "fs"


export class CommandList{
  constructor(){
    this.commandList=[]
    this.productList=[]
    this.file = "command.json"
  }

  start(){
    let myfile=fs.readFileSync(this.file).toString()
    if(myfile){
      this.commandList = JSON.parse(myfile)
    }
  }

  addCommand(client,listProducts){
    const id = Math.random().toString(16).slice(2)
    if(this.testStock(listProducts)){
      this.commandList.push(new Command(id,client,listProducts))
      console.log('ok ',this.commandList)
      if(this.commandList[this.commandList.length-1].id === id){
        this.rewrite()
        return true
      }
    }
    else{
      return false
    }
  }

  testStock(producs){
    let myfile=fs.readFileSync("product.json").toString()
    if(myfile){
      this.productList = JSON.parse(myfile)
    }
      

    let testStock = true
    producs.forEach(productId => {
      const productFound =  this.productList.find(p => p.id === productId)
      if(productFound){
        if(productFound.stock === 0){
          testStock = false
        }
        else{
          productFound.stock -- 
          console.log(productFound.stock)
        }
      }
    });
    this.rewriteProduct()
    return testStock
  }

  getCLient(id){
    const commandFound = this.commandList.find(command => command.id === id)
    if(commandFound){
      return commandFound
    }
    else{
      return {message : "aucun client trouver a l'id : " +id}
    }
  }

  rewriteProduct(){
    fs.writeFileSync("product.json",JSON.stringify(this.productList))
  }

  rewrite(){
    fs.writeFileSync(this.file,JSON.stringify(this.commandList))
  }
}