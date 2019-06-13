import { Component } from '@angular/core';
import { ChatService } from '../../providers/chat.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styles: []
})
export class ChatComponent  {

  constructor(public _cs:ChatService) {

    this._cs.cargarMensajes().subscribe((mensaje:any)=>{
      console.log(mensaje)
    })

   }

  mensaje:string = "";

  

  enviarMensaje(){
  console.log(this.mensaje )
  }

}
