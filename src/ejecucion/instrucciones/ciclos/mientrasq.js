"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Mientrasq = void 0;
const break_1 = require("../../break");
const continue_1 = require("../../continue");
const entorno_1 = require("../../entorno");
const instruccion_1 = require("../../instruccion");
const retorno_1 = require("../../retorno");
class Mientrasq extends instruccion_1.Instruccion {
    constructor(linea, condicion, instrucciones) {
        super(linea);
        Object.assign(this, { condicion, instrucciones });
    }
    ejecutar(e) {
        while (this.condicion.ejecutar(e)) {
            //Creacion del entorno generado por el Mientrasq
            const entorno = new entorno_1.Entorno(e);
            //Ejecuto las instrucciones
            for (let instruccion of this.instrucciones) {
                const resp = instruccion.ejecutar(entorno);
                ///Validacion de instruccion Return
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
        }
    }
}
exports.Mientrasq = Mientrasq;
