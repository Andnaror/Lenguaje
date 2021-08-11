import { Break } from "../../break";
import { Continue } from "../../continue";
import { Entorno } from "../../entorno";
import { Instruccion } from "../../instruccion";
import { Retorno } from "../../retorno";

export class Para extends Instruccion {
  declaracion: Instruccion;
  asignacion: Instruccion;
  condicion: Instruccion;
  asignacion_for: Instruccion;
  instrucciones: Array<Instruccion>;

  constructor(linea: string, declaracion: Instruccion, asignacion: Instruccion, condicion: Instruccion, asignacion_for: Instruccion, instrucciones: Array<Instruccion>) {
    super(linea);
    Object.assign(this, { declaracion, asignacion, condicion, asignacion_for, instrucciones });
  }

  ejecutar(e: Entorno) {

    const entorno_declaracion = new Entorno(e);

    //SI es una declaracion dentro del para
    if(this.declaracion)
      this.declaracion.ejecutar(entorno_declaracion);
    //SI es una asignacion dentro del para
    else if(this.asignacion)
      this.asignacion.ejecutar(entorno_declaracion);

    //Evaluo la condicion para ejecutar el ciclo para
    while (this.condicion.ejecutar(entorno_declaracion)) {
      //Entorno generado por el ciclo para

      const entorno_for = new Entorno(entorno_declaracion);
      //Ejecuto las instrucciones del ciclo para
      for (let instruccion of this.instrucciones) {
        const resp = instruccion.ejecutar(entorno_for);
        //Validacion de instruccion Return
        if(resp instanceof Retorno){
          return resp;
        }
        //Validacion de instrucion Break
        if(resp instanceof Break){
          return;
        }
        //Validacion instruccion Continue
        if (resp instanceof Continue) {
          break;
        }
      }

      //Ejecuto la asignacion para
      this.asignacion_for.ejecutar(entorno_declaracion);
    }

  }

}
