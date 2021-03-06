import { Instruccion } from "./instruccion";
import { TIPO_DATO } from "./tipo";
import { Variable } from "./variable";

export class Funcion{
  id: string;
  instrucciones: Array<Instruccion>;
  tipo_retorno: TIPO_DATO;
  lista_parametros: Array<Variable>;

  constructor(id: string, instrucciones: Array<Instruccion>, tipo_retorno: TIPO_DATO = TIPO_DATO.VOID, lista_parametros: Array<Variable> = null){
    Object.assign(this, {id, instrucciones, tipo_retorno, lista_parametros});
  }

  hasRetorno() : boolean{
    return this.tipo_retorno != TIPO_DATO.VOID;
  }

  hasParametros() : boolean{
    return this.lista_parametros != null;
  }

  getParametrosSize() : number{
    return this.hasParametros() ? this.lista_parametros.length : 0;
  }

  public toString() : string{
    const parametros = this.lista_parametros != null ? this.lista_parametros.length : 0;
    let salida = `Funcion: ${this.id} - Parametros: ${parametros} - Return Asignado: ${this.hasRetorno()?'SI':'No'}`;
    return salida;
  }
}
