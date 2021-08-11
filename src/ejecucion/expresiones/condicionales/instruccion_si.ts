import { Break } from "../../break";
import { Continue } from "../../continue";
import { Entorno } from "../../entorno";
import { SI } from "../../SI";
import { Instruccion } from "../../instruccion";
import { Retorno } from "../../retorno";

export class InstruccionSi extends Instruccion{
  lista_sis: Array<SI>;

  constructor(linea: string, lista_sis: Array<SI>){
    super(linea);
    Object.assign(this, {lista_sis});
  }

  ejecutar(e: Entorno) {
    for(let inst_si of this.lista_sis){
      const condicion = inst_si.condicion;
      const instrucciones = inst_si.instrucciones;

      //SI la condicion es verdadera
      if(condicion.ejecutar(e)){
        //Entorno generado por el SI
        const entorno = new Entorno(e);
        //Ejecuto las instrucciones
        for(let instruccion of instrucciones){
          const resp = instruccion.ejecutar(entorno);
          //Validacion de sentencias Break, Continue o Return
          if(resp instanceof Break || resp instanceof Continue || resp instanceof Retorno ){
            return resp;
          }
        }
        //Finalizo la ejecucion de la instruccion SI
        return;
      }
    }
  }

}
