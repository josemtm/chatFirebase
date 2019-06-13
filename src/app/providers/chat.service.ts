import { Injectable } from '@angular/core';
import { Mensaje } from '../interfaces/mensaje.interface';
import { map } from "rxjs/operators"

import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
@Injectable({
  providedIn: 'root'
})
export class ChatService {

  private itemsCollection: AngularFirestoreCollection<Mensaje>;

  public chats:Mensaje[] = [];

  constructor(private afs: AngularFirestore) { }

  cargarMensajes(){
    this.itemsCollection= this.afs.collection<Mensaje>("chats", ref=> ref.orderBy("fecha","desc").limit(5));

    return  this.itemsCollection.valueChanges().pipe(map(resp =>{
      console.log(resp)
      this.chats=[];
      for(let mensaje of resp){
        this.chats.unshift(mensaje);
      }

      return this.chats
    }))
  }

  agregarMensaje(texto:string){

    let mensaje: Mensaje={
      
      nombre:"demo",
      mensaje: texto,
      fecha: new Date().getTime()


    }

   return  this.itemsCollection.add(mensaje);
  }

}
