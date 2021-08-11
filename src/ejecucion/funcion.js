"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Funcion = void 0;
class Funcion {
    constructor(id, instrucciones, tipo_retorno = 5 /* VOID */, lista_parametros = null) {
        Object.assign(this, { id, instrucciones, tipo_retorno, lista_parametros });
    }
    hasRetorno() {
        return this.tipo_retorno != 5 /* VOID */;
    }
    hasParametros() {
        return this.lista_parametros != null;
    }
    getParametrosSize() {
        return this.hasParametros() ? this.lista_parametros.length : 0;
    }
    toString() {
        const parametros = this.lista_parametros != null ? this.lista_parametros.length : 0;
        let salida = `Funcion: ${this.id} - Parametros: ${parametros} - Return Asignado: ${this.hasRetorno() ? 'SI' : 'No'}`;
        return salida;
    }
}
exports.Funcion = Funcion;
