"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class FieldException {
    constructor(code, msg, varName, typeWaited, typeOf) {
        this.code = code;
        this.msg = msg;
        this.fix = typeOf === "undefined" ? `Insira um valor: '${varName}': <${typeWaited}>'` : `O tipo inserido (${typeOf}) não é aceito. O Correto é: '${varName}': <${typeWaited}>`;
    }
}
exports.default = FieldException;
module.exports = FieldException;
