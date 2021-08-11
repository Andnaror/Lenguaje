"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InstruccionSi = void 0;
const break_1 = require("../../break");
const continue_1 = require("../../continue");
const entorno_1 = require("../../entorno");
const instruccion_1 = require("../../instruccion");
const retorno_1 = require("../../retorno");
class InstruccionSi extends instruccion_1.Instruccion {
    constructor(linea, lista_sis) {
        super(linea);
        Object.assign(this, { lista_sis });
    }
    ejecutar(e) {
        for (let inst_si of this.lista_sis) {
            const condicion = inst_si.condicion;
            const instrucciones = inst_si.instrucciones;
            //SI la condicion es verdadera
            if (condicion.ejecutar(e)) {
                //Entorno generado por el SI
                const entorno = new entorno_1.Entorno(e);
                //Ejecuto las instrucciones
                for (let instruccion of instrucciones) {
                    const resp = instruccion.ejecutar(entorno);
                    //Validacion de sentencias Break, Continue o Return
                    if (resp instanceof break_1.Break || resp instanceof continue_1.Continue || resp instanceof retorno_1.Retorno) {
                        return resp;
                    }
                }
                //Finalizo la ejecucion de la instruccion SI
                return;
            }
        }
    }
}
exports.InstruccionSi = InstruccionSi;
