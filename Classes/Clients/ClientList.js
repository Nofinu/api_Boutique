import { Client } from "./client.js"
import fs from "fs"

export class ClientList{
  constructor(){
    this.clientList=[]
    this.file = "clients.json"
  }

  start(){
    let myfile=fs.readFileSync(this.file).toString()
    if(myfile){
      this.clientList = JSON.parse(myfile)
    }
  }

  addClients(firstName,lastName,phone){
    const id = Math.random().toString(16).slice(2)
    this.clientList.push(new Client(id,firstName,lastName,phone))
    if(this.clientList[this.clientList.length-1].id === id){
      this.rewrite()
      return true
    }
    else{
      return false
    }
  }

  getCLient(id){
    const clientFound = this.clientList.find(client => client.id === id)
    if(clientFound){
      return clientFound
    }
    else{
      return {message : "aucun client trouver a l'id : " +id}
    }
  }

  rewrite(){
    fs.writeFileSync(this.file,JSON.stringify(this.clientList))
  }
}