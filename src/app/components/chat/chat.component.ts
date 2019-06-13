import { Component } from '@angular/core';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styles: []
})
export class ChatComponent  {

  constructor() { }

  mensaje:string = "";

  

  enviarMensaje(){
  console.log(this.mensaje)
  }

}
