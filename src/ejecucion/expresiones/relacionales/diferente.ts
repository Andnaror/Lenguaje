import { Error } from "../../../arbol/error";
import { Errores } from "../../../arbol/errores";
import { Arreglo } from "../../arreglo";
import { Entorno } from "../../entorno";
import { Instruccion } from "../../instruccion";

export class Diferente extends Instruccion{
  expIzq: Instruccion;
  expDer: Instruccion;

  constructor(linea: string, expIzq: Instruccion, expDer: Instruccion){
    super(linea);
    Object.assign(this, {expIzq, expDer});
  }

  ejecutar(e: Entorno) {
    const exp1 = this.expIzq.ejecutar(e);
    const exp2 = this.expDer.ejecutar(e);

    //Validacion item por item solo SI se esta comparando arreglos
    if(exp1 instanceof Arreglo && exp2 instanceof Arreglo){
      //SI no tienen la misma cantidad de items no son iguales
      if(exp1.getSize() != exp2.getSize()) return true;

      //SI tienen la misma longitud realizo un recorrido para comparar los items - Esta implementacion funciona solo para los valores nativos
      for(let i = 0; i < exp1.getSize(); i++){
        if(exp1.getValue(i) != exp2.getValue(i)) return true;
      }
      return false;
    }

    return exp1 != exp2;

  }
}
