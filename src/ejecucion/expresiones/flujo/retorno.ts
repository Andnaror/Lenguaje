import { Entorno } from "../../entorno";
import { Instruccion } from "../../instruccion";
import { Retorno as InstanciaRetorno } from '../../retorno';

export class Retorno extends Instruccion {
  linea: string;
  has_value: boolean;
  value: Instruccion;

  constructor(linea: string, has_value: boolean, value: Instruccion = null) {
    super(linea);
    Object.assign(this, { has_value, value });
  }

  ejecutar(e: Entorno) {
    if(this.has_value && this.value != null){
      const valor = this.value.ejecutar(e);
      return new InstanciaRetorno(this.has_value, valor);
    }
    else{
      return new InstanciaRetorno(this.has_value);
    }
  }

}
