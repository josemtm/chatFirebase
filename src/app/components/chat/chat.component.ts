import { Component , OnInit} from '@angular/core';
import { ChatService } from '../../providers/chat.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styles: []
})
export class ChatComponent  implements OnInit {

  constructor(public _cs:ChatService) {

    this._cs.cargarMensajes().subscribe(()=>{

      setTimeout(() => {
        this.elemento.scrollTop=this.elemento.scrollHeight;
      }, 20);

    

    })

   }

  mensaje:string = "";
  elemento:any; 

  ngOnInit(){
    this.elemento = document.getElementById("app-mensajes")
  }

  

  enviarMensaje(){
    console.log(this.mensaje )
    if (this.mensaje.length === 0){
      return;
    }

  this._cs.agregarMensaje(this.mensaje).then(()=>this.mensaje="")
                                        .catch((err)=>{console.error("error al envia",err)});

  }

}
