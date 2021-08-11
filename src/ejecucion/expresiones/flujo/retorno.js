"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Retorno = void 0;
const instruccion_1 = require("../../instruccion");
const retorno_1 = require("../../retorno");
class Retorno extends instruccion_1.Instruccion {
    constructor(linea, has_value, value = null) {
        super(linea);
        Object.assign(this, { has_value, value });
    }
    ejecutar(e) {
        if (this.has_value && this.value != null) {
            const valor = this.value.ejecutar(e);
            return new retorno_1.Retorno(this.has_value, valor);
        }
        else {
            return new retorno_1.Retorno(this.has_value);
        }
    }
}
exports.Retorno = Retorno;
