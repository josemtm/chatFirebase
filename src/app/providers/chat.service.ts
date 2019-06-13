import { Injectable } from '@angular/core';
import { Mensaje } from '../interfaces/mensaje.interface';
import { map } from "rxjs/operators"
import { AngularFireAuth } from '@angular/fire/auth';
import { auth } from 'firebase/app';


import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
@Injectable({
  providedIn: 'root'
})
export class ChatService {

  private itemsCollection: AngularFirestoreCollection<Mensaje>;

  public chats:Mensaje[] = [];
  public usuario:any ={};

  constructor(private afs: AngularFirestore,
              public afAuth: AngularFireAuth) { 

              this.afAuth.authState.subscribe(user =>{
                console.log("estado del usuario", user)

                if(!user){
                  return;
                }

                this.usuario.nombre=user.displayName;
                this.usuario.uid = user.uid; 


              })

              }

  login(proveedor:string) {
    this.afAuth.auth.signInWithPopup(new auth.GoogleAuthProvider());
  }
  logout() {
    this.usuario = {}
    this.afAuth.auth.signOut();
  }

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
      
      nombre:this.usuario.nombre,
      mensaje: texto,
      fecha: new Date().getTime(),
      uid: this.usuario.uid


    }

   return  this.itemsCollection.add(mensaje);
  }

}
