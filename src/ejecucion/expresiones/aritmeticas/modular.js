"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Modular = void 0;
const error_1 = require("../../../arbol/error");
const errores_1 = require("../../../arbol/errores");
const instruccion_1 = require("../../instruccion");
class Modular extends instruccion_1.Instruccion {
    constructor(linea, expIzq, expDer) {
        super(linea);
        Object.assign(this, { expIzq, expDer });
    }
    ejecutar(e) {
        const exp1 = this.expIzq.ejecutar(e);
        const exp2 = this.expDer.ejecutar(e);
        //Validacion de errores
        if (exp1 == null || exp2 == null) {
            errores_1.Errores.getInstance().push(new error_1.Error({ tipo: 'semantico', linea: this.linea, descripcion: `No se puede realizar una operacion modular con un operador null` }));
            return;
        }
        //Solo se pueden calcular modular con numbers
        if (typeof exp1 == 'number' && typeof exp2 == 'number') {
            //No se puede dividir entre 0
            if (exp2 == 0) {
                errores_1.Errores.getInstance().push(new error_1.Error({ tipo: 'semantico', linea: this.linea, descripcion: `No es posible realizar una operacion modular entre 0` }));
                return;
            }
            return exp1 % exp2;
        }
        //SI no es error
        errores_1.Errores.getInstance().push(new error_1.Error({ tipo: 'semantico', linea: this.linea, descripcion: `No se puede realizar una operacion modular entre un operando tipo ${typeof exp1} y un operando tipo ${typeof exp2}` }));
    }
}
exports.Modular = Modular;
