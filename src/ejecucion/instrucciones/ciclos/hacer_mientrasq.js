"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Hacer_mientrasq = void 0;
const break_1 = require("../../break");
const continue_1 = require("../../continue");
const entorno_1 = require("../../entorno");
const instruccion_1 = require("../../instruccion");
const retorno_1 = require("../../retorno");
class Hacer_mientrasq extends instruccion_1.Instruccion {
    constructor(linea, instrucciones, condicion) {
        super(linea);
        Object.assign(this, { instrucciones, condicion });
    }
    ejecutar(e) {
        do {
            //Entorno generado por el do-while
            const entorno = new entorno_1.Entorno(e);
            for (let instruccion of this.instrucciones) {
                const resp = instruccion.ejecutar(entorno);
                //Validacion de instruccion Return
                if (resp instanceof retorno_1.Retorno) {
                    return resp;
                }
                //Validacion de instrucion Break
                if (resp instanceof break_1.Break) {
                    return;
                }
                //Validacion de instruccion Continue
                if (resp instanceof continue_1.Continue) {
                    break;
                }
            }
        } while (this.condicion.ejecutar(e));
    }
}
exports.Hacer_mientrasq = Hacer_mientrasq;
