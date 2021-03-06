"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DecIdTipo = void 0;
const error_1 = require("../../../arbol/error");
const errores_1 = require("../../../arbol/errores");
const entorno_aux_1 = require("../../entorno_aux");
const instruccion_1 = require("../../instruccion");
const variable_1 = require("../../variable");
class DecIdTipo extends instruccion_1.Instruccion {
    constructor(linea, reasignable, id, tipo, type_generador) {
        super(linea);
        Object.assign(this, { reasignable, id, tipo, type_generador });
    }
    ejecutar(e) {
        //Validacion de variable existente
        let variable = e.getVariable(this.id);
        if (variable && !entorno_aux_1.EntornoAux.getInstance().estoyEjecutandoFuncion()) {
            errores_1.Errores.getInstance().push(new error_1.Error({ tipo: 'semantico', linea: this.linea, descripcion: `Ya existe una variable con el nombre ${this.id} declarada en este entorno` }));
            return;
        }
        //SI es const es un error porque debe tener un valor asignado
        if (!this.reasignable) {
            errores_1.Errores.getInstance().push(new error_1.Error({ tipo: 'semantico', linea: this.linea, descripcion: `La variable ${this.id} es tipo const, se debe asignar un valor` }));
            return;
        }
        //SI es un type busco el type para comprobar que exista
        if (this.tipo == 3 /* TYPE */ && this.type_generador != null) {
            const type = e.getType(this.type_generador);
            if (!type) {
                errores_1.Errores.getInstance().push(new error_1.Error({ tipo: 'semantico', linea: this.linea, descripcion: `No se puede declarar la variable ${this.id} del tipo ${this.type_generador} porque no existe ningún type con ese identificador` }));
                return;
            }
        }
        variable = new variable_1.Variable({ reasignable: this.reasignable, id: this.id, tipo_asignado: this.tipo, type_generador: this.type_generador });
        e.setVariable(variable);
    }
}
exports.DecIdTipo = DecIdTipo;
