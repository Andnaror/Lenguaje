import { Break } from "../../break";
import { Continue } from "../../continue";
import { Entorno } from "../../entorno";
import { Instruccion } from "../../instruccion";
import { Retorno } from "../../retorno";

export class Hacer_mientrasq extends Instruccion{
  instrucciones: Array<Instruccion>;
  condicion: Instruccion;

  constructor(linea: string, instrucciones: Array<Instruccion>, condicion: Instruccion){
    super(linea);
    Object.assign(this, {instrucciones, condicion});
  }

  ejecutar(e: Entorno) {
    do{
      //Entorno generado por el do-while
      const entorno = new Entorno(e);
      for(let instruccion of this.instrucciones){
        const resp = instruccion.ejecutar(entorno);
        //Validacion de instruccion Return
        if(resp instanceof Retorno){
          return resp;
        }
        //Validacion de instrucion Break
        if(resp instanceof Break){
          return;
        }
        //Validacion de instruccion Continue
        if(resp instanceof Continue){
          break;
        }
      }
    }while(this.condicion.ejecutar(e));
  }

}
