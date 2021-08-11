import { Break } from "../../break";
import { Continue } from "../../continue";
import { Entorno } from "../../entorno";
import { Instruccion } from "../../instruccion";
import { Retorno} from "../../retorno";
import * as _ from 'lodash';

export class Mientrasq extends Instruccion{
  condicion: Instruccion;
  instrucciones: Array<Instruccion>;

  constructor(linea: string, condicion: Instruccion, instrucciones: Array<Instruccion>){
    super(linea);
    Object.assign(this, {condicion, instrucciones});
  }

  ejecutar(e: Entorno) {
    while(this.condicion.ejecutar(e)){
      //Creacion del entorno generado por el Mientrasq
      const entorno = new Entorno(e);
      //Ejecuto las instrucciones
      for(let instruccion of this.instrucciones){
        const resp = instruccion.ejecutar(entorno);
        ///Validacion de instruccion Return
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
    }
  }

}
