"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Para = void 0;
const break_1 = require("../../break");
const continue_1 = require("../../continue");
const entorno_1 = require("../../entorno");
const instruccion_1 = require("../../instruccion");
const retorno_1 = require("../../retorno");
class Para extends instruccion_1.Instruccion {
    constructor(linea, declaracion, asignacion, condicion, asignacion_for, instrucciones) {
        super(linea);
        Object.assign(this, { declaracion, asignacion, condicion, asignacion_for, instrucciones });
    }
    ejecutar(e) {
        const entorno_declaracion = new entorno_1.Entorno(e);
        //SI es una declaracion dentro del para
        if (this.declaracion)
            this.declaracion.ejecutar(entorno_declaracion);
        //SI es una asignacion dentro del para
        else if (this.asignacion)
            this.asignacion.ejecutar(entorno_declaracion);
        //Evaluo la condicion para ejecutar el ciclo para
        while (this.condicion.ejecutar(entorno_declaracion)) {
            //Entorno generado por el ciclo para
            const entorno_for = new entorno_1.Entorno(entorno_declaracion);
            //Ejecuto las instrucciones del ciclo para
            for (let instruccion of this.instrucciones) {
                const resp = instruccion.ejecutar(entorno_for);
                //Validacion de instruccion Return
                if (resp instanceof retorno_1.Retorno) {
                    return resp;
                }
                //Validacion de instrucion Break
                if (resp instanceof break_1.Break) {
                    return;
                }
                //Validacion instruccion Continue
                if (resp instanceof continue_1.Continue) {
                    break;
                }
            }
            //Ejecuto la asignacion para
            this.asignacion_for.ejecutar(entorno_declaracion);
        }
    }
}
exports.Para = Para;
