"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Switch = void 0;
const break_1 = require("../../break");
const continue_1 = require("../../continue");
const entorno_1 = require("../../entorno");
const instruccion_1 = require("../../instruccion");
const retorno_1 = require("../../retorno");
class Switch extends instruccion_1.Instruccion {
    constructor(linea, exp, lista_case) {
        super(linea);
        Object.assign(this, { exp, lista_case });
    }
    ejecutar(e) {
        const valor = this.exp.ejecutar(e);
        for (let case_instance of this.lista_case) {
            //SI es un case con expresion
            if (case_instance.exp) {
                //Evaluo la condicion del case
                const value = case_instance.exp.ejecutar(e);
                //SI no son iguales paso al siguiente case
                if (valor != value)
                    continue;
            }
            //SI los valores son iguales ejecuto las instrucciones
            const entorno = new entorno_1.Entorno(e);
            for (let instruccion of case_instance.instrucciones) {
                const resp = instruccion.ejecutar(entorno);
                //Validacion de instruccion Break
                if (resp instanceof break_1.Break) {
                    return;
                }
                if (resp instanceof retorno_1.Retorno || resp instanceof continue_1.Continue) {
                    return resp;
                }
            }
            //SI ejecute un default ya no debo continuar
            if (case_instance.isDefault())
                return;
        }
    }
}
exports.Switch = Switch;
